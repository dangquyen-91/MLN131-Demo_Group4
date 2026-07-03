"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/app/components/motion/Reveal";

export default function SceneShell({
  id,
  roman,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  roman: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numeralY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id={id} ref={ref} className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal direction="left">
            <motion.p
              style={{ y: numeralY }}
              className="select-none text-6xl font-black text-brand-red/15"
              aria-hidden
            >
              {roman}
            </motion.p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-stone-900 sm:text-3xl">{title}</h2>
            {subtitle && <p className="mt-3 text-sm leading-relaxed text-stone-600">{subtitle}</p>}
          </Reveal>
        </div>
        <div className="flex flex-col gap-8">{children}</div>
      </div>
    </section>
  );
}
