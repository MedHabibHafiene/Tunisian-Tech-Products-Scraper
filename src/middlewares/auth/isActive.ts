import { IUser } from "./../../models/User";
import { catchError } from "./../../helpers/errors";
import { Request, Response, NextFunction } from "express";

const isActive = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { activated } = res.locals.currentUser as IUser;
    if (!activated) throw new Error("user not activated");
    next();
  } catch (error) {
    catchError(error, 401, res);
  }
};

export default isActive;
