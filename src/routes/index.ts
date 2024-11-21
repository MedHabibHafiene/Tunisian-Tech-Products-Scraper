import { Router } from "express";
import authRoutes from "./authRoutes";
import scrappingRoutes from "./scrappingRoutes";
import roleRoutes from "./roleRoutes";
// import userRoutes from "./userRoutes";

const router = Router();

router.use([authRoutes, roleRoutes, scrappingRoutes]);

export default router;
