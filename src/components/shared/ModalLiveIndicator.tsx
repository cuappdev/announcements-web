interface ModalLiveIndicatorProps {
  className?: string;
}

export default function ModalLiveIndicator({
  className,
}: ModalLiveIndicatorProps) {
  return (
    <div
      className={`flex h-[32px] py-2 px-3 items-center gap-1 bg-green-100 rounded-xl ${className}`}
    >
      <div className="w-[10px] h-[10px] bg-green-600 border-2 border-green-300 rounded-xl" />
      <div className="label text-green-600 text-center">LIVE</div>
    </div>
  );
}
