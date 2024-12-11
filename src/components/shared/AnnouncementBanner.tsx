import CrossThick from "@/icons/CrossThickIcon";
import { Announcement } from "@/models/announcement";

interface Props {
  announcement: Announcement;
}

export default function AnnouncementBanner({ announcement }: Props) {
  return (
    <div className="flex w-[281px] md:w-[361px] p-4 items-start gap-4 rounded-sm bg-neutral-white border border-other-stroke shadow-lg">
      <img
        src={announcement.imageUrl}
        className="w-[64px] h-[64px] flex-shrink-0 rounded-sm object-cover object-center"
      ></img>
      <div className="w-full flex flex-col relative gap-1">
        <h6 className="text-neutral-800">{announcement.title}</h6>
        <p className="label text-neutral-600">{announcement.body}</p>
        <CrossThick className="absolute -right-1 -top-1 h-[20px] w-[20px] fill-neutral-400" />
      </div>
    </div>
  );
}
