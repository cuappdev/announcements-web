"use client";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
  textStyle?: string;
}

export default function ButtonSecondary2({ text, action, disabled = false, className, textStyle }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <button className={`p-4 rounded-md bg-red-100 w-full ${className}`} onClick={handleClick} disabled={disabled}>
      <p className={`text-red-600 ${textStyle ? textStyle : "s2"}`}>{text}</p>
    </button>
  );
}
