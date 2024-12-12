"use client";

import EditIcon from "@/icons/editIcon";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
}

export default function TertiaryButton({ text, action, disabled = false, className, textStyle }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <button
      className={`flex p-4 justify-center items-center gap-2 rounded-md border border-other-stroke bg-neutral-white w-full ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <EditIcon className="w-[16px] h-[16px] stroke-neutral-black"></EditIcon>
      <p className={`text-neutral-800 text-center ${textStyle ? textStyle : "b1"}`}>{text}</p>
    </button>
  );
}
