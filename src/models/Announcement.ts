import { AppName } from "./appName";

export interface Announcement {
  id: string;
  apps: AppName[];
  body: string;
  endDate: string;
  imageUrl: string;
  link: string;
  startDate: string;
  title: string;
}
