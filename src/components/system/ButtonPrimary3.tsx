"use client";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ButtonPrimary3({ text, action, disabled = false, className }: Props) {
  return (
    <button
      className={`flex p-4 justify-center items-center gap-1 self-stretch bg-red-600 rounded-md ${className}`}
      onClick={action}
      disabled={disabled}
    >
      <p className="s2 text-neutral-white text-center">{text}</p>
    </button>
  );
}
