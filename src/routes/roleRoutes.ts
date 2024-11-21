import { Router } from "express";
// import * as userValidator from "../validators/user";
// import * as authMiddleware from "../middlewares/auth";
import * as roleController from "../controllers/roleController";
// import * as userMiddleware from "../middlewares/user"

const router = Router();

const API_ROUTE = "/roles";

router.post(`${API_ROUTE}`, roleController.createRole);

export default router;
