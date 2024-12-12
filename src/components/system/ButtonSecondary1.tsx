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
      className={`flex py-4 px-6 items-center justify-center gap-2 bg-red-100 rounded-lg self-stretch ${className}`}
      onClick={action}
      disabled={disabled}
    >
      <p className="s2 text-red-600 text-center">{text}</p>
      <CaretRightIcon className="h-[16px] w-[16px] fill-red-600" />
    </button>
  );
}
