import { coreConcepts } from "@/app/lib/content";
import SectionHeader from "@/app/components/SectionHeader";
import Reveal from "@/app/components/motion/Reveal";

export default function ConceptsScene() {
  return (
    <section id="khai-niem" className="mx-auto w-full max-w-5xl px-6 py-24">
      <SectionHeader
        eyebrow="Nền tảng lý luận"
        title="Ba khái niệm"
        highlight="cốt lõi"
        subtitle="Nắm vững nền tảng lý luận trước khi đi vào từng phần nội dung."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {coreConcepts.map((c, i) => (
          <Reveal key={c.term} delay={i * 0.12}>
            <div className="h-full rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold text-brand-red">{c.term}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{c.def}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
