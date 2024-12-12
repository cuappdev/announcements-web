"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
  isLoading?: boolean;
}

export default function ButtonPrimary3({
  text,
  action,
  disabled = false,
  className,
  textStyle,
  isLoading = false,
}: Props) {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <button
      className={`flex p-4 justify-center items-center rounded-md w-full transition-all duration-300 ${
        !disabled && !isLoading ? "hover:opacity-80" : "cursor-default"
      } ${isPressed ? "bg-neutral-100" : "bg-other-background"} ${className}`}
      onClick={(event) => {
        if (!isLoading) handleClick(event);
      }}
      disabled={disabled}
      onMouseDown={() => {
        if (!isLoading) setIsPressed(true);
      }}
      onMouseUp={() => {
        if (!isLoading) setIsPressed(false);
      }}
    >
      {isLoading ? (
        <div className="animate-spin">
          <Loader2 className="stroke-neutral-700" />
        </div>
      ) : (
        <p
          className={`text-center ${
            disabled ? "text-neutral-400" : isPressed ? "text-neutral-500" : "text-neutral-700"
          } ${textStyle ? textStyle : "s2"}`}
        >
          {text}
        </p>
      )}
    </button>
  );
}
