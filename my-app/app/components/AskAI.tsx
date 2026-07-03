"use client";

import { useState } from "react";

export default function AskAI({ eventId }: { eventId: string }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [grounded, setGrounded] = useState(true);
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question, eventId }),
      });
      const data = await res.json();
      setAnswer(data.answer ?? data.error ?? "Đã có lỗi xảy ra.");
      setSource(data.source ?? null);
      setGrounded(data.grounded ?? true);
    } catch {
      setAnswer("Không thể kết nối tới trợ lý AI. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-brand-red underline decoration-dotted underline-offset-4 hover:text-brand-red-dark"
      >
        Hỏi thêm về mốc này (AI)
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-brand-red/20 bg-red-50/50 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-red">
        Trợ lý AI — chỉ trả lời dựa trên tài liệu môn học
      </p>
      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="VD: Vì sao mốc này quan trọng?"
          className="flex-1 rounded-md border border-brand-red/30 bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="rounded-md bg-brand-red px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "..." : "Hỏi"}
        </button>
      </div>
      {answer && (
        <div className="mt-3 rounded-md bg-white p-3 text-sm text-stone-700">
          {!grounded && (
            <p className="mb-1 text-xs font-semibold text-amber-700">
              Chưa cấu hình ANTHROPIC_API_KEY — trả lời bằng đối chiếu từ khóa cục bộ, không phải mô hình AI.
            </p>
          )}
          <p className="whitespace-pre-wrap">{answer}</p>
          {source && <p className="mt-2 text-xs text-stone-400">Nguồn: {source}</p>}
        </div>
      )}
    </div>
  );
}
