import { AppName } from "@/models/AppName";
import {
  filterFutureAnnouncements,
  sortAnnouncementsByStartDate,
  calculateTimeRemaining,
  getEarliestAnnouncements,
} from "../src/utils/utils";
import { Announcement } from "@/models/Announcement";

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
    endDate: new Date("2024-08-20T00:00:00Z"),
    imageUrl: "image2.jpg",
    link: "link2",
    startDate: new Date("2024-08-10T00:00:00Z"),
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
    endDate: new Date("2023-011-12T00:00:00Z"),
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
      const startDate = new Date(Date.now() + 3 * 86400000); // 3 days from now
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
});
