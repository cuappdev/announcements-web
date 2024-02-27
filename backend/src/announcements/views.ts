import AnnouncementController from "./controllers";
import { Router } from "express";
import { successJson, errorJson } from "../utils/jsonResponses";

const announcementRouter = Router();

announcementRouter.get("/", async (req, res) => {
  // #swagger.tags = ['Announcements']
  res
    .status(200)
    .send(successJson(await AnnouncementController.getAnnouncements()));
});

announcementRouter.post("/create/", async (req, res) => {
  // #swagger.tags = ['Announcements']
  try {
    const {
      apps,
      body,
      buttonColor,
      buttonText,
      buttonUrl,
      endDate,
      imageUrl,
      startDate,
      title,
    } = req.body;

    if (
      !apps ||
      !body ||
      !buttonColor ||
      !buttonText ||
      !buttonUrl ||
      !endDate ||
      !imageUrl ||
      !startDate ||
      !title
    ) {
      return res.status(500).send(errorJson("Invalid request body"));
    }

    let regex = /^#[0-9A-F]{6}$/i;
    if (!regex.test(buttonColor)) {
      return res.status(500).send(errorJson("Invalid hex color"));
    }

    res
      .status(201)
      .send(
        successJson(
          await AnnouncementController.insertAnnouncement(
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
        )
      );
  } catch (error) {
    return res.status(500).send(errorJson(error));
  }
});

export default announcementRouter;
