"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Trang chủ" },
  { id: "khai-niem", label: "Khái niệm" },
  { id: "co-cau", label: "Cơ cấu xã hội" },
  { id: "bien-doi", label: "Biến đổi" },
  { id: "lien-minh", label: "Liên minh" },
  { id: "viet-nam", label: "Việt Nam" },
  { id: "tro-choi", label: "Trò chơi" },
  { id: "quiz", label: "Quiz" },
];

export default function ScrollSpyDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={s.label}
          title={s.label}
          className={`h-2.5 w-2.5 rounded-full border transition-all ${
            active === s.id
              ? "scale-125 border-brand-red bg-brand-red"
              : "border-stone-300 bg-transparent hover:border-brand-red"
          }`}
        />
      ))}
    </div>
  );
}
