import AnnouncementController from "./controllers";
import { AnnouncementModel } from "./models";
import { Router } from "express";
import { successJson, errorJson } from "../utils/jsonResponses";
import mongoose from "mongoose";
import { upload, uploadImage, removeImage } from "../utils/upload";

const announcementRouter = Router();

announcementRouter.get("/", async (req, res) => {
  // #swagger.tags = ['Announcements']
  res
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

      // Check if id is valid (if announcement exists)
      if (!(await AnnouncementController.announcementExists(id))) {
        return res.status(400).send(errorJson("Announcement does not exist"));
      }

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

      if (buttonColor) {
        // Validate hex code
        const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
        if (!Reg_Exp.test(buttonColor)) {
          return res
            .status(400)
            .send(errorJson("buttonColor must be a valid hexcode"));
        }
      }

      let imageUrl;

      if (req.file) {
        // Get original image to delete it

        const oldAnnouncement =
          await AnnouncementController.getAnnouncementById(id);
        const oldImageUrl = oldAnnouncement?.imageUrl;

        if (oldImageUrl) {
          await removeImage(oldImageUrl);
        }

        // Upload new image
        // Wait for promise to be resolved
        imageUrl = await uploadImage(req.file);

        // Check if imageUrl is undefined
        if (!imageUrl) {
          return res.status(400).send(errorJson("Image upload failed"));
        }
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

export default announcementRouter;
