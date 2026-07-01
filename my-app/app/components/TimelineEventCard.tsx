"use client";

import { useState } from "react";
import { TimelineEvent, khiaCanhLabel, roles } from "@/app/lib/content";
import { useInView } from "@/app/hooks/useInView";
import Quiz from "./Quiz";
import AskAI from "./AskAI";

export default function TimelineEventCard({
  event,
  dimmed,
  side,
}: {
  event: TimelineEvent;
  dimmed: boolean;
  side: "left" | "right";
}) {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative flex flex-col gap-4 ${inView ? "animate-fade-up" : "opacity-0"}`}
    >
      <div
        className={`rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-opacity duration-500 md:w-[calc(50%-2rem)] ${
          dimmed ? "opacity-30" : "opacity-100"
        } ${side === "right" ? "md:ml-auto" : ""}`}
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-brand-red-dark px-3 py-1 text-xs font-semibold text-brand-gold">
            {event.year}
          </span>
          {event.roles.map((r) => {
            const role = roles.find((x) => x.id === r);
            return (
              <span
                key={r}
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{ backgroundColor: `${role?.color}1a`, color: role?.color }}
              >
                {role?.label}
              </span>
            );
          })}
        </div>
        <h3 className="text-lg font-semibold text-stone-900">{event.title}</h3>
        <p className="mt-1 text-sm text-stone-600">{event.summary}</p>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm font-medium text-brand-red underline decoration-dotted underline-offset-4"
        >
          {expanded ? "Thu gọn" : "Xem phân tích liên minh"}
        </button>

        {expanded && (
          <div className="mt-4 flex flex-col gap-4 border-t border-stone-100 pt-4">
            <p className="text-sm leading-relaxed text-stone-700">{event.detail}</p>
            <div className="flex flex-wrap gap-1.5">
              {event.khiaCanh.map((k) => (
                <span
                  key={k}
                  className="rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600"
                >
                  Khía cạnh: {khiaCanhLabel[k]}
                </span>
              ))}
            </div>
            <Quiz quiz={event.quiz} />
            <AskAI eventId={event.id} />
            <p className="text-xs text-stone-400">Nguồn: {event.source}</p>
          </div>
        )}
      </div>
    </div>
  );
}
