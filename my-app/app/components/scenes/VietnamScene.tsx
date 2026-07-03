import { chapterSections } from "@/app/lib/chapterContent";
import SceneShell from "./SceneShell";
import BlockView from "@/app/components/BlockView";
import Reveal from "@/app/components/motion/Reveal";
import StatsStrip from "@/app/components/StatsStrip";
import TimelineExperience from "@/app/components/TimelineExperience";

const section = chapterSections.find((s) => s.id === "phan-3")!;

export default function VietnamScene() {
  return (
    <>
      <SceneShell id="viet-nam" roman={section.roman} eyebrow="Việt Nam" title={section.title}>
        {section.subsections.map((sub, si) => (
          <div key={si} className="flex flex-col gap-4">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-wide text-stone-400">{sub.heading}</p>
            </Reveal>
            <div className="flex flex-col gap-5">
              {sub.blocks.map((block, bi) => (
                <BlockView key={bi} block={block} delay={bi * 0.08} />
              ))}
            </div>
          </div>
        ))}
      </SceneShell>

      <StatsStrip />

      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <Reveal>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
            Minh họa tương tác
          </p>
          <h3 className="mb-8 text-2xl font-extrabold text-stone-900 sm:text-3xl">
            Dòng thời gian <span className="text-brand-red">liên minh giai cấp</span>
          </h3>
        </Reveal>
        <TimelineExperience />
      </div>
    </>
  );
}
