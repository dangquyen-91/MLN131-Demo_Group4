"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function GamePromoScene() {
  return (
    <section id="tro-choi" className="w-full bg-[#f4f1e8] px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-lg border border-stone-200 bg-stone-950 px-6 py-14 text-center text-white shadow-xl shadow-stone-900/10"
      >
        <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-gold">Trò chơi giải mã</p>
        <h3 className="text-3xl font-black sm:text-4xl">
          Mật Mã <span className="text-brand-gold">Liên Minh</span>
        </h3>
        <p className="max-w-xl text-sm leading-relaxed text-white/65">
          Chia lớp thành 4 đội, trả lời 40 câu trắc nghiệm ôn tập Chương 5 để nhận chữ, ghép giải mã
          cụm từ bí mật và giành ngôi vô địch. Mở ở một trang riêng để xem trọn giao diện trên màn
          hình lớn.
        </p>
        <Link
          href="/tro-choi"
          className="mt-2 inline-block rounded-full bg-brand-gold px-7 py-3 text-sm font-black uppercase tracking-wide text-stone-950 transition-transform hover:scale-105"
        >
          Chơi ngay →
        </Link>
      </motion.div>
    </section>
  );
}
