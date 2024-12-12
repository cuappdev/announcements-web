import { Announcement } from "@/models/announcement";
import AnnouncementBanner from "./announcementBanner";
import AppIcon from "@/icons/AppIcon";
import ButtonPrimary2 from "../system/ButtonPrimary2";
import ButtonPrimary3 from "../system/ButtonPrimary3";
import CrossThinIcon from "@/icons/CrossThinIcon";
import { dateInRange, formatDate } from "@/utils/utils";
import AnnouncementIndicator from "./announcementIndicator";

interface AnnouncementModalProps {
  onClose: () => void;
  announcement: Announcement | null;
}

export default function AnnouncementModal({ onClose, announcement }: AnnouncementModalProps) {
  if (!announcement) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-neutral-white rounded-lg p-8 max-md:w-full m-4 md:m-8 lg:max-w-[1128px]">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center justify-between gap-1">
                <h4 className="text-neutral-800 break-all">{announcement.title}</h4>
                <button className="h-[24px] w-[24px] fill-neutral-400 opacity-hover" onClick={onClose}>
                  <CrossThinIcon />
                </button>
              </div>
              <p className="b1 text-neutral-600">
                {`${formatDate(new Date(announcement.startDate))} - ${formatDate(new Date(announcement.endDate))}`}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <img src={announcement.creator.imageUrl} className="size-[24px] rounded-xl" />
              <p className="b2 text-neutral-400">{`Scheduled by ${announcement.creator.name}`}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-left md:justify-between">
            <div className="flex flex-row items-center gap-2">
              {announcement.apps.map((app) => (
                <AppIcon key={app} appName={app} className="rounded-sm size-[32px]" />
              ))}
            </div>
            <AnnouncementIndicator announcement={announcement} />
          </div>

          <div className="flex flex-col p-4 justify-center items-center rounded-md border border-other-stroke bg-other-offWhite">
            <AnnouncementBanner announcement={announcement} />
          </div>

          {dateInRange(new Date(announcement.startDate), new Date(announcement.endDate), new Date()) ? (
            <ButtonPrimary3
              text="End Live Announcement"
              action={() => console.log("End Live Announcement button tapped")}
            />
          ) : (
            <ButtonPrimary2 text="Delete Announcement" action={() => console.log("Delete button tapped")} />
          )}
        </div>
      </div>
    </div>
  );
}
