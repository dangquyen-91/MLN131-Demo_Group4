import { chapterConclusion, chapterSections } from "@/app/lib/chapterContent";
import SectionHeader from "@/app/components/SectionHeader";
import Reveal from "@/app/components/motion/Reveal";
import Quiz from "@/app/components/Quiz";

export default function QuizScene() {
  return (
    <section id="quiz" className="mx-auto w-full max-w-5xl px-6 py-24">
      <SectionHeader
        eyebrow="Tổng kết"
        title="Kiểm tra nhanh"
        highlight="cuối chương"
        subtitle="Ba câu hỏi ôn lại ba phần nội dung vừa khám phá."
      />

      <div className="grid gap-5 sm:grid-cols-3">
        {chapterSections.map((section, i) => (
          <Reveal key={section.id} delay={i * 0.12}>
            <div className="flex h-full flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-red">
                Phần {section.roman}
              </p>
              <Quiz quiz={section.recap} />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 rounded-xl border border-brand-red-dark bg-brand-red-dark p-6 text-white">
          <p className="text-sm leading-relaxed">{chapterConclusion}</p>
        </div>
      </Reveal>
    </section>
  );
}
