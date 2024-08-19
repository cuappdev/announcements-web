import { Announcement } from "@/models/Announcement";

/**
 * Filters out announcements whose startDate is in the past.
 *
 * @param announcements - The announcements to filter.
 * @param date - Optional. The date to compare against each announcement's startDate. If not provided, the current date and time when the function is called will be used.
 * @returns An array of Announcement objects where each startDate is greater than the current date.
 */
export const filterFutureAnnouncements = (
  announcements: Announcement[],
  date: Date = new Date()
): Announcement[] => {
  return announcements.filter((announcement) => announcement.startDate > date);
};

/**
 * Filters active announcements, which are either current or upcoming, based on their endDate.
 *
 * @param announcements - The announcements to filter.
 * @param date - Optional. The date to compare against each announcement's startDate. If not provided, the current date and time when the function is called will be used.
 * @returns An array of Announcement objects where each endDate is greater than the current date.
 */
export const filterActiveAnnouncements = (
  announcements: Announcement[],
  date: Date = new Date()
): Announcement[] => {
  return announcements.filter((announcement) => announcement.endDate > date);
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

/**
 * Returns whether the given date is in the range of a given start and end date.
 *
 * @param targetDate - Optional. The date that is to be checked if it's in range of [startDate] and [endDate]. If not provided, the current date and time when the function is called will be used.
 * @param startDate - A date, must be before [endDate].
 * @param endDate - A date, must be after [startDate].
 * @returns A boolean stating if the current date is greater than or equal to startDate and less than or equal to endDate.
 */
export const dateInRange = (
  targetDate: Date = new Date(),
  startDate: Date,
  endDate: Date
) => {
  return targetDate >= startDate && targetDate <= endDate;
};

/**
 * Formats a Date object into a string in the M/D 00:00 AM/PM format.
 *
 * @param date - A date.
 * @returns A string representing [date] in the above format.
 */
export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${month}/${day} ${time}`;
};
