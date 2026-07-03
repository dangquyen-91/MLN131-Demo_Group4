import { roles, timeline } from "@/app/lib/content";
import CountUp from "@/app/components/motion/CountUp";

const stats = [
  { value: 3, label: "Quy luật biến đổi cơ cấu xã hội - giai cấp" },
  { value: 3, label: "Nội dung liên minh: kinh tế · chính trị · văn hóa xã hội" },
  { value: roles.length, label: "Giai cấp, tầng lớp cơ bản ở Việt Nam" },
  { value: timeline.length, label: "Mốc lịch sử tiêu biểu trong dòng thời gian" },
];

export default function StatsStrip() {
  return (
    <div className="border-y border-white/10 bg-brand-red-dark">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <CountUp value={s.value} className="text-3xl font-extrabold text-brand-gold sm:text-4xl" />
            <p className="mt-1 text-xs leading-snug text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
