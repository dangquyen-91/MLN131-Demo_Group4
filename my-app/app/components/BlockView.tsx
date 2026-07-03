"use client";

import { Block } from "@/app/lib/chapterContent";
import Reveal from "./motion/Reveal";

function BlockInner({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-sm leading-relaxed text-stone-700">{block.text}</p>;
    case "ul":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-stone-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "example":
      return (
        <div className="rounded-lg border border-brand-gold/40 bg-brand-gold/10 p-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-amber-700">
            Ví dụ thực tiễn
          </p>
          <p className="text-sm leading-relaxed text-stone-700">{block.text}</p>
        </div>
      );
    case "summary":
      return (
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-500">
            {block.title}
          </p>
          <ul className="flex flex-col gap-1.5">
            {block.items.map((item, i) => (
              <li key={i} className="text-sm leading-relaxed text-stone-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "roleCards":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {block.items.map((r) => (
            <div
              key={r.label}
              className="rounded-lg border p-4"
              style={{ borderColor: `${r.color}40`, backgroundColor: `${r.color}0d` }}
            >
              <p className="mb-1 text-sm font-bold" style={{ color: r.color }}>
                {r.label}
              </p>
              <p className="text-sm leading-relaxed text-stone-700">{r.text}</p>
            </div>
          ))}
        </div>
      );
  }
}

export default function BlockView({ block, delay = 0 }: { block: Block; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <BlockInner block={block} />
    </Reveal>
  );
}
