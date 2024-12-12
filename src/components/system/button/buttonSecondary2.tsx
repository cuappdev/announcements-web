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

export default function ButtonSecondary2({
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
      className={`flex p-4 justify-center items-center gap-2 rounded-md w-full transition-all duration-300 bg-red-100 hover:bg-red-200 ${
        isPressed && "bg-red-300 hover:bg-red-300"
      } ${disabled || isLoading ? "cursor-default hover:bg-red-100" : ""} ${className}`}
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
          <Loader2 className="stroke-red-600" />
        </div>
      ) : (
        <p className={`text-center ${disabled ? "text-red-400" : "text-red-600"} ${textStyle ? textStyle : "s2"}`}>
          {text}
        </p>
      )}
    </button>
  );
}
