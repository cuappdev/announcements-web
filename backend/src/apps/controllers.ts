import { AppModel } from "./models";

/**
 * Finds all app docs in DB
 * @returns promise with all app docs or error
 */
const getApps = async () => {
  return AppModel.find({});
};

export default {
  getApps,
};
