import { Block, chapterConclusion, chapterSections } from "@/app/lib/chapterContent";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-sm leading-relaxed text-stone-700">{block.text}</p>;
    case "ul":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-stone-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "summary":
      return (
        <div className="rounded-lg bg-stone-100 p-4">
          <p className="mb-2 text-sm font-semibold text-stone-800">{block.title}</p>
          <ul className="flex flex-col gap-1.5">
            {block.items.map((item, i) => (
              <li key={i} className="text-sm leading-relaxed text-stone-600">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "example":
      return (
        <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
            Ví dụ thực tiễn
          </p>
          <p className="text-sm leading-relaxed text-stone-700">{block.text}</p>
        </div>
      );
  }
}

export default function ChapterContent() {
  return (
    <div className="flex flex-col gap-8">
      {chapterSections.map((section) => (
        <div
          key={section.id}
          className="overflow-hidden rounded-xl border border-stone-200 bg-white"
        >
          <div className="border-b border-stone-100 border-l-4 border-l-brand-red p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">
              Phần {section.roman}
            </p>
            <h3 className="mt-1 text-lg font-bold text-stone-900">{section.title}</h3>
            {section.intro?.map((block, i) => (
              <div key={i} className="mt-3 border-l-2 border-brand-gold pl-3 italic">
                <BlockView block={block} />
              </div>
            ))}
          </div>

          <div className="divide-y divide-stone-100">
            {section.subsections.map((sub, i) => (
              <details key={i} className="group p-5 open:bg-stone-50/60" open={i === 0}>
                <summary className="cursor-pointer list-none font-semibold text-stone-800 marker:content-none">
                  <span className="mr-2 inline-block text-brand-red transition-transform group-open:rotate-90">
                    ▸
                  </span>
                  {sub.heading}
                </summary>
                <div className="mt-4 flex flex-col gap-4 pl-5">
                  {sub.blocks.map((block, j) => (
                    <BlockView key={j} block={block} />
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-brand-red-dark bg-brand-red-dark p-6 text-white">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
          Kết luận chương 5
        </p>
        <p className="text-sm leading-relaxed">{chapterConclusion}</p>
      </div>
    </div>
  );
}
