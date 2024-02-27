import mongoose from "mongoose";

import { AnnouncementModel, Announcement } from "./models";

/**
 * Finds all announcment docs in DB
 * @returns promise with all announcment docs or error
 */
const getAnnouncements = async () => AnnouncementModel.find({});

const insertAnnouncement = async (
  apps: string[],
  body: string,
  buttonColor: string,
  buttonText: string,
  buttonUrl: string,
  endDate: Date,
  imageUrl: string,
  startDate: Date,
  title: string
) =>
  AnnouncementModel.create(
    new Announcement(
      apps,
      body,
      buttonColor,
      buttonText,
      buttonUrl,
      endDate,
      imageUrl,
      startDate,
      title
    )
  );
export default {
  getAnnouncements,
  insertAnnouncement,
};
