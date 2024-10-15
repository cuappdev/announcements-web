"use client";

interface Props {
  text: string;
  action: () => void;
}

export default function ButtonPrimary2({ text, action }: Props) {
  return (
    <button
      className="flex p-4 justify-center items-center gap-1 self-stretch bg-red-100 rounded-md"
      onClick={action}
    >
      <p className="text-red-600 text-center">{text}</p>
    </button>
  );
}
