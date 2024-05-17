import express from "express";
import requireToken from "../middlewares/requireToken.js";
import {
  createLink,
  getAllsLinks,
  getSingleLink,
  removeLink,
  updateLink,
} from "../controllers/link.controller.js";
import {
  linkValidation,
  paramLinkValidation,
} from "../middlewares/validators.js";
import { validateResults } from "../middlewares/validateResulst.js";
const linkRoutes = express.Router();

linkRoutes.get("/all-links", requireToken, getAllsLinks);
linkRoutes.post(
  "/create-links",
  requireToken,
  linkValidation,
  validateResults,
  createLink
);
linkRoutes.get("/single-links/:nanoLink", getSingleLink);

linkRoutes.delete(
  "/remove-links/:id",
  requireToken,
  paramLinkValidation,
  validateResults,
  removeLink
);

linkRoutes.patch(
  "/update-links/:id",
  requireToken,
  paramLinkValidation,
  validateResults,
  updateLink
);

export default linkRoutes;
