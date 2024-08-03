interface Props {
  heading: string;
  subheading: string;
}

export default function HeaderMessage({ heading, subheading }: Props) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-neutral-800">{heading}</h2>
      <p className="b1 text-neutral-400">{subheading}</p>
    </div>
  );
}
