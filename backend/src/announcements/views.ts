import AnnouncementController from "./controllers";
import { Router } from "express";
import { successJson, errorJson } from "../utils/jsonResponses";
import mongoose from "mongoose";
import { removeImage, upload, uploadImage } from "../utils/upload";

const announcementRouter = Router();

announcementRouter.get("/", async (req, res) => {
  // #swagger.tags = ['Announcements']
  return res
    .status(200)
    .send(successJson(await AnnouncementController.getAnnouncements()));
});

announcementRouter.post(
  "/create/",
  upload.single("image"),
  async (req, res) => {
    // #swagger.tags = ['Announcements']
    try {
      const {
        apps,
        body,
        buttonColor,
        buttonText,
        buttonUrl,
        endDate,
        startDate,
        title,
      } = req.body;

      console.log(apps);

      // Check for missing input
      if (
        !apps ||
        !body ||
        !buttonColor ||
        !buttonText ||
        !buttonUrl ||
        !endDate ||
        !startDate ||
        !title
      ) {
        return res.status(400).send(errorJson("Missing required field"));
      }

      // Validate hex code
      const regex = /^#[0-9A-F]{6}$/i;
      if (!regex.test(buttonColor)) {
        return res.status(400).send(errorJson("Invalid hex color"));
      }

      // Check for image upload
      if (!req.file) {
        return res.status(400).send(errorJson("No image uploaded"));
      }

      const imageUrl = await uploadImage(req.file);
      if (!imageUrl) {
        return res.status(500).send(errorJson("Image upload failed"));
      }

      return res
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
  }
);

announcementRouter.put(
  "/edit/:id",
  upload.single("image"),
  async (req, res) => {
    // #swagger.tags = ['Announcements']
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const apps = req.body.apps;
      const body = req.body.body;
      const buttonColor = req.body.buttonColor;
      const buttonText = req.body.buttonText;
      const buttonUrl = req.body.buttonUrl;
      const endDate = req.body.endDate;
      const imageUrl = req.body.imageUrl;
      const startDate = req.body.startDate;
      const title = req.body.title;

      // Check for missing input
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
        return res.status(400).send(errorJson("Missing required field"));
      }

      // Validate hex code
      const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
      if (!Reg_Exp.test(buttonColor)) {
        return res
          .status(400)
          .send(errorJson("buttonColor must be a valid hexcode"));
      }

      // Check for image upload
      if (!req.file) {
        return res.status(400).send(errorJson("No image uploaded"));
      }

      return res
        .status(200)
        .send(
          successJson(
            await AnnouncementController.editAnnouncement(
              id,
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
  }
);

announcementRouter.delete("/delete/:id", async (req, res) => {
  // #swagger.tags = ['Announcements']
  const id = new mongoose.Types.ObjectId(req.params.id);
  const deleted = await AnnouncementController.deleteAnnouncement(id);

  if (deleted) {
    // Remove image from storage
    await removeImage(deleted.imageUrl);

    return res.status(200).send(successJson(deleted));
  } else {
    return res.status(400).send(errorJson("Announcement does not exist"));
  }
});

export default announcementRouter;
