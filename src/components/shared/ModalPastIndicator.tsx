interface ModalPastIndicatorProps {
  className?: string;
}

export default function ModalPastIndicator({
  className,
}: ModalPastIndicatorProps) {
  return (
    <div
      className={`flex h-[32px] py-2 px-3 items-center gap-1 bg-red-100 rounded-xl ${className}`}
    >
      <div className="label text-red-600 text-center">PAST</div>
    </div>
  );
}
