"use client";

import { motion } from "framer-motion";
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

export default function ButtonPrimary1({
  text,
  action,
  disabled = false,
  className,
  textStyle,
  isLoading = false,
}: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  const iconVariants = {
    chevron: { x: 0 },
    arrow: { x: 1 },
  };

  const lineVariants = {
    hidden: { scaleX: 0, originX: 1 },
    visible: { scaleX: 1, originX: 1 },
  };

  return (
    <button
      className={`flex p-4 justify-center items-center gap-2 rounded-md w-full transition-all duration-300 ${
        disabled ? "bg-other-background" : isPressed ? "bg-red-500" : "bg-red-600"
      } ${isLoading ? "cursor-default" : ""} ${className}`}
      onClick={(event) => {
        if (!isLoading) handleClick(event);
      }}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => {
        if (!isLoading) setIsPressed(true);
      }}
      onMouseUp={() => {
        if (!isLoading) setIsPressed(false);
      }}
    >
      {isLoading ? (
        <div className="animate-spin">
          <Loader2 className="stroke-neutral-white" />
        </div>
      ) : (
        <>
          <p
            className={`text-center ${disabled ? "text-neutral-400" : "text-neutral-white"} ${
              textStyle ? textStyle : "s2"
            }`}
          >
            {text}
          </p>
          {!disabled && (
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={isHovered ? "arrow" : "chevron"}
            >
              <motion.path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={iconVariants}
              />
              <motion.line
                x1="3"
                y1="12"
                x2="14"
                y2="12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                variants={lineVariants}
                initial="hidden"
                animate={isHovered ? "visible" : "hidden"}
                transition={{ duration: 0.2 }}
              />
            </motion.svg>
          )}
        </>
      )}
    </button>
  );
}
