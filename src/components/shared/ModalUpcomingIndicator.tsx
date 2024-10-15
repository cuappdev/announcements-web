interface ModalUpcomingIndicatorProps {
  className?: string;
}

export default function ModalUpcomingIndicator({
  className,
}: ModalUpcomingIndicatorProps) {
  return (
    <div
      className={`flex h-[32px] py-2 px-3 items-center gap-1 bg-blue-200 rounded-xl ${className}`}
    >
      <div className="label text-blue-600 text-center">UPCOMING</div>
    </div>
  );
}
