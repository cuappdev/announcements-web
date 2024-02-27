import { AppModel } from "./models";

/**
 * Finds all app docs in DB
 * @returns promise with all app docs or error
 */
const getApps = async () => AppModel.find({});

export default {
  getApps,
};
