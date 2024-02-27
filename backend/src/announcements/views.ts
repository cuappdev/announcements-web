import AnnouncementController from "./controllers";
import { AnnouncementModel } from "./models";
import { Router } from "express";
import { errorJson, successJson } from "../utils/jsonResponses";
import mongoose from "mongoose";
import { upload, uploadImage, removeImage } from "../utils/upload";

const announcementRouter = Router();

announcementRouter.get("/", async (req, res) => {
  // #swagger.tags = ['Announcements']
  res
    .status(200)
    .send(successJson(await AnnouncementController.getAnnouncements()));
});

announcementRouter.put(
  "/edit/:id",
  upload.single("image"),
  async (req, res) => {
    // #swagger.tags = ['Announcements']
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
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
        // Find original image to delete it
        const oldAnnouncement = AnnouncementModel.findById(id);
        const oldImageUrl = oldAnnouncement.imageUrl;

        await removeImage(oldImageUrl);

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
      res.status(500).send(errorJson(error));
    }
  }
);

export default announcementRouter;
