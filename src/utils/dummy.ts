import { Announcement } from "@/models/announcement";
import { AppName } from "@/models/enums/appName";
import { User } from "@/models/user";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates a dummy announcement object for testing or development purposes.
 *
 * @param startDate The start date of the announcement. Defaults to August 15th, 2024.
 * @param endDate The end date of the announcement. Defaults to October 16th, 2024.
 * @param apps An array of app names relevant to the announcement. Defaults to all app names.
 * @returns A dummy announcement object.
 */
export function createDummyAnnouncement(
  startDate: string = "2024-08-15T03:00:00.000Z",
  endDate: string = "2024-10-16T03:00:00.000Z",
  apps: AppName[] = [
    AppName.EATERY,
    AppName.TRANSIT,
    AppName.UPLIFT,
    AppName.COURSEGRAB,
    AppName.VOLUME,
    AppName.RESELL,
  ]
): Announcement {
  const creator: User = {
    id: "675c9f36dea6d3c5ee0e3053",
    email: "vdb23@cornell.edu",
    idToken: "idToken",
    imageUrl: "https://lh3.googleusercontent.com/a/ACg8ocLSV3bTsn-XINmiSkt4FbdlzRDV0EJBc_LX-hv7gdo3LGp8cAB_=s96-c",
    isAdmin: true,
    name: "Vin Bui",
  };

  return {
    id: uuidv4(),
    apps,
    body: "Get a taste of the course content, ask questions, and see if DPD is the right fit for you!",
    creator,
    endDate,
    imageUrl: "https://appdev-upload.nyc3.cdn.digitaloceanspaces.com/announcements/n07chyp8.jpg",
    link: "https://www.instagram.com/p/C4ExCD1rB6U",
    startDate,
    title: "DPD Lecture 0",
  };
}
