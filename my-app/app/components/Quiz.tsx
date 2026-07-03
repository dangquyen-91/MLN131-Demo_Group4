"use client";

import { useState } from "react";
import { TimelineEvent } from "@/app/lib/content";

export default function Quiz({ quiz }: { quiz: TimelineEvent["quiz"] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <p className="mb-3 text-sm font-semibold text-amber-900">
        Câu hỏi nhanh: {quiz.question}
      </p>
      <div className="flex flex-col gap-2">
        {quiz.options.map((option, i) => {
          const isCorrect = i === quiz.correctIndex;
          const isSelected = selected === i;
          const showResult = selected !== null;
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              disabled={showResult}
              className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                showResult && isCorrect
                  ? "border-green-500 bg-green-100 text-green-900"
                  : showResult && isSelected && !isCorrect
                    ? "border-red-400 bg-red-50 text-red-800"
                    : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <p className="mt-3 text-sm text-stone-600">
          <span className="font-semibold text-stone-800">Giải thích: </span>
          {quiz.explanation}
        </p>
      )}
    </div>
  );
}
