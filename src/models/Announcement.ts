import { AppName } from "./appName";
import { User } from "./user";

export interface Announcement {
  id: string;
  apps: AppName[];
  body: string;
  creator: User;
  endDate: string;
  imageUrl: string;
  link: string;
  startDate: string;
  title: string;
}
