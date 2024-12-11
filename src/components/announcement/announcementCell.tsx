import AppIcon from "@/icons/AppIcon";
import TertiaryButton from "../system/ButtonTertiary";
import { Announcement } from "@/models/announcement";
import { dateInRange, filterActiveAnnouncements, formatDate } from "@/utils/utils";
import AnnouncementIndicator from "./announcementIndicator";

interface Props {
  announcement: Announcement;
  onClick: () => void;
}

export default function AnnouncementCell({ announcement, onClick }: Props) {
  const isActive = filterActiveAnnouncements([announcement]).length > 0;

  return (
    <div
      className="flex flex-col p-6 items-start md:items-end md:flex-row justify-center gap-6 md:gap-8 self-stretch bg-neutral-white rounded-lg border border-other-stroke relative cursor-pointer"
      onClick={onClick}
    >
      <img
        src={announcement.imageUrl}
        className="h-[265px] md:w-[108px] md:h-[108px] self-stretch rounded-lg object-cover bg-center"
      />
      <div className="flex flex-col items-start gap-4 self-stretch md:justify-between md:w-full">
        <div className="flex items-start gap-6 self-stretch w-full md:justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="self-stretch text-neutral-800">{announcement.title}</h4>
            <p className="b1 self-stretch text-neutral-600">
              {" "}
              {formatDate(new Date(announcement.startDate))} - {formatDate(new Date(announcement.endDate))}{" "}
            </p>
          </div>
          {isActive ? (
            <TertiaryButton text="Edit" action={() => console.log("Edit Button clicked")} className="max-md:hidden" />
          ) : null}
        </div>
        <div className="flex h-[32px] items-center gap-2">
          {announcement.apps.map((app) => (
            <AppIcon key={app} appName={app} className="rounded-sm w-[32px] h-[32px]" />
          ))}
        </div>
        {isActive ? (
          <TertiaryButton text="Edit" action={() => console.log("Button clicked")} className="md:hidden" />
        ) : null}
      </div>
      {dateInRange(new Date(announcement.startDate), new Date(announcement.endDate), new Date()) ? (
        <AnnouncementIndicator announcement={announcement} />
      ) : null}
    </div>
  );
}
