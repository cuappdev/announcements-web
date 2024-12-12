import AppIcon from "@/icons/appIcon";
import { Announcement } from "@/models/announcement";
import { DateFormat } from "@/models/enums/dateFormat";
import { dateInRange, filterActiveAnnouncements, formatDate } from "@/utils/utils";
import ButtonTertiary from "../system/button/buttonTertiary";
import AnnouncementIndicator from "./announcementIndicator";

interface Props {
  announcement: Announcement;
  onClick: () => void;
  onEditClick: () => void;
}

export default function AnnouncementCell({ announcement, onClick, onEditClick }: Props) {
  const isActive = filterActiveAnnouncements([announcement]).length > 0;

  return (
    <div
      className="flex flex-col p-6 items-start md:items-end md:flex-row justify-center gap-6 md:gap-8 self-stretch bg-neutral-white rounded-lg border border-other-stroke relative transition-all duration-300 cursor-pointer hover:bg-neutral-50"
      onClick={onClick}
    >
      <img src={announcement.imageUrl} className="rounded-lg md:size-[108px]" />
      <div className="flex flex-col items-start gap-4 self-stretch md:justify-between md:w-full">
        <div className="flex items-start gap-6 self-stretch w-full md:justify-between">
          <div className="flex flex-col gap-1 w-full">
            <h4 className="self-stretch text-neutral-800">{announcement.title}</h4>
            <p className="b1 self-stretch text-neutral-600">
              {formatDate(new Date(announcement.startDate), DateFormat.SHORT)} -{" "}
              {formatDate(new Date(announcement.endDate), DateFormat.SHORT)}
            </p>
          </div>
          {isActive ? (
            <ButtonTertiary text="Edit" action={onEditClick} className="max-md:hidden flex-1 rounded-xl py-2" />
          ) : null}
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
          <div className="flex h-[32px] items-center gap-2">
            {announcement.apps.map((app) => (
              <AppIcon key={app} appName={app} className="rounded-sm w-[32px] h-[32px]" />
            ))}
          </div>
          {dateInRange(new Date(announcement.startDate), new Date(announcement.endDate), new Date()) ? (
            <AnnouncementIndicator announcement={announcement} />
          ) : null}
        </div>
        {isActive ? (
          <ButtonTertiary text="Edit" action={onEditClick} className="md:hidden flex-1 rounded-xl py-2" />
        ) : null}
      </div>
    </div>
  );
}
