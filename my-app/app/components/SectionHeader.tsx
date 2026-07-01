export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-brand-red/40" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-brand-red/40" />
      </div>
      <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl">
        {title} {highlight && <span className="text-brand-red">{highlight}</span>}
      </h2>
      {subtitle && <p className="mt-3 text-stone-600">{subtitle}</p>}
    </div>
  );
}
