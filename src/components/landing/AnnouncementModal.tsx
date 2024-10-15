import { Announcement } from "@/models/Announcement";
import AnnouncementBanner from "../shared/AnnouncementBanner";
import AppIcon from "@/icons/AppIcon";
import ButtonPrimary2 from "../shared/ButtonPrimary2";
import ButtonPrimary3 from "../shared/ButtonPrimary3";
import CrossThinIcon from "@/icons/CrossThinIcon";
import { dateInRange, formatDate } from "@/utils/utils";
import ModalLiveIndicator from "../shared/ModalLiveIndicator";
import ModalPastIndicator from "../shared/ModalPastIndicator";
import ModalUpcomingIndicator from "../shared/ModalUpcomingIndicator";
import { useEffect, useState } from "react";

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: Announcement | null;
}

export default function AnnouncementModal({
  isOpen,
  onClose,
  announcement,
}: AnnouncementModalProps) {
  if (!isOpen || !announcement) return null;

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 bg-neutral-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-neutral-white rounded-lg p-6 w-[500px] shadow-lg relative">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <h4 className="self-stretch text-neutral-800">
                  {announcement.title}
                </h4>
                <button className="h-[24px] w-[24px] ml-auto" onClick={onClose}>
                  <CrossThinIcon />
                </button>
              </div>
              <p className="b1 self-stretch text-neutral-600">
                {" "}
                {formatDate(announcement.startDate)} -{" "}
                {formatDate(announcement.endDate)}{" "}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center gap-2">
                <img
                  src="/user-placeholder-icons/lauren.png"
                  className="w-8 h-8 rounded-full"
                />
                <p className="b2 text-neutral-black text-center">
                  Scheduled by Lauren Jun
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-left">
                <div className="flex h-[32px] items-center gap-2">
                  {announcement.apps.map((app) => (
                    <AppIcon
                      appName={app}
                      className="rounded-sm w-[32px] h-[32px]"
                    />
                  ))}
                </div>
                {dateInRange(
                  announcement.startDate,
                  announcement.endDate,
                  currentDate
                ) ? (
                  <ModalLiveIndicator className="md:ml-auto w-fit" />
                ) : currentDate > announcement.endDate ? (
                  <ModalPastIndicator className="md:ml-auto w-fit" />
                ) : currentDate < announcement.startDate ? (
                  <ModalUpcomingIndicator className="md:ml-auto w-fit" />
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 justify-center items-center gap-4 self-stretch rounded-md border border-other-stroke bg-other-offWhite">
            <AnnouncementBanner
              key={announcement.id}
              announcement={announcement}
            />
          </div>

          {dateInRange(
            announcement.startDate,
            announcement.endDate,
            currentDate
          ) ? (
            <ButtonPrimary3
              text="End Live Announcement"
              action={() => console.log("End Live Announcement button tapped")}
            />
          ) : (
            <ButtonPrimary2
              text="Delete Announcement"
              action={() => console.log("Delete button tapped")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
