import CaretRightIcon from "@/icons/CaretRightIcon";

interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ButtonPrimary1({ text, action, disabled = false, className }: Props) {
  return (
    <button
      className={`flex p-4 justify-center items-center gap-1 self-stretch rounded-md ${className} ${
        disabled ? "bg-other-background" : "bg-red-600"
      }`}
      onClick={action}
      disabled={disabled}
    >
      <p className={`s2 text-center ${disabled ? "text-neutral-400" : "text-neutral-white"}`}>{text}</p>
      {!disabled ? <CaretRightIcon className="h-[20px] w-[20px] shrink-0 fill-neutral-white" /> : null}
    </button>
  );
}
