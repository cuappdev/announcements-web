import { Announcement } from "@/models/announcement";
import { Constants } from "@/utils/constants";
import { filterActiveAnnouncements, sortAnnouncementsByStartDate } from "@/utils/utils";
import { CalendarCheck2 } from "lucide-react";
import { useState } from "react";
import AnnouncementCell from "../announcement/announcementCell";
import AnnouncementModal from "../announcement/announcementModal";

interface Props {
  announcements?: Announcement[];
  onEditClick: (announcement: Announcement) => void;
  onRefetch: () => void;
}

export default function LandingActiveSection({ announcements, onEditClick, onRefetch }: Props) {
  const activeAnnouncements = sortAnnouncementsByStartDate(filterActiveAnnouncements(announcements ?? []));
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const openModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
  };
  const closeModal = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <div className="flex flex-col p-6 items-start gap-6 rounded-lg bg-neutral-white">
      <div className="flex items-center gap-4 self-stretch">
        <CalendarCheck2 className="size-[32px] md:size-[40px] stroke-neutral-800" />
        <div className="flex flex-col">
          <h4 className="self-stretch text-neutral-800">Active Announcements</h4>
          <p className="b1 self-stretch text-neutral-600">Current and upcoming announcements.</p>
        </div>
      </div>
      {activeAnnouncements.length > 0 ? (
        <div className="flex flex-col items-start self-stretch bg-neutral-white rounded-lg gap-3">
          {activeAnnouncements.map((announcement) => (
            <AnnouncementCell
              key={announcement.id}
              announcement={announcement}
              onClick={() => openModal(announcement)}
              onEditClick={() => onEditClick(announcement)}
            />
          ))}
        </div>
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
