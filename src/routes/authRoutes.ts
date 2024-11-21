import { Router } from "express";
import * as userValidator from "../validators/user";
import * as authMiddleware from "../middlewares/auth";
import * as authController from "../controllers/authController";
import * as userMiddleware from "../middlewares/user";

const router = Router();

const API_ROUTE = "/users";

router.post(
  `${API_ROUTE}`,
  authMiddleware.currentUser,
  authMiddleware.isUnknown,
  userValidator.constructUser,
  authMiddleware.checkExistEmail,
  authController.singUp
);

router.post(
  `${API_ROUTE}/signin`,
  authMiddleware.currentUser,
  authMiddleware.isUnknown,
  userValidator.signIn,
  userMiddleware.findByEmail,
  authMiddleware.isActive,
  authMiddleware.isBanned,
  authMiddleware.isVerified,
  userMiddleware.singIn,
  authController.singIn
);

router.get(
  `${API_ROUTE}/currentuser`,
  authMiddleware.currentUser,
  authMiddleware.isActive,
  authMiddleware.isBanned,
  authController.getCurrentUser
);

router.post(`${API_ROUTE}/unknown`, authController.createUnknownUser);

router.post(
  `${API_ROUTE}/refreshtoken`,
  authMiddleware.currentUserFromRefreshToken,
  authMiddleware.isActive,
  authMiddleware.isBanned,
  authController.generateNewToken
);

export default router;
