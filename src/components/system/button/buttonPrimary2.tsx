"use client";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
}

export default function ButtonPrimary2({ text, action, disabled = false, className, textStyle }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <button className={`p-4 bg-red-600 rounded-md w-full ${className}`} onClick={handleClick} disabled={disabled}>
      <p className={`text-neutral-white text-center ${textStyle ? textStyle : "s2"}`}>{text}</p>
    </button>
  );
}
