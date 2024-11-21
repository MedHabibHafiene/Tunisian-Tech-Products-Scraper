import { Response } from "express";

export const catchError = (error: any, status: number, res: Response) => {
  if (error) {
    res.status(status).send(error.message);
  } else {
    res.status(500).send("Unknown Failure");
  }
};
