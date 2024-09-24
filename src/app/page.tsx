import ActiveAnnouncements from "@/components/landing/ActiveAnnouncements";
import CreateAnnouncementEntry from "@/components/landing/CreateAnnouncementEntry";
import Footer from "@/components/landing/Footer";
import LandingHeader from "@/components/landing/LandingHeader";
import PastAnnouncements from "@/components/landing/PastAnnouncements";
import UpcomingAnnouncements from "@/components/landing/UpcomingAnnouncements";
import { Announcement } from "@/models/Announcement";
import { AppName } from "@/models/AppName";

// TODO: Remove hardcoded announcements once API is connected

const ann0: Announcement = {
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

const ann1: Announcement = {
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

const ann2: Announcement = {
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

const ann3: Announcement = {
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

const ann4: Announcement = {
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

const ann5: Announcement = {
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
    <div className="flex flex-col justify-center items-center bg-other-background w-full">
      <div>
        <div className="flex flex-col items-center gap-8 self-stretch py-16 px-4 md:py-20 md:px-8 lg:w-[1128px] lg:px-0 lg:py-[132px] lg:h-[2048px]">
          <LandingHeader name="Vin"></LandingHeader>
          <div className="lg:hidden flex flex-col items-start gap-8 self-stretch">
            <CreateAnnouncementEntry></CreateAnnouncementEntry>
            <UpcomingAnnouncements announcements={[]}></UpcomingAnnouncements>
            <ActiveAnnouncements announcements={[]}></ActiveAnnouncements>
            <PastAnnouncements announcements={[]}></PastAnnouncements>
          </div>
          <div className="max-lg:hidden flex flex-row gap-8 w-full">
            <div className="flex flex-col gap-8 w-[499px]">
              <CreateAnnouncementEntry></CreateAnnouncementEntry>
              <UpcomingAnnouncements
                announcements={[]}
              ></UpcomingAnnouncements>
            </div>
            <div className="flex flex-col gap-8 w-[597px]">
              <ActiveAnnouncements announcements={[]}></ActiveAnnouncements>
              <PastAnnouncements announcements={[]}></PastAnnouncements>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
