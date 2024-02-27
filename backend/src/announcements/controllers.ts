import mongoose from "mongoose";

import { AnnouncementModel, Announcement } from "./models";

/**
 * Finds all announcment docs in DB
 * @returns promise with all announcment docs or error
 */
const getAnnouncements = async () => AnnouncementModel.find({});

export default {
  getAnnouncements,
};
