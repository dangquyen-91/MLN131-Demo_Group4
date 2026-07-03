import { chapterSections } from "@/app/lib/chapterContent";
import { roles } from "@/app/lib/content";
import SceneShell from "./SceneShell";
import BlockView from "@/app/components/BlockView";
import Reveal from "@/app/components/motion/Reveal";

const section = chapterSections.find((s) => s.id === "phan-1")!;
const subsection = section.subsections[0];

export default function StructureScene() {
  return (
    <SceneShell
      id="co-cau"
      roman={section.roman}
      eyebrow="Cơ cấu xã hội - giai cấp"
      title={subsection.heading}
    >
      <div className="flex flex-wrap gap-3">
        {roles.map((r, i) => (
          <Reveal key={r.id} delay={i * 0.1} direction="none">
            <span
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold"
              style={{ backgroundColor: `${r.color}1a`, color: r.color, border: `1px solid ${r.color}40` }}
            >
              {r.label}
            </span>
          </Reveal>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {subsection.blocks.map((block, i) => (
          <BlockView key={i} block={block} delay={i * 0.08} />
        ))}
      </div>
    </SceneShell>
  );
}
