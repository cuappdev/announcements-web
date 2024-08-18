import { Announcement } from "@/models/Announcement";

/**
 * Filters out announcements whose startDate is in the past.
 *
 * @param announcements - The announcements to filter.
 * @returns An array of Announcement objects where each startDate is greater than the current date.
 */
export const filterFutureAnnouncements = (
  announcements: Announcement[],
  date: Date = new Date()
): Announcement[] => {
  return announcements.filter((announcement) => announcement.startDate > date);
};

/**
 * Sorts an array of announcements by their startDate in ascending order.
 *
 * @param announcements - The announcements to filter.
 * @returns An array of Announcement objects sorted by startDate, with the earliest date first.
 */
export const sortAnnouncementsByStartDate = (
  announcements: Announcement[]
): Announcement[] => {
  return announcements.sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );
};

/**
 * Returns the announcement(s) with the earliest start date.
 *
 * @param announcements - The announcements to filter.
 * @returns An array of Announcement object(s) from [announcements] which have the earliest start date.
 */
export const getEarliestAnnouncements = (
  announcements: Announcement[]
): Announcement[] => {
  if (announcements.length === 0) {
    return [];
  }

  const sortedAnnouncements = sortAnnouncementsByStartDate(announcements);
  const earliestStartDate = sortedAnnouncements[0].startDate.getTime();
  const earliestAnnouncements = sortedAnnouncements.filter(
    (announcement) => announcement.startDate.getTime() === earliestStartDate
  );

  return earliestAnnouncements;
};

/**
 * Calculates the time remaining from the current date and time to a future startDate.
 *
 * @param startDate - A Date object representing the startDate.
 * @returns An object with the remaining time in days, hours, minutes, and seconds.
 */
export const calculateTimeRemaining = (startDate: Date) => {
  const now = new Date();
  const timeDiff = startDate.getTime() - now.getTime();
  if (timeDiff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: Math.min(days, 99),
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};
