import ActiveAnnouncements from "@/components/landing/ActiveAnnouncements";
import ActiveCell from "@/components/landing/ActiveCell";
import { Announcement } from "@/models/Announcement";
import { AppName } from "@/models/AppName";

// TODO: Remove hardcoded announcements once API is connected

const pastAnn: Announcement = {
  id: "65f3c6c85ec12921d8bbd0e3",
  apps: [AppName.EATERY, AppName.RESELL],
  body: "Pizza will be provided. Come and see us! We would love to speak with you!",
  endDate: new Date("2024-03-16T03:00:00Z"),
  imageUrl:
    "https://t3.ftcdn.net/jpg/06/32/71/42/360_F_632714266_rdRiINnIMZC1SSroLc8e5Tb0sm3jN8i8.jpg",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2024-03-15T03:00:00Z"),
  title: "Demo Day",
};

const liveAnn: Announcement = {
  id: "65f3c6c85ec12921d8bbd0e3",
  apps: [AppName.UPLIFT],
  body: "Short body.",
  endDate: new Date("2024-08-25T19:15:00Z"),
  imageUrl:
    "https://runningscaredsite.wordpress.com/wp-content/uploads/2016/01/running-scared-chicken.jpeg?w=640",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2024-07-10T23:42:20Z"),
  title: "Title",
};

const liveAnn2: Announcement = {
  id: "65f3c6c85ec12921d8bbd0e3",
  apps: [
    AppName.TRANSIT,
    AppName.EATERY,
    AppName.SCOOPED,
    AppName.COURSEGRAB,
    AppName.RESELL,
    AppName.UPLIFT,
    AppName.VOLUME,
  ],
  body: "Come ASAP.",
  endDate: new Date("2024-08-28T19:15:00Z"),
  imageUrl:
    "https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2024-08-01T23:42:20Z"),
  title: "Happening now.",
};

const futureAnn: Announcement = {
  id: "65f3c6c85ec12921d8bbd0e3",
  apps: [AppName.EATERY, AppName.RESELL, AppName.UPLIFT, AppName.TRANSIT],
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  endDate: new Date("2025-09-16T03:00:00Z"),
  imageUrl:
    "https://i.natgeofe.com/k/0ed36c42-672a-425b-9e62-7cc946b98051/pig-fence_square.jpg",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2025-09-14T23:42:20Z"),
  title: "Very, Very, Very Big Announcement.",
};

const futureAnn2: Announcement = {
  id: "65f3c6c85ec12921d8bbd0e3",
  apps: [AppName.RESELL],
  body: "Starting at the same time as ...",
  endDate: new Date("2025-08-09T18:57:00Z"),
  imageUrl:
    "https://kidszoo.org/wp-content/uploads/2017/06/IMG_2034-2-scaled.jpg",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2025-08-08T19:24:20Z"),
  title: "Announcement",
};

export default function Landing() {
  return (
    <div className="w-[361px] md:w-[770px] lg:w-[597px]">
      {/* empty state (there are no announcements) */}
      <ActiveAnnouncements announcements={[]} />
      {/* empty state (there are only past announcements) */}
      <ActiveAnnouncements announcements={[pastAnn]} />
      {/* multiple announcements, including ones that are currently live and ones that are in the future */}
      <ActiveAnnouncements
        announcements={[pastAnn, liveAnn, liveAnn2, futureAnn, futureAnn2]}
      />
    </div>
  );
}
