"use client";

import { Loader2 } from "lucide-react";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
  isLoading?: boolean;
}

export default function ButtonPrimary2({
  text,
  action,
  disabled = false,
  className,
  textStyle,
  isLoading = false,
}: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <button
      className={`flex p-4 justify-center items-center rounded-md w-full transition-all duration-300 ${
        disabled ? "bg-other-background" : "bg-red-600"
      } ${!disabled && !isLoading ? "hover:bg-red-500" : "cursor-default"} ${className}`}
      onClick={(event) => {
        if (!isLoading) handleClick(event);
      }}
      disabled={disabled}
    >
      {isLoading ? (
        <div className="animate-spin">
          <Loader2 className="stroke-neutral-white" />
        </div>
      ) : (
        <p
          className={`text-center ${disabled ? "text-neutral-400" : "text-neutral-white"} ${
            textStyle ? textStyle : "s2"
          }`}
        >
          {text}
        </p>
      )}
    </button>
  );
}
