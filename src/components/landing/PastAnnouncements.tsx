"use client";

import CalendarPlainIcon from "@/icons/CalendarPlainIcon";
import { Announcement } from "@/models/Announcement";
import { NO_ANNOUNCEMENTS_MESSAGE } from "@/utils/constants";
import {
  filterPastAnnouncements,
  sortAnnouncementsByStartDate,
} from "@/utils/utils";
import ActiveCell from "./AnnouncementCell";
import { useState, useEffect } from "react";
import ButtonSecondary1 from "../shared/ButtonSecondary1";

interface Props {
  announcements: Announcement[];
}

export default function PastAnnouncements({ announcements }: Props) {
  const pastAnnouncements = sortAnnouncementsByStartDate(
    filterPastAnnouncements(announcements)
  );

  const [annLimit, setAnnLimit] = useState(3);

  useEffect(() => {
    const updateLimit = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setAnnLimit(1);
      } else {
        setAnnLimit(3);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  return (
    <div className="flex flex-col p-6 items-start gap-6 rounded-lg bg-neutral-white">
      <div className="flex items-center gap-4 self-stretch">
        <CalendarPlainIcon className="w-[32px] md:w-[40px] h-[32px] md:h-[40px] stroke-neutral-800" />
        <div className="flex flex-col">
          <h4 className="self-stretch text-neutral-800">Past Announcements</h4>
          <p className="b1 self-stretch text-neutral-600">
            Previous inactive announcements.
          </p>
        </div>
      </div>
      {pastAnnouncements.length > 0 ? (
        <div className="flex flex-col items-start self-stretch bg-neutral-white rounded-lg gap-3">
          {pastAnnouncements.length > annLimit ? (
            <>
              {pastAnnouncements.slice(0, annLimit).map((announcement) => (
                <ActiveCell key={announcement.id} announcement={announcement} />
              ))}
              <ButtonSecondary1
                text="View all announcements"
                action={() => console.log("Button clicked")}
              />
            </>
          ) : (
            pastAnnouncements.map((announcement) => (
              <ActiveCell key={announcement.id} announcement={announcement} />
            ))
          )}
        </div>
      ) : (
        <p className="b1 self-stretch text-neutral-400 text-center">
          {NO_ANNOUNCEMENTS_MESSAGE}
        </p>
      )}
    </div>
  );
}
