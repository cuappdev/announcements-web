import { Announcement } from "@/models/announcement";
import { Constants } from "@/utils/constants";
import { filterPastAnnouncements, sortAnnouncementsByStartDate } from "@/utils/utils";
import { CalendarX2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AnnouncementCell from "../announcement/announcementCell";
import AnnouncementModal from "../announcement/announcementModal";
import ButtonSecondary1 from "../system/button/buttonSecondary1";

interface Props {
  announcements?: Announcement[];
  onEditClick: (announcement: Announcement) => void;
  onRefetch: () => void;
}

export default function LandingPastSection({ announcements, onEditClick, onRefetch }: Props) {
  const router = useRouter();

  const pastAnnouncements = sortAnnouncementsByStartDate(filterPastAnnouncements(announcements ?? [])).reverse();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const openModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
  };
  const closeModal = () => {
    setSelectedAnnouncement(null);
  };

  const viewAllAction = () => {
    router.push(Constants.pagePath.past);
  };

  return (
    <div className="flex flex-col p-6 items-start gap-6 rounded-lg bg-neutral-white">
      <div className="flex items-center gap-4 self-stretch">
        <CalendarX2 className="size-[32px] md:size-[40px] stroke-neutral-800" />
        <div className="flex flex-col">
          <h4 className="self-stretch text-neutral-800">Past Announcements</h4>
          <p className="b1 self-stretch text-neutral-600">Previous inactive announcements.</p>
        </div>
      </div>
      {pastAnnouncements.length > 0 ? (
        <>
          <div className="flex flex-col items-start self-stretch bg-neutral-white rounded-lg gap-3 md:hidden">
            <AnnouncementCell
              key={pastAnnouncements[0].id}
              announcement={pastAnnouncements[0]}
              onClick={() => openModal(pastAnnouncements[0])}
              onEditClick={() => onEditClick(pastAnnouncements[0])}
            />
            {pastAnnouncements.length > 1 && <ButtonSecondary1 text="View all announcements" action={viewAllAction} />}
          </div>

          <div className="flex flex-col items-start self-stretch bg-neutral-white rounded-lg gap-3 max-md:hidden">
            {pastAnnouncements.length > 3 ? (
              <>
                {pastAnnouncements.slice(0, 3).map((announcement) => (
                  <AnnouncementCell
                    key={announcement.id}
                    announcement={announcement}
                    onClick={() => openModal(announcement)}
                    onEditClick={() => onEditClick(announcement)}
                  />
                ))}
                <ButtonSecondary1 text="View all announcements" action={viewAllAction} />
              </>
            ) : (
              pastAnnouncements.map((announcement) => (
                <AnnouncementCell
                  key={announcement.id}
                  announcement={announcement}
                  onClick={() => openModal(announcement)}
                  onEditClick={() => onEditClick(announcement)}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <p className="b1 self-stretch text-neutral-400 text-center">{Constants.text.empty}</p>
      )}
      <AnnouncementModal
        onClose={(refetch) => {
          if (refetch) onRefetch();
          closeModal();
        }}
        announcement={selectedAnnouncement}
      />
    </div>
  );
}
