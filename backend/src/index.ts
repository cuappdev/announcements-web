import announcementRouter from "./announcements/views";
import appRouter from "./apps/views";
import bodyParser from "body-parser";
import express from "express";
import spec from "../api-spec.json";
import swaggerUI from "swagger-ui-express";
import { dbConnect } from "./database";

const app = express();

// Middleware to parse json request bodies
app.use(bodyParser.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));

/**
 * Sub-routers for our main router, we should have one sub-router per "entity" in the application
 */
app.use("/api/announcements", announcementRouter);
app.use("/api/apps", appRouter);
app.use("api/announcements/edit/:id", announcementRouter);

/**
 * Some dummy routes to illustrate express syntax
 */
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 8000, async () => {
  console.log("✅ Server is up and running");
  await dbConnect();
});
