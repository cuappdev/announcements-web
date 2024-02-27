import AnnouncementController from "./controllers";
import { Router } from "express";
import { successJson } from "../utils/jsonResponses";

const announcementRouter = Router();

announcementRouter.get("/", async (req, res) => {
  // #swagger.tags = ['Announcements']
  res
    .status(200)
    .send(successJson(await AnnouncementController.getAnnouncements()));
});

export default announcementRouter;
