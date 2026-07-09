// ================================================================
//  Cấu hình & logic thuần cho game "Thủ Thành Liên Minh"
//  Chủ đề: liên minh giai cấp (Chương 5) — đặt các giai cấp kề nhau
//  để kích hoạt "liên minh", nhân sức mạnh chống lại các thử thách.
// ================================================================

export const COLS = 10;
export const ROWS = 6;
export const CELL = 64;
export const W = COLS * CELL;
export const H = ROWS * CELL;

export const START_RESOURCE = 170;
export const START_LIVES = 20;

export type TowerClass = "cong-nhan" | "nong-dan" | "tri-thuc" | "doanh-nhan";

export interface TowerDef {
  id: TowerClass;
  name: string;
  emoji: string;
  color: string;
  cost: number;
  range: number;
  fireRate: number; // phát / giây
  damage: number;
  projSpeed: number;
  slow?: number; // hệ số làm chậm (vd 0.5 = còn 50% tốc độ)
  slowDuration?: number;
  income?: number; // nguồn lực / giây (doanh nhân)
  blurb: string;
}

export const towerDefs: Record<TowerClass, TowerDef> = {
  "cong-nhan": {
    id: "cong-nhan",
    name: "Công nhân",
    emoji: "🔨",
    color: "#dc2626",
    cost: 55,
    range: 118,
    fireRate: 1.3,
    damage: 14,
    projSpeed: 340,
    blurb: "Lực lượng nòng cốt — sát thương ổn định, xương sống của thế trận.",
  },
  "nong-dan": {
    id: "nong-dan",
    name: "Nông dân",
    emoji: "🌾",
    color: "#16a34a",
    cost: 45,
    range: 98,
    fireRate: 1.0,
    damage: 11,
    projSpeed: 300,
    blurb: "Rẻ và bền. Đặt cạnh Công nhân → liên minh Công–Nông là nền tảng.",
  },
  "tri-thuc": {
    id: "tri-thuc",
    name: "Trí thức",
    emoji: "🔬",
    color: "#2563eb",
    cost: 75,
    range: 158,
    fireRate: 0.85,
    damage: 9,
    projSpeed: 400,
    slow: 0.55,
    slowDuration: 1.3,
    blurb: "Tầm xa, làm chậm địch bằng khoa học – kỹ thuật.",
  },
  "doanh-nhan": {
    id: "doanh-nhan",
    name: "Doanh nhân",
    emoji: "💼",
    color: "#d97706",
    cost: 65,
    range: 92,
    fireRate: 0.6,
    damage: 6,
    projSpeed: 300,
    income: 5,
    blurb: "Tạo nguồn lực mỗi giây cho ngân sách (theo tinh thần NQ 09).",
  },
};

export const towerList = Object.values(towerDefs);

// ---- Liên minh: buff khi hai giai cấp khác loại đứng kề nhau ----
export interface AllianceBonus {
  dmg: number;
  rate: number;
  range: number;
}

const alliances: { pair: [TowerClass, TowerClass]; label: string; bonus: AllianceBonus }[] = [
  {
    pair: ["cong-nhan", "nong-dan"],
    label: "Công – Nông",
    bonus: { dmg: 0.4, rate: 0.25, range: 0 },
  },
  {
    pair: ["cong-nhan", "tri-thuc"],
    label: "Công – Trí",
    bonus: { dmg: 0.15, rate: 0, range: 0.3 },
  },
  {
    pair: ["nong-dan", "tri-thuc"],
    label: "Nông – Trí",
    bonus: { dmg: 0.15, rate: 0, range: 0.3 },
  },
  {
    pair: ["cong-nhan", "doanh-nhan"],
    label: "Công – Doanh nhân",
    bonus: { dmg: 0.1, rate: 0.1, range: 0 },
  },
  {
    pair: ["nong-dan", "doanh-nhan"],
    label: "Nông – Doanh nhân",
    bonus: { dmg: 0.1, rate: 0.1, range: 0 },
  },
  {
    pair: ["tri-thuc", "doanh-nhan"],
    label: "Trí – Doanh nhân",
    bonus: { dmg: 0.1, rate: 0.1, range: 0.15 },
  },
];

export function pairAlliance(
  a: TowerClass,
  b: TowerClass
): { label: string; bonus: AllianceBonus } | null {
  if (a === b) return null;
  for (const al of alliances) {
    if (
      (al.pair[0] === a && al.pair[1] === b) ||
      (al.pair[0] === b && al.pair[1] === a)
    ) {
      return { label: al.label, bonus: al.bonus };
    }
  }
  return null;
}

// ---- Kẻ địch (các "thử thách" của cách mạng) ----
export type EnemyId = "thuc-dan" | "doi-ngheo" | "khung-hoang" | "quan-lieu";

export interface EnemyDef {
  id: EnemyId;
  name: string;
  emoji: string;
  color: string;
  hp: number;
  speed: number; // px / giây
  damage: number; // trừ bao nhiêu "niềm tin" khi tới đích
  reward: number;
  radius: number;
}

export const enemyDefs: Record<EnemyId, EnemyDef> = {
  "thuc-dan": {
    id: "thuc-dan",
    name: "Thực dân",
    emoji: "🏴",
    color: "#57534e",
    hp: 46,
    speed: 44,
    damage: 1,
    reward: 9,
    radius: 15,
  },
  "doi-ngheo": {
    id: "doi-ngheo",
    name: "Đói nghèo",
    emoji: "🥀",
    color: "#a16207",
    hp: 26,
    speed: 74,
    damage: 1,
    reward: 6,
    radius: 13,
  },
  "khung-hoang": {
    id: "khung-hoang",
    name: "Khủng hoảng",
    emoji: "📉",
    color: "#7c2d12",
    hp: 105,
    speed: 30,
    damage: 2,
    reward: 16,
    radius: 18,
  },
  "quan-lieu": {
    id: "quan-lieu",
    name: "Quan liêu",
    emoji: "👑",
    color: "#1c1917",
    hp: 380,
    speed: 24,
    damage: 5,
    reward: 65,
    radius: 24,
  },
};

// ---- Các đợt tấn công ----
export interface WaveEntry {
  type: EnemyId;
  count: number;
  gap: number; // giây giữa mỗi con
  lead?: number; // giây chờ trước khi bắt đầu nhóm này
}

export const waves: WaveEntry[][] = [
  [{ type: "thuc-dan", count: 5, gap: 1.1 }],
  [
    { type: "thuc-dan", count: 6, gap: 0.9 },
    { type: "doi-ngheo", count: 3, gap: 0.6, lead: 1 },
  ],
  [{ type: "doi-ngheo", count: 9, gap: 0.65 }],
  [
    { type: "thuc-dan", count: 6, gap: 0.8 },
    { type: "khung-hoang", count: 2, gap: 2, lead: 1.5 },
  ],
  [
    { type: "doi-ngheo", count: 8, gap: 0.55 },
    { type: "thuc-dan", count: 6, gap: 0.7, lead: 0.5 },
  ],
  [
    { type: "khung-hoang", count: 4, gap: 1.6 },
    { type: "doi-ngheo", count: 6, gap: 0.5, lead: 1 },
  ],
  [
    { type: "thuc-dan", count: 10, gap: 0.5 },
    { type: "khung-hoang", count: 4, gap: 1.3, lead: 1 },
  ],
  [
    { type: "doi-ngheo", count: 12, gap: 0.4 },
    { type: "khung-hoang", count: 4, gap: 1.4, lead: 1 },
    { type: "quan-lieu", count: 1, gap: 1, lead: 3 },
  ],
];

// ---- Đường đi (waypoint theo ô lưới, tâm ô) ----
const pathCells: [number, number][] = [
  [-1, 0],
  [8, 0],
  [8, 2],
  [1, 2],
  [1, 4],
  [10, 4],
];

export const waypoints = pathCells.map(([c, r]) => ({
  x: (c + 0.5) * CELL,
  y: (r + 0.5) * CELL,
}));

// Các ô mà đường đi băng qua → không được xây.
export function blockedCells(): Set<string> {
  const s = new Set<string>();
  for (let i = 0; i < pathCells.length - 1; i++) {
    const [c1, r1] = pathCells[i];
    const [c2, r2] = pathCells[i + 1];
    if (r1 === r2) {
      const a = Math.min(c1, c2);
      const b = Math.max(c1, c2);
      for (let c = a; c <= b; c++) {
        if (c >= 0 && c < COLS) s.add(`${c},${r1}`);
      }
    } else {
      const a = Math.min(r1, r2);
      const b = Math.max(r1, r2);
      for (let r = a; r <= b; r++) {
        if (r >= 0 && r < ROWS && c1 >= 0 && c1 < COLS) s.add(`${c1},${r}`);
      }
    }
  }
  return s;
}

export interface WinRank {
  min: number; // % niềm tin còn lại
  title: string;
  emoji: string;
  blurb: string;
}

export const winRanks: WinRank[] = [
  { min: 90, title: "Khối Đại Đoàn Kết vững như thành đồng", emoji: "🏛️", blurb: "Không một thử thách nào lọt qua thế trận liên minh của bạn!" },
  { min: 60, title: "Nền tảng liên minh vững chắc", emoji: "⭐", blurb: "Công – Nông – Trí phối hợp nhịp nhàng, cách mạng đứng vững." },
  { min: 1, title: "Giữ vững trong gian khó", emoji: "✊", blurb: "Có lúc lung lay nhưng khối liên minh vẫn trụ tới cùng." },
];
