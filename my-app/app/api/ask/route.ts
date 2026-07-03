import { NextRequest, NextResponse } from "next/server";
import { timeline, coreConcepts } from "@/app/lib/content";

export const runtime = "nodejs";

function buildContext(eventId?: string) {
  const concepts = coreConcepts.map((c) => `${c.term}: ${c.def}`).join("\n");
  const events = timeline
    .filter((e) => !eventId || e.id === eventId)
    .map((e) => `[${e.year}] ${e.title}\n${e.detail}\nNguồn: ${e.source}`)
    .join("\n\n");
  return `${concepts}\n\n${events}`;
}

function localFallback(question: string, eventId?: string) {
  const q = question.toLowerCase();
  const candidates = timeline.filter((e) => !eventId || e.id === eventId);
  const match =
    candidates.find(
      (e) =>
        q.includes(e.title.toLowerCase()) ||
        e.detail.toLowerCase().split(" ").some((w) => w.length > 5 && q.includes(w))
    ) ?? candidates[0];

  return {
    answer: match
      ? `[Chế độ ngoại tuyến — chưa cấu hình khóa API] Dựa trên tài liệu môn học, mốc "${match.title}" (${match.year}) có nội dung liên quan: ${match.detail}`
      : "[Chế độ ngoại tuyến] Chưa cấu hình ANTHROPIC_API_KEY nên trợ lý chỉ có thể trả lời bằng cách khớp từ khóa với tài liệu môn học, không tạo sinh nội dung mới.",
    source: match?.source ?? "Chương 5",
    grounded: false,
  };
}

export async function POST(req: NextRequest) {
  const { question, eventId } = (await req.json()) as {
    question?: string;
    eventId?: string;
  };

  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json({ error: "Thiếu câu hỏi." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(localFallback(question, eventId));
  }

  const context = buildContext(eventId);
  const system = `Bạn là trợ lý học tập cho môn Chủ nghĩa xã hội khoa học, chương "Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp".
Chỉ trả lời DỰA TRÊN nội dung tài liệu được cung cấp dưới đây, không suy diễn hay bổ sung kiến thức ngoài phạm vi.
Nếu câu hỏi nằm ngoài tài liệu, hãy nói rõ là ngoài phạm vi tài liệu môn học thay vì bịa thông tin.
Luôn trả lời bằng tiếng Việt, ngắn gọn (dưới 120 từ), và kết thúc bằng một dòng "Nguồn: ..." trỏ về mốc/mục liên quan trong tài liệu.

TÀI LIỆU:
${context}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 400,
        system,
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `Lỗi gọi AI: ${res.status}`, detail: errText },
        { status: 502 }
      );
    }

    const data = await res.json();
    const answer = data?.content?.[0]?.text ?? "Không nhận được phản hồi từ AI.";
    return NextResponse.json({ answer, grounded: true });
  } catch {
    return NextResponse.json(localFallback(question, eventId));
  }
}
