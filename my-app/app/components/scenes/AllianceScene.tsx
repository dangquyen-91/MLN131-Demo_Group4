import { chapterSections, Block } from "@/app/lib/chapterContent";
import SceneShell from "./SceneShell";
import BlockView from "@/app/components/BlockView";
import Reveal from "@/app/components/motion/Reveal";

const section = chapterSections.find((s) => s.id === "phan-2")!;

const convergeDirections = ["left", "up", "right"] as const;

function RoleCardsConverge({ items }: { items: Extract<Block, { type: "roleCards" }>["items"] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((r, i) => (
        <Reveal key={r.label} direction={convergeDirections[i % 3]} delay={i * 0.12} duration={0.7}>
          <div
            className="h-full rounded-lg border p-4"
            style={{ borderColor: `${r.color}40`, backgroundColor: `${r.color}0d` }}
          >
            <p className="mb-1 text-sm font-bold" style={{ color: r.color }}>
              {r.label}
            </p>
            <p className="text-sm leading-relaxed text-stone-700">{r.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function AllianceScene() {
  return (
    <SceneShell id="lien-minh" roman={section.roman} eyebrow="Liên minh giai cấp" title={section.title}>
      {section.intro?.map((block, i) => <BlockView key={`intro-${i}`} block={block} delay={i * 0.08} />)}

      {section.subsections.map((sub, si) => (
        <div key={si} className="flex flex-col gap-4">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wide text-stone-400">{sub.heading}</p>
          </Reveal>
          <div className="flex flex-col gap-5">
            {sub.blocks.map((block, bi) =>
              block.type === "roleCards" ? (
                <RoleCardsConverge key={bi} items={block.items} />
              ) : (
                <BlockView key={bi} block={block} delay={bi * 0.08} />
              )
            )}
          </div>
        </div>
      ))}
    </SceneShell>
  );
}
