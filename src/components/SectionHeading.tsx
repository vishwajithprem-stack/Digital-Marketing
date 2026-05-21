interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="eyebrow-chip mb-4">{eyebrow}</p>
      <h2 className="display-title headline-gradient text-3xl font-bold md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-mist/85 md:text-base">{subtitle}</p>
    </div>
  );
}
