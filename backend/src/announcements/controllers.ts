import mongoose from "mongoose";

import { AnnouncementModel, Announcement } from "./models";

/**
 * Finds all announcment docs in DB
 * @returns promise with all announcment docs or error
 */
const getAnnouncements = async () => AnnouncementModel.find({});

/**
 * Create an announcement doc in DB.
 * @param apps The slugs of apps that this announcement will be presented in.
 * @param body The body text of the announcement.
 * @param buttonColor The color of the call to action button in Hex (e.g. #FFFFFF).
 * @param buttonText The text label for the call to action button.
 * @param buttonUrl The redirect URL for the call to action button.
 * @param endDate The date in which the announcement will be removed.
 * @param imageUrl The URL of the image to display.
 * @param startDate The date in which the announcement will be released.
 * @param title The heading text of the announcement.
 * @returns Promise with new announcement doc or error.
 */
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
 * Checks to see if id is valid. That is, if the announcement exists in DB.
 * @param id announcement id
 * @returns Promise true if the announcement exists, otherwise false.
 */
const announcementExists = async (id: mongoose.Types.ObjectId) => {
  try {
    await AnnouncementModel.findById(id);
    return Promise<true>;
  } catch {
    return Promise<false>;
  }
};

/**
 * Returns an announcement given an id
 * @param id announcement id
 * @returns announcement document or error
 */
const getAnnouncementById = async (id: mongoose.Types.ObjectId) => {
  return await AnnouncementModel.findById(id);
};

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
  apps?: string[],
  body?: string,
  buttonColor?: string,
  buttonText?: string,
  buttonUrl?: string,
  endDate?: Date,
  imageUrl?: string,
  startDate?: Date,
  title?: string
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
      omitUndefined: true,
    }
  );

export default {
  getAnnouncements,
  insertAnnouncement,
  editAnnouncement,
  announcementExists,
  getAnnouncementById,
};
