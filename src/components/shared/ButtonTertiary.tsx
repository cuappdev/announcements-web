"use client";

import EditIcon from "@/icons/EditIcon";

interface Props {
  text: string;
  action: () => void;
  className?: string;
}

export default function TertiaryButton({ text, action, className }: Props) {
  return (
    <button
      className={`flex py-2 px-4 justify-center items-center gap-2 rounded-xl border border-other-stroke bg-neutral-white ${className}`}
      onClick={action}
    >
      <EditIcon className="w-[16px] h-[16px] stroke-neutral-black"></EditIcon>
      <p className="b1 text-neutral-800 text-center">{text}</p>
    </button>
  );
}
