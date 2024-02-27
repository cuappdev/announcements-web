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

/**
 * Edits an announcement doc in DB
 * @param id announcement id
 * @param apps list of apps
 * @param body announcement body
 * @param buttonColor button color
 * @param buttonText button text
 * @param buttonUrl button url
 * @param endDate end date
 * @param imageUrl PNG/JPG
 * @param startDate start date
 * @param title title
 * @returns promise with original announcement doc or error
 */
const editAnnouncement = async (
  id: mongoose.Types.ObjectId,
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
  AnnouncementModel.findOneAndUpdate(
    { _id: id },
    {
      apps: apps,
      body: body,
      buttonColor: buttonColor,
      buttonText: buttonText,
      buttonUrl: buttonUrl,
      endDate: endDate,
      imageUrl: imageUrl,
      startDate: startDate,
      title: title,
    },
    {
      new: true,
    }
  );

export default {
  getAnnouncements,
  insertAnnouncement,
  editAnnouncement,
};
