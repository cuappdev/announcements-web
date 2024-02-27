import AnnouncementController from "./controllers";
import { Router } from "express";
import { errorJson, successJson } from "../utils/jsonResponses";
import mongoose from "mongoose";
import { upload, uploadImage } from "../utils/upload";

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
      const apps = req.body.apps;
      const body = req.body.body;
      const buttonColor = req.body.buttonColor;
      const buttonText = req.body.buttonText;
      const buttonUrl = req.body.buttonUrl;
      const endDate = req.body.endDate;
      const image = req.body.image;
      // const imageUrl = req.body.imageUrl;
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
        // !imageUrl ||
        !startDate ||
        !title
      ) {
        return res.status(400).send(errorJson("Missing required field"));
      }

      // Validate hex code
      let Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
      if (!Reg_Exp.test(buttonColor)) {
        return res
          .status(400)
          .send(errorJson("buttonColor must be a valid hexcode"));
      }

      // Check for image upload
      if (!req.file) {
        return res.status(400).send(errorJson("No image uploaded"));
      }

      // wait for promise to be resolved
      const imageUrl = await uploadImage(req.file);

      // check if imageUrl is undefined
      if (!imageUrl) {
        return res.status(400).send(errorJson("Image upload failed"));
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
