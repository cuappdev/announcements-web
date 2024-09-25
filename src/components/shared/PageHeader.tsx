interface Props {
  title: String;
  subtitle: String;
}

export default function LandingHeader({ title, subtitle }: Props) {
  return (
    <div className="inline-flex flex-col items-start gap-2 w-full">
      <h2 className="text-neutral-800">{title}</h2>
      <p className="b1 text-neutral-400">{subtitle}</p>
    </div>
  );
}
