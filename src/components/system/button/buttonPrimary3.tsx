"use client";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
}

export default function ButtonPrimary3({ text, action, disabled = false, className, textStyle }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <button
      className={`p-4 bg-other-background rounded-md w-full ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <p className={`text-neutral-700 text-center ${textStyle ? textStyle : "s2"}`}>{text}</p>
    </button>
  );
}
