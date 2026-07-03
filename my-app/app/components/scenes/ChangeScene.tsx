import { chapterSections } from "@/app/lib/chapterContent";
import SceneShell from "./SceneShell";
import BlockView from "@/app/components/BlockView";
import Reveal from "@/app/components/motion/Reveal";

const section = chapterSections.find((s) => s.id === "phan-1")!;
const subsection = section.subsections[1];
const [introBlock, lawsBlock, ...restBlocks] = subsection.blocks;
const laws = lawsBlock.type === "ul" ? lawsBlock.items : [];

const stepTitles = [
  "Gắn liền với cơ cấu kinh tế",
  "Ngày càng đa dạng, phức tạp",
  "Vừa đấu tranh, vừa liên minh",
];

export default function ChangeScene() {
  return (
    <SceneShell
      id="bien-doi"
      roman={section.roman}
      eyebrow="Ba quy luật biến đổi"
      title={subsection.heading}
    >
      <BlockView block={introBlock} />

      <div className="flex flex-col">
        {laws.map((law, i) => (
          <div key={i}>
            <Reveal delay={i * 0.15}>
              <div className="rounded-xl border border-brand-red/20 bg-white p-5 shadow-sm">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-brand-red">
                  Quy luật {i + 1} — {stepTitles[i]}
                </p>
                <p className="text-sm leading-relaxed text-stone-700">{law}</p>
              </div>
            </Reveal>
            {i < laws.length - 1 && (
              <Reveal delay={i * 0.15 + 0.08} direction="none" className="flex justify-center py-1">
                <span className="text-2xl text-brand-gold">↓</span>
              </Reveal>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {restBlocks.map((block, i) => (
          <BlockView key={i} block={block} delay={i * 0.08} />
        ))}
      </div>
    </SceneShell>
  );
}
