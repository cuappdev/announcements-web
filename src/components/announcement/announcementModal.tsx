import AppIcon from "@/icons/appIcon";
import { Announcement } from "@/models/announcement";
import { DateFormat } from "@/models/enums/dateFormat";
import ApiClient from "@/services/apiClient";
import { useUserStore } from "@/stores/useUserStore";
import { dateInRange, formatDate } from "@/utils/utils";
import { X } from "lucide-react";
import { useState } from "react";
import AlertPopup from "../system/alertPopup";
import ButtonPrimary2 from "../system/button/buttonPrimary2";
import ButtonSecondary2 from "../system/button/buttonSecondary2";
import errorToast from "../system/errorToast";
import AnnouncementBanner from "./announcementBanner";
import AnnouncementIndicator from "./announcementIndicator";

interface Props {
  onClose: (refetch: boolean) => void;
  announcement: Announcement | null;
}

export default function AnnouncementModal({ onClose, announcement }: Props) {
  const apiClient = ApiClient.createInstance();
  const { user } = useUserStore();

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showEndAlert, setShowEndAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!announcement) return null;

  // End Announcement
  const endAnnouncement = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      ApiClient.setAuthToken(apiClient, user.idToken);

      await ApiClient.put(apiClient, `/announcements/${announcement.id}`, { endDate: new Date() });

      // Successful
      setIsLoading(false);
      onClose(true);
    } catch (err) {
      console.error(err);
      errorToast();
      setIsLoading(false);
    }
  };

  // Delete Announcement
  const deleteAnnouncement = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      ApiClient.setAuthToken(apiClient, user.idToken);

      await ApiClient.delete(apiClient, `/announcements/${announcement.id}`);

      // Successful
      setIsLoading(false);
      onClose(true);
    } catch (err) {
      console.error(err);
      errorToast();
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Alerts */}
      <AlertPopup
        title="End Announcement"
        description={"Are you sure you want to end this live announcement?"}
        actionText="End"
        action={endAnnouncement}
        open={showEndAlert}
        onOpenChange={(val) => setShowEndAlert(val)}
      />
      <AlertPopup
        title="Delete Announcement"
        description={"Are you sure you want to delete this announcement? This cannot be undone."}
        actionText="Delete"
        action={deleteAnnouncement}
        open={showDeleteAlert}
        onOpenChange={(val) => setShowDeleteAlert(val)}
      />

      <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
        <div className="bg-neutral-white rounded-lg p-8 max-md:w-full m-4 md:m-8 lg:max-w-[1128px]">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center justify-between gap-1">
                  <h4 className="text-neutral-800 break-all">{announcement.title}</h4>
                  <button className="size-[24px] opacity-hover" onClick={() => onClose(false)}>
                    <X className="size-[24px] fill-neutral-400" />
                  </button>
                </div>
                <p className="b1 text-neutral-600">
                  {`${formatDate(new Date(announcement.startDate), DateFormat.SHORT)} - ${formatDate(
                    new Date(announcement.endDate),
                    DateFormat.SHORT
                  )}`}
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
              <ButtonPrimary2 text="End Live Announcement" action={() => setShowEndAlert(true)} isLoading={isLoading} />
            ) : (
              <ButtonSecondary2
                text="Delete Announcement"
                action={() => setShowDeleteAlert(true)}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
