"use client";

import CaretRightIcon from "@/icons/caretRightIcon";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
}

export default function ButtonSecondary1({ text, action, disabled = false, className, textStyle }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <button
      className={`flex p-4 items-center justify-center gap-2 bg-red-100 rounded-md w-full ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <p className={`text-red-600 text-center ${textStyle ? textStyle : "s2"}`}>{text}</p>
      <CaretRightIcon className="size-[16px] fill-red-600" />
    </button>
  );
}
