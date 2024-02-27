import AppController from "./controllers";

import { Router } from "express";
import { successJson } from "../utils/jsonResponses";

const appRouter = Router();

appRouter.get("/", async (req, res) => {
  // #swagger.tags = ['Apps']
  res.status(200).send(successJson(await AppController.getApps()));
});

export default appRouter;
