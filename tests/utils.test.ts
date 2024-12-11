import { Announcement } from "@/models/announcement";
import { AppName } from "@/models/appName";
import {
  calculateTimeRemaining,
  dateInRange,
  filterActiveAnnouncements,
  filterFutureAnnouncements,
  filterPastAnnouncements,
  formatDate,
  getEarliestAnnouncements,
  sortAnnouncementsByStartDate,
} from "../src/utils/utils";

const announcements: Announcement[] = [
  {
    id: "1",
    apps: [AppName.EATERY],
    body: "Announcement 1",
    endDate: new Date("2024-04-01T00:00:00Z"),
    imageUrl: "image1.jpg",
    link: "link1",
    startDate: new Date("2024-03-15T00:00:00Z"),
    title: "Announcement 1",
  },
  {
    id: "2",
    apps: [AppName.RESELL, AppName.COURSEGRAB],
    body: "Announcement 2",
    endDate: new Date("2024-08-30T00:00:00Z"),
    imageUrl: "image2.jpg",
    link: "link2",
    startDate: new Date("2024-08-20T00:00:00Z"),
    title: "Announcement 2",
  },
  {
    id: "3",
    apps: [AppName.UPLIFT],
    body: "Announcement 3",
    endDate: new Date("2025-03-30T00:00:00Z"),
    imageUrl: "image3.jpg",
    link: "link3",
    startDate: new Date("2025-03-25T00:00:00Z"),
    title: "Announcement 3",
  },
];

const duplicateStartAnnouncements: Announcement[] = [
  {
    id: "4",
    apps: [AppName.EATERY],
    body: "Announcement 4",
    endDate: new Date("2024-05-01T00:00:00Z"),
    imageUrl: "image4.jpg",
    link: "link4",
    startDate: new Date("2024-03-15T00:00:00Z"),
    title: "Announcement 4",
  },
  ...announcements,
];

const noFutureAnnouncements: Announcement[] = [
  {
    id: "0",
    apps: [AppName.EATERY],
    body: "Announcement 1",
    endDate: new Date("2024-05-01T00:00:00Z"),
    imageUrl: "image4.jpg",
    link: "link4",
    startDate: new Date("2024-03-15T00:00:00Z"),
    title: "Announcement 4",
  },
  {
    id: "1",
    apps: [AppName.EATERY],
    body: "Announcement 2",
    endDate: new Date("2023-11-12T00:00:00Z"),
    imageUrl: "image4.jpg",
    link: "link4",
    startDate: new Date("2023-05-30T00:00:00Z"),
    title: "Announcement 4",
  },
];

describe("Utils", () => {
  describe("filterFutureAnnouncements", () => {
    it("should filter announcements to only include those with a start date in the future", () => {
      const result = filterFutureAnnouncements(
        announcements,
        new Date(2024, 7, 1)
      );
      expect(result.length).toBe(2);
      expect(result[0].id).toBe("2");
      expect(result[1].id).toBe("3");
    });
    it("should filter out past announcements (no future announcements)", () => {
      const result = filterFutureAnnouncements(
        noFutureAnnouncements,
        new Date(2024, 7, 1)
      );
      expect(result.length).toBe(0);
    });
  });

  describe("sortAnnouncementsByStartDate", () => {
    it("should sort announcements by their start date in ascending order", () => {
      const result = sortAnnouncementsByStartDate(announcements);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
      expect(result[2].id).toBe("3");
    });
  });

  describe("calculateTimeRemaining", () => {
    it("should calculate the days remaining until the given start date", () => {
      const startDate = new Date(Date.now() + 3 * 86400001); // 3 days from now
      const result = calculateTimeRemaining(startDate);
      expect(result.days).toBe(3);
    });

    it("should calculate the hours remaining until the given start date", () => {
      const startDate = new Date(Date.now() + 5 * 3600000); // 5 hours from now
      const result = calculateTimeRemaining(startDate);
      expect(result.hours).toBe(5);
    });

    it("should calculate the minutes remaining until the given start date", () => {
      const startDate = new Date(Date.now() + 45 * 60000); // 45 minutes from now
      const result = calculateTimeRemaining(startDate);
      expect(result.minutes).toBe(45);
    });

    it("should calculate the seconds remaining until the given start date", () => {
      const startDate = new Date(Date.now() + 30 * 1000); // 30 seconds from now
      const result = calculateTimeRemaining(startDate);
      expect(result.seconds).toBe(30);
    });

    it("should calculate days, hours, minutes, and seconds remaining accurately", () => {
      const startDate = new Date(
        Date.now() + 1 * 86400000 + 5 * 3600000 + 45 * 60000 + 30 * 1000
      ); // 1 day, 5 hours, 45 minutes, 30 seconds from now
      const result = calculateTimeRemaining(startDate);
      expect(result.days).toBe(1);
      expect(result.hours).toBe(5);
      expect(result.minutes).toBe(45);
      expect(result.seconds).toBe(30);
    });

    it("should return 0 for all units if the start date is in the past", () => {
      const startDate = new Date(Date.now() - 86400000); // 1 day ago
      const result = calculateTimeRemaining(startDate);
      expect(result.days).toBe(0);
      expect(result.hours).toBe(0);
      expect(result.minutes).toBe(0);
      expect(result.seconds).toBe(0);
    });

    it("should cap the days at 99", () => {
      const startDate = new Date(Date.now() + 100 * 86400000); // 100 days from now
      const result = calculateTimeRemaining(startDate);
      expect(result.days).toBe(99);
    });
  });

  describe("getEarliestAnnouncements", () => {
    it("should return an array with the announcement with the earliest start date", () => {
      const result = getEarliestAnnouncements(announcements);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("1");
    });

    it("should return an array with multiple announcements if they have the same earliest start date", () => {
      const result = getEarliestAnnouncements(duplicateStartAnnouncements);
      expect(result.length).toBe(2);
      expect(result[0].id).toBe("4");
      expect(result[1].id).toBe("1");
    });

    it("should return an empty array if there are no announcements", () => {
      const result = getEarliestAnnouncements([]);
      expect(result.length).toBe(0);
    });
  });

  describe("filterActiveAnnouncements", () => {
    it("should filter announcements to only include those with an end date in the future", () => {
      const result = filterActiveAnnouncements(
        announcements,
        new Date(2024, 11, 1)
      );
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("3");
    });
    it("should filter announcements to only include those with an end date in the future (all announcements have concluded)", () => {
      const result = filterActiveAnnouncements(
        duplicateStartAnnouncements,
        new Date(2026, 11, 1)
      );
      expect(result.length).toBe(0);
    });
    it("should filter announcements to only include those with an end date in the future (includes active announcement)", () => {
      const result = filterActiveAnnouncements(
        announcements,
        new Date(2024, 7, 25)
      );
      expect(result.length).toBe(2);
      expect(result[0].id).toBe("2");
      expect(result[1].id).toBe("3");
    });
  });

  describe("dateInRange", () => {
    it("should return true as first date is in the range set by the second two dates", () => {
      const result = dateInRange(
        new Date("2024-07-01T14:30:00"),
        new Date("2024-07-30T14:30:00"),
        new Date("2024-07-15T14:30:00")
      );
      expect(result).toBe(true);
    });
    it("the first date is before the range of the second two dates (not in range)", () => {
      const result = dateInRange(
        new Date("2024-07-01T14:30:00"),
        new Date("2024-07-30T14:30:00"),
        new Date("2024-07-01T12:30:00")
      );
      expect(result).toBe(false);
    });
    it("the first date is after the range of the second two dates (not in range)", () => {
      const result = dateInRange(
        new Date("2024-07-01T14:30:00"),
        new Date("2024-07-30T14:30:00"),
        new Date("2024-07-30T16:30:00")
      );
      expect(result).toBe(false);
    });
    it("the given date is exactly the same date as the earlier bound of the range (in range)", () => {
      const result = dateInRange(
        new Date("2024-07-01T14:30:00"),
        new Date("2024-07-30T14:30:00"),
        new Date("2024-07-01T14:30:00")
      );
      expect(result).toBe(true);
    });
    it("the given date is exactly the same date as the later bound of the range (in range)", () => {
      const result = dateInRange(
        new Date("2024-07-01T14:30:00"),
        new Date("2024-07-30T14:30:00"),
        new Date("2024-07-30T14:30:00")
      );
      expect(result).toBe(true);
    });
  });

  describe("formatDate", () => {
    it("should format the date correctly for a date in the middle of the year", () => {
      const date = new Date("2024-07-15T14:30:00");
      const result = formatDate(date);
      expect(result).toBe("7/15 2:30 PM");
    });

    it("should format the date correctly for a date at the beginning of the year", () => {
      const date = new Date("2024-01-01T00:00:00");
      const result = formatDate(date);
      expect(result).toBe("1/1 12:00 AM");
    });

    it("should format the date correctly for a date at the end of the year", () => {
      const date = new Date("2024-12-31T23:59:59");
      const result = formatDate(date);
      expect(result).toBe("12/31 11:59 PM");
    });

    it("should format the date correctly for a single-digit month and day", () => {
      const date = new Date("2024-03-05T07:05:00");
      const result = formatDate(date);
      expect(result).toBe("3/5 7:05 AM");
    });

    it("should format the date correctly for noon", () => {
      const date = new Date("2024-06-15T12:00:00");
      const result = formatDate(date);
      expect(result).toBe("6/15 12:00 PM");
    });

    it("should format the date correctly for midnight", () => {
      const date = new Date("2024-09-22T00:00:00");
      const result = formatDate(date);
      expect(result).toBe("9/22 12:00 AM");
    });
  });

  describe("filterPastAnnouncements", () => {
    it("should filter announcements to only include those with an end date in the past", () => {
      const result = filterPastAnnouncements(
        announcements,
        new Date(2024, 11, 1)
      );
      expect(result.length).toBe(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });

    it("all announcements are in the future (returns empty array)", () => {
      const result = filterPastAnnouncements(
        duplicateStartAnnouncements,
        new Date(2011, 11, 1)
      );
      expect(result.length).toBe(0);
    });

    it("all announcements are in the past (returns the same array as input)", () => {
      const result = filterPastAnnouncements(
        noFutureAnnouncements,
        new Date(2025, 11, 1)
      );
      expect(result.length).toBe(noFutureAnnouncements.length);
      expect(result).toEqual(noFutureAnnouncements);
    });

    it("no announcements are given (returns empty array)", () => {
      const result = filterPastAnnouncements([], new Date(2025, 11, 1));
      expect(result.length).toBe(0);
    });

    it("one input announcement has the exact same end date as the date it's being compared to (should not be in the output)", () => {
      const result = filterPastAnnouncements(
        announcements,
        new Date("2025-03-30T00:00:00Z")
      );
      expect(result.length).toBe(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });
  });
});
