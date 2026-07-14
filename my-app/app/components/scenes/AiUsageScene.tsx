// ================================================================
//  Mục "AI Usage & Nguồn tham khảo" — minh bạch quá trình dùng AI
//  và trích dẫn nguồn cho web thuyết trình Chương 5 (CNXHKH).
// ================================================================

interface AiTool {
  name: string;
  vendor: string;
  glyph: string;
  accent: string;
}

interface AiLogEntry {
  tool: string;
  glyph: string;
  accent: string;
  title: string;
  prompt: string;
  result: string;
  edit: string;
}

const aiTools: AiTool[] = [
  { name: "Claude Code", vendor: "Anthropic", glyph: "✳️", accent: "#c2410c" },
  { name: "Codex", vendor: "OpenAI", glyph: "💻", accent: "#0f766e" },
  { name: "Gemini", vendor: "Google", glyph: "✨", accent: "#2563eb" },
  { name: "NotebookLM", vendor: "Google", glyph: "📓", accent: "#b91c1c" },
];

const aiLog: AiLogEntry[] = [
  {
    tool: "Claude Code",
    glyph: "✳️",
    accent: "#c2410c",
    title: "Dựng website thuyết trình và trò chơi tương tác",
    prompt:
      "Chuyển đề cương Chương 5 (cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp) thành bố cục web thuyết trình theo lối scrollytelling và phác thảo trò chơi củng cố kiến thức.",
    result:
      "Khung trang, nhịp section, các component (mốc thực tiễn, quiz, trò chơi Mật Mã Liên Minh) và bố cục trình bày ban đầu.",
    edit:
      "Nhóm rà soát nội dung, sửa lời văn, tinh chỉnh bố cục, thay tư liệu và tự quyết định câu hỏi cùng phần trò chơi cuối cùng.",
  },
  {
    tool: "Codex",
    glyph: "💻",
    accent: "#0f766e",
    title: "Tinh chỉnh giao diện và kiểm tra kỹ thuật",
    prompt:
      "Điều chỉnh section, responsive, typography và đảm bảo các mục trình bày đúng cấp bậc thị giác.",
    result:
      "CSS/React được chỉnh sửa, build kiểm tra bằng lint và production build đều đạt.",
    edit:
      "Nhóm duyệt lại hiển thị, yêu cầu sửa theo tiêu chí chấm và giữ quyền quyết định nội dung cuối.",
  },
  {
    tool: "Gemini",
    glyph: "✨",
    accent: "#2563eb",
    title: "Gợi ý hướng nghiên cứu",
    prompt:
      "Tổng hợp các luận điểm cần kiểm chứng về liên minh giai cấp và cơ cấu xã hội - giai cấp ở Việt Nam thời kỳ quá độ.",
    result:
      "Danh sách ý tưởng, câu hỏi nghiên cứu và hướng liên hệ thực tiễn.",
    edit:
      "Chỉ giữ ý phù hợp, đối chiếu lại bằng giáo trình, văn kiện và nguồn chính thống trước khi đưa vào bài.",
  },
  {
    tool: "NotebookLM",
    glyph: "📓",
    accent: "#b91c1c",
    title: "Tra cứu tài liệu tham khảo",
    prompt:
      "Đọc tài liệu môn học và trích ra các ý liên quan đến cơ cấu xã hội - giai cấp và liên minh công - nông - trí.",
    result:
      "Gợi ý vị trí nội dung cần đọc, tóm tắt nhanh các ý chính để nhóm kiểm tra lại.",
    edit:
      "Nhóm đọc lại tài liệu gốc, viết lại bằng lời của nhóm và ghi nguồn ở danh mục tham khảo.",
  },
];

const references: string[] = [
  "Giáo trình Chủ nghĩa xã hội khoa học — Chương 5: Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp (Nxb Chính trị quốc gia Sự thật).",
  "Nghị quyết số 09-NQ/TW ngày 9/12/2011 của Bộ Chính trị về xây dựng và phát huy vai trò của đội ngũ doanh nhân Việt Nam.",
  "Nghị quyết số 10-NQ/TW ngày 5/4/1988 của Bộ Chính trị (\"Khoán 10\") về đổi mới quản lý kinh tế nông nghiệp.",
  "Văn kiện Đại hội đại biểu toàn quốc lần thứ VI (1986) — Đảng Cộng sản Việt Nam: đường lối đổi mới, kinh tế thị trường định hướng XHCN.",
];

const evidences: { label: string; note: string }[] = [
  { label: "Xô Viết Nghệ Tĩnh (1930 - 1931)", note: "Liên minh chính trị giữa công nhân và nông dân trong đấu tranh." },
  { label: "Cải cách ruộng đất (1953 - 1956)", note: "Biến đổi cơ cấu kinh tế kéo theo cơ cấu xã hội - giai cấp ở nông thôn." },
  { label: "Khoán 10 (1988)", note: "Nội dung kinh tế của liên minh: trí thức chuyển giao giống lúa cho nông dân." },
  { label: "Nghị quyết 09-NQ/TW (2011)", note: "Thừa nhận vai trò đội ngũ doanh nhân trong cơ cấu xã hội - giai cấp." },
  { label: "Cơ cấu giai cấp Việt Nam đương đại", note: "Đô thị hóa, tầng lớp trung lưu và trí thức phát triển nhanh." },
];

function LogRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[120px_1fr] sm:gap-3">
      <span className="text-[11px] font-black uppercase tracking-wide text-brand-red">{label}</span>
      <span className="text-sm font-semibold leading-relaxed text-stone-700">{value}</span>
    </div>
  );
}

export default function AiUsageScene() {
  return (
    <section id="ai-nguon" className="w-full bg-[#f4f1e8] px-4 py-16 text-stone-950 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {/* Tiêu đề */}
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-brand-red text-lg font-black text-white shadow-[3px_3px_0_0_#990000] sm:h-16 sm:w-16 sm:text-xl">
            AI
          </span>
          <h2 className="text-2xl font-black uppercase leading-none tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            AI Usage &amp; Nguồn tham khảo
          </h2>
        </div>

        {/* 1. Công cụ AI đã sử dụng */}
        <div className="rounded-2xl border-2 border-stone-900 bg-stone-800 p-5 shadow-[6px_6px_0_0_#990000] sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-gold">
            Công cụ AI đã sử dụng
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-stone-700 bg-brand-cream p-4 text-center transition-transform hover:-translate-y-1"
              >
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border-2 bg-white text-2xl"
                  style={{ borderColor: tool.accent }}
                >
                  {tool.glyph}
                </div>
                <p className="mt-3 text-sm font-black text-stone-900">{tool.name}</p>
                <p className="text-xs font-bold text-stone-500">{tool.vendor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Nhật ký sử dụng AI */}
        <div className="rounded-2xl border-2 border-stone-900 bg-white p-5 sm:p-6">
          <span className="inline-block rounded-md border border-brand-gold bg-brand-gold/15 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-stone-800">
            Nhật ký sử dụng AI
          </span>
          <p className="mt-3 text-sm font-black text-stone-700">
            Công cụ · mục đích · prompt chính · kết quả · chỉnh sửa
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {aiLog.map((item) => (
              <div key={item.tool} className="overflow-hidden rounded-xl border border-stone-200">
                <div className="border-b border-stone-200 bg-[#fbf3d9] p-4">
                  <p
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wide"
                    style={{ color: item.accent }}
                  >
                    <span className="text-sm">{item.glyph}</span> {item.tool}
                  </p>
                  <h3 className="mt-1 text-lg font-black leading-snug text-stone-900">{item.title}</h3>
                </div>
                <div className="divide-y divide-stone-100">
                  <LogRow label="Prompt chính" value={item.prompt} />
                  <LogRow label="Kết quả" value={item.result} />
                  <LogRow label="Phần chỉnh sửa" value={item.edit} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Nguồn tham khảo + Dẫn chứng thực tiễn */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-stone-900 bg-white p-5 sm:p-6">
            <span className="inline-block rounded-md border border-brand-red/40 bg-brand-red/5 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-brand-red">
              Nguồn tham khảo
            </span>
            <h3 className="mt-3 text-xl font-black text-stone-900">Tài liệu chính thức của môn học</h3>
            <ol className="mt-4 flex flex-col gap-3">
              {references.map((ref, i) => (
                <li key={i} className="grid grid-cols-[34px_1fr] items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-red text-xs font-black text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold leading-relaxed text-stone-700">{ref}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border-2 border-stone-900 bg-white p-5 sm:p-6">
            <span className="inline-block rounded-md border border-brand-gold bg-brand-gold/15 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-stone-800">
              Dẫn chứng thực tiễn
            </span>
            <h3 className="mt-3 text-xl font-black text-stone-900">Ví dụ minh họa trong bài</h3>
            <ol className="mt-4 flex flex-col gap-3">
              {evidences.map((ev, i) => (
                <li key={i} className="grid grid-cols-[34px_1fr] items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-stone-900 text-xs font-black text-brand-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-sm font-black text-stone-900">{ev.label}</span>
                    <span className="block text-xs font-semibold leading-relaxed text-stone-500">{ev.note}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
