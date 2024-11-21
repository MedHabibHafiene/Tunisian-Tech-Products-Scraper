import { Request, Response } from "express";
import { catchError } from "../../helpers/errors";
import * as scrappingService from "../../services/scrappingService";


export const alArabiaScrapping = async (_req: Request, res: Response) => {
  try {
    const response = await scrappingService.alArabiaScrape();
    res.status(200).send(response);
  } catch (error) {
    catchError(error, 500, res);
  }
};

export const tunisianetScrapping = async (_req: Request, res: Response) => {
  try {
    const response = await scrappingService.tunisianetScrape();
    res.status(200).send(response);
  } catch (error) {
    catchError(error, 500, res);
  }
};



export const category = async (_req: Request, res: Response) => {
  try {
    const response = await scrappingService.category();
    res.status(200).send(response);
  } catch (error) {
    catchError(error, 500, res);
  }
};

