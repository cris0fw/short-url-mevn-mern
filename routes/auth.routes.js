import express from "express";
import {
  infoUser,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import {
  loginValidation,
  registerValidation,
} from "../middlewares/validators.js";
import { validateResults } from "../middlewares/validateResulst.js";
import requireToken from "../middlewares/requireToken.js";
import requireRefreshTOken from "../middlewares/requireRefreshToken.js";
const userRouter = express.Router();

userRouter.post("/register", registerValidation, validateResults, register);
userRouter.post("/login", loginValidation, validateResults, login);
userRouter.get("/profile", requireToken, infoUser);
userRouter.get("/refreshToken", requireRefreshTOken, refreshToken);
userRouter.get("/logout", logout);

export default userRouter;
