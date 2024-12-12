import CalendarArrowIcon from "@/icons/CalendarArrowIcon";
import { Announcement } from "@/models/announcement";
import { filterActiveAnnouncements, sortAnnouncementsByStartDate } from "@/utils/utils";
import AnnouncementModal from "../announcement/announcementModal";
import { useState } from "react";
import { Constants } from "@/utils/constants";
import AnnouncementCell from "../announcement/announcementCell";

interface Props {
  announcements?: Announcement[];
  onEditClick: (announcement: Announcement) => void;
}

export default function LandingActiveSection({ announcements, onEditClick }: Props) {
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
        <CalendarArrowIcon className="w-[32px] md:w-[40px] h-[32px] md:h-[40px] fill-neutral-800" />
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
      <AnnouncementModal onClose={closeModal} announcement={selectedAnnouncement} />
    </div>
  );
}
