"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#hero", label: "Trang chủ" },
  { href: "#khai-niem", label: "Khái niệm" },
  { href: "#co-cau", label: "Cơ cấu xã hội" },
  { href: "#bien-doi", label: "Biến đổi" },
  { href: "#lien-minh", label: "Liên minh" },
  { href: "#viet-nam", label: "Việt Nam" },
  { href: "#tro-choi", label: "Trò chơi" },
  { href: "#quiz", label: "Quiz" },
  { href: "#ai-nguon", label: "AI & Nguồn" },
];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
      setScrolled(doc.scrollTop > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled ? "bg-brand-red-dark/95 backdrop-blur" : "bg-brand-red-dark"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#hero" className="flex items-center gap-2 text-sm font-bold text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-brand-gold text-brand-red-dark">
            ★
          </span>
          CNXHKH · Chương 5
        </a>
        <ul className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-wide text-white/80 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-brand-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#khai-niem"
          className="rounded-full bg-brand-gold px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-red-dark transition-transform hover:scale-105"
        >
          Khám phá
        </a>
      </nav>
      <div className="h-[3px] w-full bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-brand-gold to-brand-red-light transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
