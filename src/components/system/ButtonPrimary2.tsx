"use client";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ButtonPrimary2({ text, action, disabled = false, className }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <button
      className={`flex p-4 justify-center items-center gap-1 self-stretch bg-red-100 rounded-md ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <p className="text-red-600 text-center">{text}</p>
    </button>
  );
}
