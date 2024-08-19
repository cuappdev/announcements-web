export default function TertiaryButton() {
  return (
    <div className="flex h-[32px] py-2 px-3 items-center gap-1 absolute right-[40px] top-[40px] md:bottom-[24px] md:right-[24px] md:top-auto bg-green-100 rounded-xl">
      <div className="w-[10px] h-[10px] bg-green-600 border-2 border-green-300 rounded-xl" />
      <div className="label text-green-600 text-center">LIVE</div>
    </div>
  );
}
