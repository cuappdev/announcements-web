"use client";

interface Props {
  text: string;
  action: () => void;
}

export default function ButtonPrimary3({ text, action }: Props) {
  return (
    <button
      className="flex p-4 justify-center items-center gap-1 self-stretch bg-red-600 rounded-md"
      onClick={action}
    >
      <p className="s2 text-neutral-white text-center">{text}</p>
    </button>
  );
}
