import { Announcement } from "@/models/announcement";
import { AppName } from "@/models/enums/appName";
import { DateFormat } from "@/models/enums/dateFormat";

/**
 * Filters out announcements whose startDate is in the past.
 *
 * @param announcements - The announcements to filter.
 * @param date - Optional. The date to compare against each announcement's startDate. If not provided, the current date and time when the function is called will be used.
 * @returns An array of Announcement objects where each startDate is greater than the current date.
 */
export const filterFutureAnnouncements = (announcements: Announcement[], date: Date = new Date()): Announcement[] => {
  return announcements.filter((announcement) => new Date(announcement.startDate) > date);
};

/**
 * Filters active announcements, which are either current or upcoming, based on their endDate.
 *
 * @param announcements - The announcements to filter.
 * @param date - Optional. The date to compare against each announcement's startDate. If not provided, the current date and time when the function is called will be used.
 * @returns An array of Announcement objects where each endDate is greater than the current date.
 */
export const filterActiveAnnouncements = (announcements: Announcement[], date: Date = new Date()): Announcement[] => {
  return announcements.filter((announcement) => new Date(announcement.endDate) > date);
};

/**
 * Filters past announcements, which are announcements that have concluded, based on their endDate.
 *
 * @param announcements - The announcements to filter.
 * @param date - Optional. The date to compare against each announcement's startDate. If not provided, the current date and time when the function is called will be used.
 * @returns An array of Announcement objects where each endDate is less than the current date.
 */
export const filterPastAnnouncements = (announcements: Announcement[], date: Date = new Date()): Announcement[] => {
  return announcements.filter((announcement) => new Date(announcement.endDate) < date);
};

/**
 * Sorts an array of announcements by their startDate in ascending order.
 *
 * @param announcements - The announcements to filter.
 * @returns An array of Announcement objects sorted by startDate, with the earliest date first.
 */
export const sortAnnouncementsByStartDate = (announcements: Announcement[]): Announcement[] => {
  return announcements.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
};

/**
 * Returns the announcement(s) with the earliest start date.
 *
 * @param announcements - The announcements to filter.
 * @returns An array of Announcement object(s) from [announcements] which have the earliest start date.
 */
export const getEarliestAnnouncements = (announcements: Announcement[]): Announcement[] => {
  if (announcements.length === 0) {
    return [];
  }

  const sortedAnnouncements = sortAnnouncementsByStartDate(announcements);
  const earliestStartDate = new Date(sortedAnnouncements[0].startDate).getTime();
  const earliestAnnouncements = sortedAnnouncements.filter(
    (announcement) => new Date(announcement.startDate).getTime() === earliestStartDate
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
 * @param startDate - A date, must be before [endDate].
 * @param endDate - A date, must be after [startDate].
 * @param targetDate - Optional. The date that is to be checked if it's in range of [startDate] and [endDate]. If not provided, the current date and time when the function is called will be used.
 * @returns A boolean stating if the current date is greater than or equal to startDate and less than or equal to endDate.
 */
export const dateInRange = (startDate: Date, endDate: Date, targetDate: Date = new Date()) => {
  return targetDate >= startDate && targetDate <= endDate;
};

/**
 * Formats a date object according to the specified DateFormat.
 *
 * @param date - The date object to format.
 * @param format - The desired date format (from DateFormat enum).
 * @returns The formatted date string.
 *
 * @example
 * const date = new Date('2024-09-17T05:25:00');
 * const formattedDate1 = formatDate(date, DateFormat.SHORT); // "9/17 5:25 AM"
 * const formattedDate2 = formatDate(date, DateFormat.SHORT_YEAR); // "9/17/24 5:25 AM"
 */
export const formatDate = (date: Date, format: DateFormat): string => {
  let options: Intl.DateTimeFormatOptions;

  switch (format) {
    case DateFormat.SHORT:
      options = {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      break;
    case DateFormat.SHORT_YEAR:
      options = {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      break;
    default:
      throw new Error(`Invalid DateFormat: ${format}`);
  }

  return new Intl.DateTimeFormat("en-US", options).format(date).replace(",", "");
};

/**
 * Generates a string describing the number of apps provided.
 *
 * @param apps An array of AppName enum values.
 * @returns A string representing the number of apps: "All Apps", "1 App", or "2 Apps".
 */
export const getAppCountString = (apps: AppName[]): string => {
  const appCount = apps.length;
  switch (appCount) {
    case Object.keys(AppName).length:
      return "All Apps";
    case 1:
      return "1 App";
    default:
      return `${appCount} Apps`;
  }
};
