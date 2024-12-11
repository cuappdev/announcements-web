import { Announcement } from "@/models/announcement";
import { dateInRange } from "@/utils/utils";

interface Props {
  announcement: Announcement;
}

export default function AnnouncementIndicator({ announcement }: Props) {
  let text: string = "";
  let bgColor: string = "";
  let textColor: string = "";
  const isLive = dateInRange(new Date(announcement.startDate), new Date(announcement.endDate), new Date());

  if (isLive) {
    text = "LIVE";
    bgColor = "bg-green-100";
    textColor = "text-green-600";
  } else if (new Date() > new Date(announcement.endDate)) {
    text = "PAST";
    bgColor = "bg-red-100";
    textColor = "text-red-600";
  } else if (new Date() < new Date(announcement.startDate)) {
    text = "UPCOMING";
    bgColor = "bg-blue-200";
    textColor = "text-blue-600";
  }

  return (
    <div className={`rounded-xl py-2 px-3 flex flex-row gap-1 items-center justify-center w-fit ${bgColor}`}>
      {isLive ? <div className="w-[10px] h-[10px] bg-green-600 border-2 border-green-300 rounded-xl" /> : null}
      <p className={`label ${textColor}`}>{text}</p>
    </div>
  );
}
