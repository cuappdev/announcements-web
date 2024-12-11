import AppIcon from "@/icons/AppIcon";
import TertiaryButton from "../shared/ButtonTertiary";
import { Announcement } from "@/models/announcement";
import {
  dateInRange,
  filterActiveAnnouncements,
  formatDate,
} from "@/utils/utils";
import { useEffect, useState } from "react";
import LiveIndicator from "../shared/LiveIndicator";

interface Props {
  announcement: Announcement;
  onClick: () => void;
}

export default function AnnouncementCell({ announcement, onClick }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const isActive = filterActiveAnnouncements([announcement]).length > 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="flex flex-col p-6 cursor-pointer items-start md:items-end md:flex-row justify-center gap-6 md:gap-8 self-stretch bg-neutral-white rounded-lg border border-other-stroke relative"
      onClick={onClick}
    >
      <img
        src={announcement.imageUrl}
        className="h-[265px] md:w-[108px] md:h-[108px] self-stretch rounded-lg object-cover bg-center"
      />
      <div className="flex flex-col items-start gap-4 self-stretch md:justify-between md:w-full">
        <div className="flex items-start gap-6 self-stretch w-full md:justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="self-stretch text-neutral-800">
              {announcement.title}
            </h4>
            <p className="b1 self-stretch text-neutral-600">
              {" "}
              {formatDate(announcement.startDate)} -{" "}
              {formatDate(announcement.endDate)}{" "}
            </p>
          </div>
          {isActive ? (
            <TertiaryButton
              text="Edit"
              action={() => console.log("Edit Button clicked")}
              className="max-md:hidden"
            />
          ) : null}
        </div>
        <div className="flex h-[32px] items-center gap-2">
          {announcement.apps.map((app) => (
            <AppIcon
              key={app}
              appName={app}
              className="rounded-sm w-[32px] h-[32px]"
            />
          ))}
        </div>
        {isActive ? (
          <TertiaryButton
            text="Edit"
            action={() => console.log("Button clicked")}
            className="md:hidden"
          />
        ) : null}
      </div>
      {dateInRange(
        announcement.startDate,
        announcement.endDate,
        currentDate
      ) ? (
        <LiveIndicator />
      ) : null}
    </div>
  );
}
