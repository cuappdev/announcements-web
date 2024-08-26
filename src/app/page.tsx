import PastAnnouncements from "@/components/landing/PastAnnouncements";
import { Announcement } from "@/models/Announcement";
import { AppName } from "@/models/AppName";

// TODO: Remove hardcoded announcements once API is connected

const pastAnn: Announcement = {
  id: "0",
  apps: [AppName.EATERY, AppName.RESELL],
  body: "Pizza will be provided. Come and see us! We would love to speak with you!",
  endDate: new Date("2024-03-16T03:00:00Z"),
  imageUrl:
    "https://t3.ftcdn.net/jpg/06/32/71/42/360_F_632714266_rdRiINnIMZC1SSroLc8e5Tb0sm3jN8i8.jpg",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2024-03-15T03:00:00Z"),
  title: "Demo Day",
};

const pastAnn2: Announcement = {
  id: "1",
  apps: [AppName.UPLIFT],
  body: "Short body.",
  endDate: new Date("2023-08-25T19:15:00Z"),
  imageUrl:
    "https://runningscaredsite.wordpress.com/wp-content/uploads/2016/01/running-scared-chicken.jpeg?w=640",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2023-07-10T23:42:20Z"),
  title: "Title",
};

const pastAnn3: Announcement = {
  id: "2",
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
  endDate: new Date("2023-08-28T19:15:00Z"),
  imageUrl:
    "https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2023-08-01T23:42:20Z"),
  title: "Happening now.",
};

const pastAnn4: Announcement = {
  id: "3",
  apps: [AppName.EATERY, AppName.RESELL, AppName.UPLIFT, AppName.TRANSIT],
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  endDate: new Date("2023-09-16T03:00:00Z"),
  imageUrl:
    "https://i.natgeofe.com/k/0ed36c42-672a-425b-9e62-7cc946b98051/pig-fence_square.jpg",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2023-09-14T23:42:20Z"),
  title: "Very, Very, Very Big Announcement.",
};

const currentAnn: Announcement = {
  id: "4",
  apps: [AppName.RESELL],
  body: "Starting at the same time as ...",
  endDate: new Date("2025-08-09T18:57:00Z"),
  imageUrl:
    "https://kidszoo.org/wp-content/uploads/2017/06/IMG_2034-2-scaled.jpg",
  link: "https://www.instagram.com/p/C4ft4SyOaUj/",
  startDate: new Date("2024-08-08T19:24:20Z"),
  title: "Announcement",
};

const futureAnn: Announcement = {
  id: "4",
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
      <PastAnnouncements announcements={[]} />
      {/* empty state (there are no past announcements) */}
      <PastAnnouncements announcements={[currentAnn, futureAnn]} />
      {/* filled state (exactly 1 past announcement -- will show all for tablet/desktop/mobile, view all button does not render) */}
      <PastAnnouncements announcements={[pastAnn, currentAnn]} />
      {/* filled state (there are more than 1 past announcement but less than 3 -- will show all for tablet/desktop and cap at 1 for mobile) */}
      <PastAnnouncements
        announcements={[pastAnn3, pastAnn4, currentAnn, futureAnn]}
      />
      {/* filled state (exactly 3 past announcements -- will show all for tablet/desktop and cap at 1 for mobile) */}
      <PastAnnouncements
        announcements={[pastAnn, pastAnn3, pastAnn4, currentAnn, futureAnn]}
      />
      {/* filled state (there are more than 3 past announcements -- will cap at 3 for tablet/desktop and 1 for mobile) */}
      <PastAnnouncements
        announcements={[
          pastAnn,
          pastAnn2,
          pastAnn3,
          pastAnn4,
          currentAnn,
          futureAnn,
        ]}
      />
    </div>
  );
}
