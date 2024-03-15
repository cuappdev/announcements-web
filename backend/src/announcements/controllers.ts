import mongoose from "mongoose";
import { AnnouncementModel, Announcement } from "./models";

/**
 * Finds all announcement docs.
 *
 * @returns A promise with all announcement docs or error.
 */
const getAnnouncements = async () => {
  return AnnouncementModel.find({});
};

/**
 * Creates an announcement doc.
 *
 * @param apps The slugs of apps that this announcement will be presented in.
 * @param body The body text of the announcement.
 * @param buttonColor The color of the call to action button in Hex (e.g. #FFFFFF).
 * @param buttonText The text label for the call to action button.
 * @param buttonUrl The redirect URL for the call to action button.
 * @param endDate The date in which the announcement will be removed.
 * @param imageUrl The URL of the image to display.
 * @param startDate The date in which the announcement will be released.
 * @param title The heading text of the announcement.
 *
 * @returns A promise with the new announcement doc or error.
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
) => {
  return AnnouncementModel.create(
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
};

/**
 * Edits an announcement doc.
 *
 * @param id The unique identifier of this announcement.
 * @param apps The slugs of apps that this announcement will be presented in.
 * @param body The body text of the announcement.
 * @param buttonColor The color of the call to action button in Hex (e.g. #FFFFFF).
 * @param buttonText The text label for the call to action button.
 * @param buttonUrl The redirect URL for the call to action button.
 * @param endDate The date in which the announcement will be removed.
 * @param imageUrl The URL of the image to display.
 * @param startDate The date in which the announcement will be released.
 * @param title The heading text of the announcement.
 *
 * @returns A promise with the edited announcement doc or error.
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
) => {
  return AnnouncementModel.findOneAndUpdate(
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
};

/**
 * Deletes an announcement doc.
 *
 * @param id The ID of the announcement to delete.
 *
 * @returns A promise with the deleted announcement doc or error.
 */
const deleteAnnouncement = async (id: mongoose.Types.ObjectId) => {
  return AnnouncementModel.findByIdAndDelete(id);
};

/**
 * Fetches announcements given an app slug.
 *
 * @param slug The slug nickname for an app.
 *
 * @returns A promise with a list of announcement docs or error.
 */
const getAnnouncementsBySlug = async (slug: string) => {
  return AnnouncementModel.find({ apps: slug });
};

/**
 * Fetches an announcement by id.
 *
 * @param id The ID of the announcement to fetch.
 *
 * @returns A promise with the anouncement doc or error.
 */
const getAnnouncementById = async (id: mongoose.Types.ObjectId) => {
  return AnnouncementModel.findById(id);
};

export default {
  getAnnouncements,
  insertAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
  getAnnouncementsBySlug,
  getAnnouncementById,
};
