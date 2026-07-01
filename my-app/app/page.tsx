import { coreConcepts } from "@/app/lib/content";
import TimelineExperience from "@/app/components/TimelineExperience";
import ChapterContent from "@/app/components/ChapterContent";
import Nav from "@/app/components/Nav";
import ScrollSpyDots from "@/app/components/ScrollSpyDots";
import SectionHeader from "@/app/components/SectionHeader";
import PullQuote from "@/app/components/PullQuote";
import StatsStrip from "@/app/components/StatsStrip";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Nav />
      <ScrollSpyDots />

      <section id="hero" className="hero-gradient relative overflow-hidden px-6 py-28 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,205,0,0.12),transparent_45%)]" />
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
          Chủ nghĩa xã hội khoa học · Chương 5
        </p>
        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          Cơ Cấu Xã Hội - <span className="text-shine">Giai Cấp</span> Và{" "}
          <span className="text-shine">Liên Minh Giai Cấp</span>, Tầng Lớp
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/70">
          Trong thời kỳ quá độ lên chủ nghĩa xã hội — dòng thời gian tương tác về sự
          biến đổi cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp ở Việt Nam.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#noi-dung"
            className="inline-block rounded-full bg-brand-gold px-6 py-3 text-sm font-bold text-brand-red-dark transition-transform hover:scale-105"
          >
            Xem đầy đủ nội dung chương ↓
          </a>
          <a
            href="#timeline"
            className="inline-block rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Khám phá dòng thời gian tương tác ↓
          </a>
        </div>
        <p className="mt-16 animate-bounce text-xs uppercase tracking-widest text-white/40">
          Cuộn xuống ↓
        </p>
      </section>

      <StatsStrip />

      <section id="nen-tang" className="mx-auto w-full max-w-5xl px-6 py-20">
        <SectionHeader
          eyebrow="Nền tảng lý luận"
          title="Ba khái niệm"
          highlight="cốt lõi"
          subtitle="Nắm vững nền tảng lý luận trước khi đi vào nội dung chi tiết và dòng thời gian minh họa."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {coreConcepts.map((c) => (
            <div
              key={c.term}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 font-semibold text-brand-red">{c.term}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{c.def}</p>
            </div>
          ))}
        </div>
      </section>

      <PullQuote
        text="Liên minh giữa giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức là nền tảng chính trị - xã hội của Nhà nước xã hội chủ nghĩa, là cơ sở bảo đảm thực hiện thắng lợi sự nghiệp xây dựng chủ nghĩa xã hội."
        source="Chương 5, Mục II"
      />

      <section id="noi-dung" className="mx-auto w-full max-w-5xl px-6 py-20">
        <SectionHeader
          eyebrow="Trình bày đầy đủ"
          title="Nội dung"
          highlight="Chương 5"
          subtitle="Theo đúng cấu trúc gốc — nhấn vào từng mục để xem chi tiết."
        />
        <ChapterContent />
      </section>

      <section id="timeline" className="mx-auto w-full max-w-5xl px-6 py-20">
        <SectionHeader
          eyebrow="Minh họa tương tác"
          title="Dòng thời gian"
          highlight="liên minh giai cấp"
          subtitle="Chọn một giai cấp/tầng lớp để làm nổi bật hành trình vai trò của họ qua các mốc lịch sử, hoặc xem tất cả để theo dõi toàn cảnh."
        />
        <TimelineExperience />
      </section>

      <footer className="bg-brand-red-dark px-6 py-10 text-center text-sm text-white/50">
        Sản phẩm học tập môn Chủ nghĩa xã hội khoa học — nội dung được xây dựng dựa
        trên Chương 5: Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp.
      </footer>
    </div>
  );
}
