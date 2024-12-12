import { Announcement } from "@/models/announcement";
import { Constants } from "@/utils/constants";
import { calculateTimeRemaining, filterFutureAnnouncements, getEarliestAnnouncements } from "@/utils/utils";
import { Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AnnouncementBanner from "../announcement/announcementBanner";

interface Props {
  announcements?: Announcement[];
}

export default function LandingUpcomingSection({ announcements }: Props) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const futureAnnouncements = useMemo(() => {
    if (!announcements) return [];

    return getEarliestAnnouncements(filterFutureAnnouncements(announcements ?? []));
  }, [announcements]);

  useEffect(() => {
    if (futureAnnouncements.length === 0) return;

    const updateCountdown = () => {
      setTimeRemaining(calculateTimeRemaining(new Date(futureAnnouncements[0].startDate)));
    };
    updateCountdown();

    const interval = setInterval(updateCountdown, 1000); // Sets up a timer to call updateCountdown every 1000 milliseconds (1 second)
    return () => clearInterval(interval);
  }, [futureAnnouncements]);

  return (
    <div className="flex flex-col p-6 items-start gap-6 rounded-lg bg-neutral-white">
      <div className="flex items-center gap-4 self-stretch">
        <Timer className="size-[32px] md:size-[40px] stroke-neutral-800" />
        <div className="flex flex-col gap-1">
          <h4 className="text-neutral-800">Up Next</h4>
          <p className="b1 text-neutral-600">Countdown to the next announcement.</p>
        </div>
      </div>

      {futureAnnouncements.length > 0 ? (
        <>
          <div className="flex justify-center items-start gap-4 md:gap-6 self-stretch">
            <div className="flex flex-col w-[64px] items-center gap-1">
              <h3 className="text-neutral-black text-center">{timeRemaining.days}</h3>
              <p className="b2 text-neutral-black text-center">Days</p>
            </div>
            <div className="flex flex-col w-[64px] items-center gap-1">
              <h3 className="text-neutral-black text-center">{timeRemaining.hours}</h3>
              <p className="b2 text-neutral-black text-center">Hours</p>
            </div>
            <div className="flex flex-col w-[64px] items-center gap-1">
              <h3 className="text-neutral-black text-center">{timeRemaining.minutes}</h3>
              <p className="b2 text-neutral-black text-center">Minutes</p>
            </div>
            <div className="flex flex-col w-[64px] items-center gap-1">
              <h3 className="text-neutral-black text-center">{timeRemaining.seconds}</h3>
              <p className="b2 text-neutral-black text-center">Seconds</p>
            </div>
          </div>
          <div className="flex flex-col p-4 justify-center items-center gap-4 self-stretch rounded-md border border-other-stroke bg-other-offWhite">
            {futureAnnouncements.map((announcement) => (
              <AnnouncementBanner key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </>
      ) : (
        <div className="b1 text-neutral-400 text-center self-stretch">{Constants.text.empty}</div>
      )}
    </div>
  );
}
