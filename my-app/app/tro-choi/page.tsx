import type { Metadata } from "next";
import Link from "next/link";
import TerritoryBattleScene from "@/app/components/scenes/TerritoryBattleScene";

export const metadata: Metadata = {
  title: "Mật Mã Liên Minh — Trò chơi giải mã | CNXHKH Chương 5",
  description:
    "Trò chơi giải mã tương tác Mật Mã Liên Minh dành cho lớp học Chủ nghĩa xã hội khoa học, Chương 5: Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp.",
};

export default function TroChoiPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f4f1e8]">
      <header className="sticky top-0 z-40 bg-brand-red-dark">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-brand-gold text-brand-red-dark">
              ★
            </span>
            CNXHKH · Chương 5
          </Link>
          <Link
            href="/#tro-choi"
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-white"
          >
            ← Về trang chủ
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <TerritoryBattleScene />
      </main>
    </div>
  );
}
