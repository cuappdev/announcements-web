import CalendarPlainIcon from "@/icons/CalendarPlainIcon";
import { Announcement } from "@/models/announcement";
import { filterPastAnnouncements, sortAnnouncementsByStartDate } from "@/utils/utils";
import ActiveCell from "./AnnouncementCell";
import AnnouncementModal from "./AnnouncementModal";
import { useState } from "react";
import ButtonSecondary1 from "../shared/ButtonSecondary1";
import { Constants } from "@/utils/constants";

interface Props {
  announcements?: Announcement[];
}

export default function PastAnnouncements({ announcements }: Props) {
  const pastAnnouncements = sortAnnouncementsByStartDate(filterPastAnnouncements(announcements ?? []));

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
        <CalendarPlainIcon className="w-[32px] md:w-[40px] h-[32px] md:h-[40px] stroke-neutral-800" />
        <div className="flex flex-col">
          <h4 className="self-stretch text-neutral-800">Past Announcements</h4>
          <p className="b1 self-stretch text-neutral-600">Previous inactive announcements.</p>
        </div>
      </div>
      {pastAnnouncements.length > 0 ? (
        <>
          <div className="flex flex-col items-start self-stretch bg-neutral-white rounded-lg gap-3 md:hidden">
            <ActiveCell
              key={pastAnnouncements[0].id}
              announcement={pastAnnouncements[0]}
              onClick={() => openModal(pastAnnouncements[0])}
            />
            {pastAnnouncements.length > 1 && (
              <ButtonSecondary1 text="View all announcements" action={() => console.log("Button clicked")} />
            )}
          </div>

          <div className="flex flex-col items-start self-stretch bg-neutral-white rounded-lg gap-3 max-md:hidden">
            {pastAnnouncements.length > 3 ? (
              <>
                {pastAnnouncements.slice(0, 3).map((announcement) => (
                  <ActiveCell
                    key={announcement.id}
                    announcement={announcement}
                    onClick={() => openModal(announcement)}
                  />
                ))}
                <ButtonSecondary1 text="View all announcements" action={() => console.log("Button clicked")} />
              </>
            ) : (
              pastAnnouncements.map((announcement) => (
                <ActiveCell key={announcement.id} announcement={announcement} onClick={() => openModal(announcement)} />
              ))
            )}
          </div>
        </>
      ) : (
        <p className="b1 self-stretch text-neutral-400 text-center">{Constants.text.empty}</p>
      )}
      <AnnouncementModal onClose={closeModal} announcement={selectedAnnouncement} />
    </div>
  );
}
