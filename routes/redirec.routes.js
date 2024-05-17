import express from "express";
import { redirectLink } from "../controllers/redirect.controller.js";
const redirectRouter = express.Router();

redirectRouter.get("/:nanolink", redirectLink);

export default redirectRouter;
