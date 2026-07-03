"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/app/components/motion/Reveal";

export default function HeroScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="hero-gradient relative overflow-hidden px-6 py-28 text-center"
    >
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,205,0,0.12),transparent_45%)]"
      />
      <motion.div style={{ opacity: contentOpacity }}>
        <Reveal>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
            Chủ nghĩa xã hội khoa học · Chương 5
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Cơ Cấu Xã Hội - <span className="text-shine">Giai Cấp</span> Và{" "}
            <span className="text-shine">Liên Minh Giai Cấp</span>, Tầng Lớp
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/70">
            Trong thời kỳ quá độ lên chủ nghĩa xã hội — hành trình cuộn tương tác về sự
            biến đổi cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp ở Việt Nam.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#khai-niem"
              className="inline-block rounded-full bg-brand-gold px-6 py-3 text-sm font-bold text-brand-red-dark transition-transform hover:scale-105"
            >
              Bắt đầu hành trình ↓
            </a>
            <a
              href="#viet-nam"
              className="inline-block rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Khám phá dòng thời gian tương tác ↓
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-16 animate-bounce text-xs uppercase tracking-widest text-white/40">
            Cuộn xuống ↓
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}
