"use client";

/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/immutability, react-hooks/purity, react-hooks/refs */

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import {
  AllianceBonus,
  CELL,
  COLS,
  EnemyDef,
  H,
  ROWS,
  START_LIVES,
  START_RESOURCE,
  TowerClass,
  TowerDef,
  W,
  blockedCells,
  enemyDefs,
  pairAlliance,
  towerDefs,
  towerList,
  waves,
  waypoints,
  winRanks,
} from "@/app/lib/towerGame";

type Phase = "intro" | "ready" | "wave" | "won" | "lost";

interface Tower {
  id: number;
  cls: TowerClass;
  col: number;
  row: number;
  x: number;
  y: number;
  cooldown: number;
  flash: number;
}
interface Enemy {
  id: number;
  def: EnemyDef;
  x: number;
  y: number;
  hp: number;
  wp: number;
  slowT: number;
  slowFactor: number;
  hitFlash: number;
}
interface Projectile {
  x: number;
  y: number;
  targetId: number;
  speed: number;
  damage: number;
  slow?: number;
  slowDur?: number;
  color: string;
}
interface SpawnItem {
  t: number;
  def: EnemyDef;
}

interface GameState {
  towers: Tower[];
  enemies: Enemy[];
  projectiles: Projectile[];
  spawn: SpawnItem[];
  spawnPtr: number;
  waveClock: number;
  waveIndex: number;
  phase: Phase;
  lives: number;
  resource: number;
  resFloat: number;
  nextId: number;
  goalFlash: number;
  kills: number;
}

const BLOCKED = blockedCells();
const LB_KEY = "thu-thanh-lien-minh-lb";

interface LeaderEntry {
  team: string;
  score: number;
  waves: number;
  lives: number;
  kills: number;
  win: boolean;
}

function computeScore(waves: number, lives: number, kills: number) {
  return waves * 1000 + lives * 50 + kills * 3;
}

function loadBoard(): LeaderEntry[] {
  try {
    const raw = localStorage.getItem(LB_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as LeaderEntry[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveBoard(entry: LeaderEntry): LeaderEntry[] {
  const board = loadBoard();
  const key = entry.team.trim().toLowerCase();
  const idx = board.findIndex((b) => b.team.trim().toLowerCase() === key);
  if (idx >= 0) {
    if (entry.score > board[idx].score) board[idx] = entry;
  } else {
    board.push(entry);
  }
  board.sort((a, b) => b.score - a.score);
  const top = board.slice(0, 30);
  localStorage.setItem(LB_KEY, JSON.stringify(top));
  return top;
}

function freshState(): GameState {
  return {
    towers: [],
    enemies: [],
    projectiles: [],
    spawn: [],
    spawnPtr: 0,
    waveClock: 0,
    waveIndex: 0,
    phase: "intro",
    lives: START_LIVES,
    resource: START_RESOURCE,
    resFloat: 0,
    nextId: 1,
    goalFlash: 0,
    kills: 0,
  };
}

function buildSpawn(waveIndex: number): SpawnItem[] {
  const items: SpawnItem[] = [];
  let cursor = 0;
  for (const entry of waves[waveIndex]) {
    cursor += entry.lead ?? 0;
    for (let i = 0; i < entry.count; i++) {
      items.push({ t: cursor, def: enemyDefs[entry.type] });
      cursor += entry.gap;
    }
  }
  return items.sort((a, b) => a.t - b.t);
}

// Buff liên minh cho một trụ dựa trên các trụ kề (trên/dưới/trái/phải).
function towerStats(t: Tower, byCell: Map<string, Tower>) {
  const def = towerDefs[t.cls];
  const neighbors: TowerClass[] = [];
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (const [dc, dr] of dirs) {
    const n = byCell.get(`${t.col + dc},${t.row + dr}`);
    if (n) neighbors.push(n.cls);
  }
  const acc: AllianceBonus = { dmg: 0, rate: 0, range: 0 };
  const links: { label: string }[] = [];
  for (const nc of neighbors) {
    const al = pairAlliance(t.cls, nc);
    if (al) {
      acc.dmg += al.bonus.dmg;
      acc.rate += al.bonus.rate;
      acc.range += al.bonus.range;
      links.push({ label: al.label });
    }
  }
  const dmgMult = Math.min(1 + acc.dmg, 2.3);
  const rateMult = Math.min(1 + acc.rate, 2);
  const rangeMult = Math.min(1 + acc.range, 1.8);
  return {
    def,
    damage: def.damage * dmgMult,
    fireRate: def.fireRate * rateMult,
    range: def.range * rangeMult,
    allied: links.length > 0,
    linkCount: links.length,
  };
}

export default function TowerDefenseScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameState>(freshState());
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const selShopRef = useRef<TowerClass | null>(null);
  const hoverRef = useRef<{ col: number; row: number } | null>(null);
  const selTowerRef = useRef<number | null>(null);
  const ctrlRef = useRef({ speed: 1, paused: false });

  // HUD state (mirror của mô phỏng)
  const [phase, setPhase] = useState<Phase>("intro");
  const [lives, setLives] = useState(START_LIVES);
  const [resource, setResource] = useState(START_RESOURCE);
  const [waveIndex, setWaveIndex] = useState(0);
  const [selShop, setSelShop] = useState<TowerClass | null>(null);
  const [selTower, setSelTower] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1600);
  }, []);

  const chooseShop = (cls: TowerClass) => {
    const next = selShopRef.current === cls ? null : cls;
    selShopRef.current = next;
    setSelShop(next);
    selTowerRef.current = null;
    setSelTower(null);
  };

  const reset = useCallback(() => {
    gameRef.current = freshState();
    selShopRef.current = null;
    selTowerRef.current = null;
    setSelShop(null);
    setSelTower(null);
    setPhase("intro");
    setLives(START_LIVES);
    setResource(START_RESOURCE);
    setWaveIndex(0);
  }, []);

  const beginGame = () => {
    const g = gameRef.current;
    if (g.phase === "intro") {
      g.phase = "ready";
      setPhase("ready");
    }
  };

  const startWave = () => {
    const g = gameRef.current;
    if (g.phase !== "ready") return;
    g.spawn = buildSpawn(g.waveIndex);
    g.spawnPtr = 0;
    g.waveClock = 0;
    g.phase = "wave";
    setPhase("wave");
  };

  const sellSelected = () => {
    const g = gameRef.current;
    const id = selTowerRef.current;
    if (id == null) return;
    const idx = g.towers.findIndex((t) => t.id === id);
    if (idx < 0) return;
    const refund = Math.floor(towerDefs[g.towers[idx].cls].cost * 0.6);
    g.towers.splice(idx, 1);
    g.resource += refund;
    setResource(Math.floor(g.resource));
    selTowerRef.current = null;
    setSelTower(null);
    showToast(`Đã bán trụ, hoàn ${refund} nguồn lực`);
  };

  // ---- Vòng lặp game ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const step = (ts: number) => {
      const g = gameRef.current;
      if (!lastRef.current) lastRef.current = ts;
      let dt = (ts - lastRef.current) / 1000;
      lastRef.current = ts;
      dt = Math.min(dt, 0.05);
      const { speed: sp, paused: pz } = ctrlRef.current;
      const sim = pz ? 0 : dt * sp;

      if (sim > 0) update(g, sim);
      draw(ctx, g);

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(g: GameState, dt: number) {
    // Nguồn lực thụ động từ doanh nhân
    let income = 0;
    for (const t of g.towers) income += towerDefs[t.cls].income ?? 0;
    if (income > 0) {
      g.resFloat += income * dt;
      if (g.resFloat >= 1) {
        const add = Math.floor(g.resFloat);
        g.resource += add;
        g.resFloat -= add;
        setResource(Math.floor(g.resource));
      }
    }
    if (g.goalFlash > 0) g.goalFlash = Math.max(0, g.goalFlash - dt);

    // Sinh quái theo lịch
    if (g.phase === "wave") {
      g.waveClock += dt;
      while (g.spawnPtr < g.spawn.length && g.spawn[g.spawnPtr].t <= g.waveClock) {
        const def = g.spawn[g.spawnPtr].def;
        g.enemies.push({
          id: g.nextId++,
          def,
          x: waypoints[0].x,
          y: waypoints[0].y,
          hp: def.hp,
          wp: 1,
          slowT: 0,
          slowFactor: 1,
          hitFlash: 0,
        });
        g.spawnPtr++;
      }
    }

    // Di chuyển quái
    for (const e of g.enemies) {
      if (e.hitFlash > 0) e.hitFlash = Math.max(0, e.hitFlash - dt);
      if (e.slowT > 0) {
        e.slowT -= dt;
        if (e.slowT <= 0) e.slowFactor = 1;
      }
      const target = waypoints[e.wp];
      if (!target) continue;
      const dx = target.x - e.x;
      const dy = target.y - e.y;
      const dist = Math.hypot(dx, dy);
      const move = e.def.speed * e.slowFactor * dt;
      if (dist <= move) {
        e.x = target.x;
        e.y = target.y;
        e.wp++;
        if (e.wp >= waypoints.length) {
          e.hp = 0; // đánh dấu để xoá bên dưới
          g.lives -= e.def.damage;
          g.goalFlash = 0.4;
          setLives(Math.max(0, g.lives));
        }
      } else {
        e.x += (dx / dist) * move;
        e.y += (dy / dist) * move;
      }
    }

    // Trụ ngắm & bắn
    const byCell = new Map<string, Tower>();
    for (const t of g.towers) byCell.set(`${t.col},${t.row}`, t);
    for (const t of g.towers) {
      if (t.flash > 0) t.flash = Math.max(0, t.flash - dt);
      t.cooldown -= dt;
      const st = towerStats(t, byCell);
      if (t.cooldown > 0) continue;
      // chọn quái xa nhất trên đường (wp lớn nhất) trong tầm
      let best: Enemy | null = null;
      for (const e of g.enemies) {
        if (e.hp <= 0 || e.wp >= waypoints.length) continue;
        if (Math.hypot(e.x - t.x, e.y - t.y) <= st.range) {
          if (!best || e.wp > best.wp) best = e;
        }
      }
      if (best) {
        g.projectiles.push({
          x: t.x,
          y: t.y,
          targetId: best.id,
          speed: st.def.projSpeed,
          damage: st.damage,
          slow: st.def.slow,
          slowDur: st.def.slowDuration,
          color: st.def.color,
        });
        t.cooldown = 1 / st.fireRate;
        t.flash = 0.12;
      }
    }

    // Đạn
    for (const p of g.projectiles) {
      const tgt = g.enemies.find((e) => e.id === p.targetId && e.hp > 0);
      if (!tgt) {
        p.damage = -1; // huỷ
        continue;
      }
      const dx = tgt.x - p.x;
      const dy = tgt.y - p.y;
      const dist = Math.hypot(dx, dy);
      const move = p.speed * dt;
      if (dist <= move + tgt.def.radius) {
        tgt.hp -= p.damage;
        tgt.hitFlash = 0.1;
        if (p.slow) {
          tgt.slowFactor = p.slow;
          tgt.slowT = p.slowDur ?? 1;
        }
        p.damage = -1;
        if (tgt.hp <= 0) {
          g.resource += tgt.def.reward;
          g.kills++;
          setResource(Math.floor(g.resource));
        }
      } else {
        p.x += (dx / dist) * move;
        p.y += (dy / dist) * move;
      }
    }
    g.projectiles = g.projectiles.filter((p) => p.damage >= 0);
    g.enemies = g.enemies.filter((e) => e.hp > 0);

    // Thua
    if (g.lives <= 0 && g.phase !== "lost") {
      g.phase = "lost";
      setPhase("lost");
      return;
    }

    // Hết đợt
    if (
      g.phase === "wave" &&
      g.spawnPtr >= g.spawn.length &&
      g.enemies.length === 0
    ) {
      const bonus = 35 + g.waveIndex * 12;
      g.resource += bonus;
      setResource(Math.floor(g.resource));
      g.waveIndex++;
      setWaveIndex(g.waveIndex);
      if (g.waveIndex >= waves.length) {
        g.phase = "won";
        setPhase("won");
      } else {
        g.phase = "ready";
        setPhase("ready");
        showToast(`Đẩy lùi đợt tấn công! +${bonus} nguồn lực`);
      }
    }
  }

  function draw(ctx: CanvasRenderingContext2D, g: GameState) {
    ctx.clearRect(0, 0, W, H);
    // nền + lưới
    ctx.fillStyle = "#f6efe0";
    ctx.fillRect(0, 0, W, H);
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const blocked = BLOCKED.has(`${c},${r}`);
        if (blocked) continue;
        ctx.fillStyle = "#fbf7ec";
        ctx.strokeStyle = "#e7ddc7";
        ctx.lineWidth = 1;
        ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
        ctx.strokeRect(c * CELL + 1.5, r * CELL + 1.5, CELL - 3, CELL - 3);
      }
    }

    // đường đi
    ctx.strokeStyle = "#d9c7a3";
    ctx.lineWidth = CELL - 12;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(waypoints[0].x, waypoints[0].y);
    for (let i = 1; i < waypoints.length; i++) ctx.lineTo(waypoints[i].x, waypoints[i].y);
    ctx.stroke();
    ctx.strokeStyle = "#cbb488";
    ctx.setLineDash([6, 14]);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(waypoints[0].x, waypoints[0].y);
    for (let i = 1; i < waypoints.length; i++) ctx.lineTo(waypoints[i].x, waypoints[i].y);
    ctx.stroke();
    ctx.setLineDash([]);

    // đích (Chính quyền / Nhân dân)
    const goal = waypoints[waypoints.length - 1];
    const gx = W - 26;
    ctx.fillStyle = g.goalFlash > 0 ? "#ef4444" : "#990000";
    ctx.beginPath();
    ctx.arc(gx, goal.y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffcd00";
    ctx.font = "22px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("★", gx, goal.y + 1);

    const byCell = new Map<string, Tower>();
    for (const t of g.towers) byCell.set(`${t.col},${t.row}`, t);

    // liên kết liên minh (vẽ dưới trụ)
    for (const t of g.towers) {
      const dirs = [
        [1, 0],
        [0, 1],
      ];
      for (const [dc, dr] of dirs) {
        const n = byCell.get(`${t.col + dc},${t.row + dr}`);
        if (n && pairAlliance(t.cls, n.cls)) {
          const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 220);
          ctx.strokeStyle = `rgba(255, 205, 0, ${0.45 + pulse * 0.4})`;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(t.x, t.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }
    }

    // xem trước tầm khi đang chọn trụ để đặt
    const hov = hoverRef.current;
    const shop = selShopRef.current;
    if (shop && hov && isBuildable(hov.col, hov.row, g)) {
      const def = towerDefs[shop];
      const cx = (hov.col + 0.5) * CELL;
      const cy = (hov.row + 0.5) * CELL;
      ctx.fillStyle = "rgba(37,99,235,0.10)";
      ctx.strokeStyle = "rgba(37,99,235,0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, def.range, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = def.color + "55";
      ctx.fillRect(hov.col * CELL + 6, hov.row * CELL + 6, CELL - 12, CELL - 12);
    }

    // trụ
    for (const t of g.towers) {
      const def = towerDefs[t.cls];
      const st = towerStats(t, byCell);
      const selected = selTowerRef.current === t.id;
      if (selected) {
        ctx.strokeStyle = "rgba(37,99,235,0.55)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(t.x, t.y, st.range, 0, Math.PI * 2);
        ctx.stroke();
      }
      // đế
      ctx.fillStyle = st.allied ? "#fff7db" : "#ffffff";
      ctx.strokeStyle = def.color;
      ctx.lineWidth = t.flash > 0 ? 4 : 2.5;
      roundRect(ctx, t.x - 24, t.y - 24, 48, 48, 12);
      ctx.fill();
      ctx.stroke();
      // emoji
      ctx.font = "26px sans-serif";
      ctx.fillText(def.emoji, t.x, t.y + 1);
      // huy hiệu liên minh
      if (st.allied) {
        ctx.fillStyle = "#ffcd00";
        ctx.beginPath();
        ctx.arc(t.x + 18, t.y - 18, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#990000";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText(String(st.linkCount), t.x + 18, t.y - 17);
      }
    }

    // quái
    for (const e of g.enemies) {
      const def = e.def;
      ctx.fillStyle = e.hitFlash > 0 ? "#ffffff" : def.color;
      ctx.beginPath();
      ctx.arc(e.x, e.y, def.radius, 0, Math.PI * 2);
      ctx.fill();
      if (e.slowFactor < 1) {
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.font = `${def.radius + 6}px sans-serif`;
      ctx.fillText(def.emoji, e.x, e.y + 1);
      // thanh máu
      const w = def.radius * 2;
      const ratio = Math.max(0, e.hp / def.hp);
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(e.x - w / 2, e.y - def.radius - 9, w, 4);
      ctx.fillStyle = ratio > 0.5 ? "#22c55e" : ratio > 0.25 ? "#f59e0b" : "#ef4444";
      ctx.fillRect(e.x - w / 2, e.y - def.radius - 9, w * ratio, 4);
    }

    // đạn
    for (const p of g.projectiles) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function isBuildable(col: number, row: number, g: GameState) {
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return false;
    if (BLOCKED.has(`${col},${row}`)) return false;
    return !g.towers.some((t) => t.col === col && t.row === row);
  }

  function cellFromEvent(e: React.MouseEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const lx = (e.clientX - rect.left) * (W / rect.width);
    const ly = (e.clientY - rect.top) * (H / rect.height);
    return { col: Math.floor(lx / CELL), row: Math.floor(ly / CELL) };
  }

  const onCanvasClick = (e: React.MouseEvent) => {
    const g = gameRef.current;
    if (g.phase === "intro" || g.phase === "won" || g.phase === "lost") return;
    const { col, row } = cellFromEvent(e);
    const existing = g.towers.find((t) => t.col === col && t.row === row);
    if (existing) {
      selTowerRef.current = existing.id;
      setSelTower(existing.id);
      selShopRef.current = null;
      setSelShop(null);
      return;
    }
    const shop = selShopRef.current;
    if (!shop) {
      selTowerRef.current = null;
      setSelTower(null);
      return;
    }
    if (!isBuildable(col, row, g)) {
      showToast("Không thể xây ở ô này");
      return;
    }
    const def = towerDefs[shop];
    if (g.resource < def.cost) {
      showToast("Không đủ nguồn lực");
      return;
    }
    g.resource -= def.cost;
    setResource(Math.floor(g.resource));
    g.towers.push({
      id: g.nextId++,
      cls: shop,
      col,
      row,
      x: (col + 0.5) * CELL,
      y: (row + 0.5) * CELL,
      cooldown: 0,
      flash: 0,
    });
  };

  const onCanvasMove = (e: React.MouseEvent) => {
    hoverRef.current = cellFromEvent(e);
  };
  const onCanvasLeave = () => {
    hoverRef.current = null;
  };

  const toggleSpeed = () => {
    const next = speed === 1 ? 2 : 1;
    setSpeed(next);
    ctrlRef.current.speed = next;
  };
  const togglePause = () => {
    const next = !paused;
    setPaused(next);
    ctrlRef.current.paused = next;
  };

  const livesPct = Math.round((lives / START_LIVES) * 100);
  const rank = winRanks.find((r) => livesPct >= r.min) ?? winRanks[winRanks.length - 1];
  const selectedTowerDef: TowerDef | null =
    selTower != null
      ? towerDefs[gameRef.current.towers.find((t) => t.id === selTower)?.cls ?? "cong-nhan"]
      : null;

  return (
    <section id="tro-choi" className="mx-auto w-full max-w-5xl px-6 py-24">
      <SectionHeader
        eyebrow="Trò chơi tương tác"
        title="Thủ Thành"
        highlight="Liên Minh"
        subtitle="Đặt các giai cấp bảo vệ chính quyền nhân dân. Đặt Công cạnh Nông, cạnh Trí → kích hoạt LIÊN MINH, nhân sức mạnh. Đoàn kết là chiến thắng!"
      />

      <div className="overflow-hidden rounded-2xl border border-brand-red/15 bg-white shadow-lg shadow-brand-red/5">
        {/* Thanh HUD */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 bg-brand-cream/60 px-4 py-3 text-sm">
          <div className="flex items-center gap-4">
            <span className="font-bold text-brand-red">💗 {lives}</span>
            <span className="font-bold text-amber-600">💰 {resource}</span>
            <span className="font-semibold text-stone-600">
              🌊 Đợt {Math.min(waveIndex + 1, waves.length)}/{waves.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {phase === "ready" && (
              <button
                onClick={startWave}
                className="rounded-full bg-brand-red px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-105"
              >
                ▶ Bắt đầu đợt {waveIndex + 1}
              </button>
            )}
            {phase === "wave" && (
              <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600">
                ⚔️ Đang bị tấn công
              </span>
            )}
            <button
              onClick={togglePause}
              className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-semibold text-stone-600 hover:border-stone-400"
            >
              {paused ? "▶" : "⏸"}
            </button>
            <button
              onClick={toggleSpeed}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                speed === 2
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-stone-300 text-stone-600 hover:border-stone-400"
              }`}
            >
              x{speed}
            </button>
          </div>
        </div>

        {/* Sân chơi */}
        <div className="relative bg-[#f6efe0]">
          <canvas
            ref={canvasRef}
            onClick={onCanvasClick}
            onMouseMove={onCanvasMove}
            onMouseLeave={onCanvasLeave}
            style={{ width: "100%", aspectRatio: `${W} / ${H}`, display: "block", cursor: "pointer" }}
          />

          {/* Overlay giới thiệu / thắng / thua */}
          {(phase === "intro" || phase === "won" || phase === "lost") && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-red-dark/85 p-6 text-center text-white backdrop-blur-sm">
              {phase === "intro" && (
                <div className="max-w-md">
                  <div className="text-4xl">🤝🛡️</div>
                  <h3 className="mt-3 text-2xl font-extrabold">Thủ Thành Liên Minh</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    Các <b>thử thách</b> (thực dân, đói nghèo, khủng hoảng...) tiến về
                    chính quyền nhân dân ★. Hãy xây các <b>giai cấp</b> để chặn chúng.
                    Đặt các giai cấp <b>kề nhau</b> để bật <b className="text-brand-gold">LIÊN MINH</b> —
                    Công–Nông–Trí kề nhau là mạnh nhất!
                  </p>
                  <button
                    onClick={beginGame}
                    className="mt-5 rounded-full bg-brand-gold px-7 py-3 text-sm font-bold uppercase tracking-wide text-brand-red-dark transition-transform hover:scale-105"
                  >
                    Vào trận →
                  </button>
                </div>
              )}
              {phase === "won" && (
                <div className="max-w-md">
                  <div className="text-5xl">{rank.emoji}</div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                    Chiến thắng!
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">{rank.title}</h3>
                  <p className="mt-2 text-sm text-white/85">{rank.blurb}</p>
                  <p className="mt-2 text-sm text-white/70">
                    Niềm tin của nhân dân còn lại: <b className="text-brand-gold">{lives}</b>/{START_LIVES}
                  </p>
                  <button
                    onClick={reset}
                    className="mt-5 rounded-full bg-brand-gold px-7 py-3 text-sm font-bold uppercase tracking-wide text-brand-red-dark transition-transform hover:scale-105"
                  >
                    🔄 Chơi lại
                  </button>
                </div>
              )}
              {phase === "lost" && (
                <div className="max-w-md">
                  <div className="text-5xl">🛑</div>
                  <h3 className="mt-3 text-2xl font-extrabold">Chính quyền thất thủ</h3>
                  <p className="mt-2 text-sm text-white/85">
                    Niềm tin của nhân dân đã cạn. Hãy bố trí liên minh chặt chẽ hơn —
                    đặt Công – Nông – Trí kề nhau để cộng hưởng sức mạnh!
                  </p>
                  <button
                    onClick={reset}
                    className="mt-5 rounded-full bg-brand-gold px-7 py-3 text-sm font-bold uppercase tracking-wide text-brand-red-dark transition-transform hover:scale-105"
                  >
                    🔄 Thử lại
                  </button>
                </div>
              )}
            </div>
          )}

          {toast && (
            <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-stone-900/85 px-4 py-1.5 text-xs font-semibold text-white">
              {toast}
            </div>
          )}
        </div>

        {/* Cửa hàng giai cấp */}
        <div className="border-t border-stone-100 p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {towerList.map((def) => {
              const active = selShop === def.id;
              const afford = resource >= def.cost;
              return (
                <button
                  key={def.id}
                  onClick={() => chooseShop(def.id)}
                  disabled={phase === "intro"}
                  className={`rounded-xl border-2 p-3 text-left transition-all ${
                    active ? "shadow-md" : "hover:border-stone-300"
                  } ${phase === "intro" ? "opacity-50" : ""}`}
                  style={{
                    borderColor: active ? def.color : `${def.color}33`,
                    backgroundColor: active ? `${def.color}12` : "#fff",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{def.emoji}</span>
                    <span
                      className={`text-xs font-bold ${afford ? "text-amber-600" : "text-red-400"}`}
                    >
                      💰{def.cost}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold" style={{ color: def.color }}>
                    {def.name}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-stone-500">{def.blurb}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
            <p>
              💡 Chọn một giai cấp rồi bấm vào ô trống để xây. Các giai cấp{" "}
              <b className="text-brand-red">kề nhau</b> tự động bật liên minh (viền vàng ✦).
            </p>
            {selectedTowerDef && (
              <button
                onClick={sellSelected}
                className="rounded-full border border-red-300 px-3 py-1 font-semibold text-red-500 hover:bg-red-50"
              >
                Bán {selectedTowerDef.name} (+
                {Math.floor(selectedTowerDef.cost * 0.6)})
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
