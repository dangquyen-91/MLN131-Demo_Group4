export default function PullQuote({ text, source }: { text: string; source?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <span className="mx-auto mb-4 block h-0.5 w-16 bg-brand-red" />
      <p className="text-xl font-bold leading-relaxed text-stone-800 sm:text-2xl">
        &ldquo;{text}&rdquo;
      </p>
      <span className="mx-auto mt-4 block h-0.5 w-16 bg-brand-red" />
      {source && <p className="mt-4 text-sm text-stone-500">— {source}</p>}
    </div>
  );
}
