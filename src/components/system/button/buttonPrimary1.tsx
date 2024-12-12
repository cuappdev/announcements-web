"use client";

import CaretRightIcon from "@/icons/caretRightIcon";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
}

export default function ButtonPrimary1({ text, action, disabled = false, className, textStyle }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <button
      className={`flex p-4 justify-center items-center gap-1 rounded-md w-full ${className} ${
        disabled ? "bg-other-background" : "bg-red-600"
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      <p
        className={`text-center ${disabled ? "text-neutral-400" : "text-neutral-white"} ${
          textStyle ? textStyle : "s2"
        }`}
      >
        {text}
      </p>
      {!disabled ? <CaretRightIcon className="h-[20px] w-[20px] shrink-0 fill-neutral-white" /> : null}
    </button>
  );
}
