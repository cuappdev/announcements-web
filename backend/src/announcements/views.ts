import AnnouncementController from "./controllers";
import AppController from "../apps/controllers";
import mongoose from "mongoose";
import { Router } from "express";
import { successJson, errorJson } from "../utils/jsonResponses";
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

      // Validate slugs
      const validSlugs = (await AppController.getApps()).map((doc) => doc.slug);
      for (const slug of apps) {
        if (!validSlugs.includes(slug)) {
          return res.status(400).send(errorJson("Invalid slug"));
        }
      }

      // Validate hex code
      const regex = /^#[0-9A-F]{6}$/i;
      if (!regex.test(buttonColor)) {
        return res.status(400).send(errorJson("Invalid hex color"));
      }

      // Validate start date < end date
      if (new Date(startDate) > new Date(endDate)) {
        return res.status(400).send(errorJson("Invalid startDate or endDate"));
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
      // Retrieve request data
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

      // Fetch original announcement and validate
      const originalAnnouncement =
        await AnnouncementController.getAnnouncementById(id);
      if (!originalAnnouncement) {
        return res.status(400).send(errorJson("Announcement does not exist"));
      }

      // Validate slugs
      if (apps) {
        const validSlugs = (await AppController.getApps()).map(
          (doc) => doc.slug
        );
        for (const slug of apps) {
          if (!validSlugs.includes(slug)) {
            return res.status(400).send(errorJson("Invalid slug"));
          }
        }
      }

      // Validate hex code
      if (buttonColor) {
        const regex = /^#[0-9A-F]{6}$/i;
        if (!regex.test(buttonColor)) {
          return res.status(400).send(errorJson("Invalid hex color"));
        }
      }

      // Validate start date < end date
      let invalidDate = false;
      if (startDate && endDate) {
        // Provides new start date and end date
        invalidDate = new Date(startDate) > new Date(endDate);
      } else if (startDate) {
        // Only provides start date
        invalidDate = new Date(startDate) > originalAnnouncement.endDate;
      } else if (endDate) {
        // Only provides end date
        invalidDate = new Date(endDate) < originalAnnouncement.startDate;
      }
      if (invalidDate) {
        return res.status(400).send(errorJson("Invalid startDate or endDate"));
      }

      // Check for image upload
      let imageUrl;
      if (req.file) {
        // Remove original image
        await removeImage(originalAnnouncement.imageUrl);

        // Upload new image
        imageUrl = await uploadImage(req.file);
        if (!imageUrl) {
          return res.status(500).send(errorJson("Image upload failed"));
        }
      }

      // Mongoose will reset all fields if all values are undefined so we check for missing input
      if (
        !apps &&
        !body &&
        !buttonColor &&
        !buttonText &&
        !buttonUrl &&
        !endDate &&
        !imageUrl &&
        !startDate &&
        !title
      ) {
        return res
          .status(400)
          .send(errorJson("Must provide at least one field"));
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

announcementRouter.get("/:slug", async (req, res) => {
  // #swagger.tags = ['Announcements']
  try {
    const slug = req.params.slug;

    // Check if slug exists
    const allApps = await AppController.getApps();
    const allSlugs = allApps.map((x) => x.slug);
    if (!allSlugs.includes(slug)) {
      return res.status(400).send(errorJson("Slug does not exist"));
    }

    // Fetch announcements with that slug
    let announcements = await AnnouncementController.getAnnouncementsBySlug(
      slug
    );

    // Return active announcements
    announcements = announcements.filter((a) => {
      return a.startDate < new Date() && new Date() < a.endDate;
    });

    return res.status(200).send(successJson(announcements));
  } catch (error) {
    return res.status(500).send(errorJson(error));
  }
});

export default announcementRouter;
