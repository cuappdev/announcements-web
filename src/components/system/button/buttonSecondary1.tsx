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

export default function ButtonSecondary1({
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
      className={`flex p-4 justify-center items-center gap-2 rounded-md w-full transition-all duration-300 bg-red-100 hover:bg-red-200 ${
        isPressed && "bg-red-300 hover:bg-red-300"
      } ${disabled || isLoading ? "cursor-default hover:bg-red-100" : ""} ${className}`}
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
          <Loader2 className="stroke-red-600" />
        </div>
      ) : (
        <>
          <p className={`text-center ${disabled ? "text-red-400" : "text-red-600"} ${textStyle ? textStyle : "s2"}`}>
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
                stroke="#CA4238"
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
                stroke="#CA4238"
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
