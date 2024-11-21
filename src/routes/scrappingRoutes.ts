import { Router } from "express";
import * as scrappingController from "../controllers/scrappingController";

const router = Router();

const API_ROUTE = "/scrapping";

router.get(
  `${API_ROUTE}/alarabia/scrape`,
  scrappingController.alArabiaScrapping
);

router.get(
  `${API_ROUTE}/tunisianet/scrape`,
  scrappingController.tunisianetScrapping
);

router.get(
  `${API_ROUTE}/alarabia/category`,
  scrappingController.category
);




export default router;
