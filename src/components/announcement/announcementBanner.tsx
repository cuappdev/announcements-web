import { Announcement } from "@/models/announcement";
import { X } from "lucide-react";

interface Props {
  announcement: Announcement;
}

export default function AnnouncementBanner({ announcement }: Props) {
  return (
    <div className="flex flex-row w-[281px] md:w-[361px] p-4 gap-4 rounded-sm bg-neutral-white border border-other-stroke shadow-lg">
      <img
        src={announcement.imageUrl || undefined}
        className="size-[64px] flex-shrink-0 rounded-sm object-cover object-center"
      />
      <div className="flex flex-col gap-1 flex-1">
        <h6 className="text-neutral-800 line-clamp-1 break-words">{announcement.title}</h6>
        <p className="label text-neutral-600 line-clamp-3 md:line-clamp-2  break-words">{announcement.body}</p>
      </div>
      <X className="size-[20px] stroke-neutral-400" />
    </div>
  );
}
