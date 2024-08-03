import { AppName } from "./AppName";

export interface Announcement {
  id: string;
  apps: AppName[];
  body: string;
  endDate: Date;
  imageUrl: string;
  link: string;
  startDate: Date;
  title: string;
}
