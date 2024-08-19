"use client";

import CalendarArrowIcon from "@/icons/CalendarArrowIcon";
import { Announcement } from "@/models/Announcement";
import { NO_ANNOUNCEMENTS_MESSAGE } from "@/utils/constants";
import {
  calculateTimeRemaining,
  filterOutPastAnnouncements,
  sortAnnouncementsByStartDate,
} from "@/utils/utils";
import ActiveCell from "./ActiveCell";
import { useState, useEffect } from "react";

interface Props {
  announcements: Announcement[];
}

export default function ActiveAnnouncements({ announcements }: Props) {
  const activeAnnouncements = sortAnnouncementsByStartDate(
    filterOutPastAnnouncements(announcements)
  );

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (activeAnnouncements.length === 0) return;

    const firstAnnouncement = activeAnnouncements[0];
    const startDate = new Date(firstAnnouncement.startDate);

    const updateCountdown = () => {
      setTimeRemaining(calculateTimeRemaining(startDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [announcements]);

  return (
    <div className="flex flex-col p-6 items-start gap-6 rounded-lg bg-neutral-white">
      <div className="flex items-center gap-4 self-stretch">
        <CalendarArrowIcon className="w-[32px] md:w-[40px] h-[32px] md:h-[40px] fill-neutral-800"></CalendarArrowIcon>
        <div className="flex flex-col">
          <h4 className="self-stretch text-neutral-800">
            Active Announcements
          </h4>
          <p className="b1 self-stretch text-neutral-600">
            Current and upcoming announcements.
          </p>
        </div>
      </div>
      {activeAnnouncements.length > 0 ? (
        <div className="flex flex-col items-start self-stretch bg-neutral-white rounded-lg gap-3">
          {activeAnnouncements.map((announcement) => (
            <ActiveCell key={announcement.id} announcement={announcement} />
          ))}
        </div>
      ) : (
        <p className="b1 self-stretch text-neutral-400 text-center">
          {NO_ANNOUNCEMENTS_MESSAGE}
        </p>
      )}
    </div>
  );
}
