"use client";

import { Loader2, PencilIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
  isLoading?: boolean;
}

export default function ButtonTertiary({
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
      className={`flex p-4 justify-center items-center gap-2 rounded-md border border-other-stroke bg-neutral-white hover:bg-other-offWhite w-full ${
        isPressed && "bg-other-background hover:bg-other-background"
      } ${disabled || isLoading ? "cursor-default hover:bg-neutral-white" : ""} ${className}`}
      onClick={handleClick}
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
          <Loader2 className="stroke-neutral-black" />
        </div>
      ) : (
        <>
          <PencilIcon className={`size-[16px] ${disabled ? "stroke-neutral-300" : "stroke-neutral-black"}`} />
          <p
            className={`text-center ${disabled ? "text-neutral-300" : "text-neutral-800"} ${
              textStyle ? textStyle : "b1"
            }`}
          >
            {text}
          </p>
        </>
      )}
    </button>
  );
}
