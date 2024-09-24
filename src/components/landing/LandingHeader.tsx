interface Props {
  name: String;
}

export default function LandingHeader({ name }: Props) {
  return (
    <div className="inline-flex flex-col items-start gap-2 w-full">
      <h2 className="text-neutral-800">Welcome, {name}!</h2>
      <p className="b1 text-neutral-400">
        Send announcements to our applications.
      </p>
    </div>
  );
}
