import { IUser } from "./../../models/User";
import { catchError } from "./../../helpers/errors";
import { Request, Response, NextFunction } from "express";

const isBanned = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { isBanned } = res.locals.currentUser as IUser;
    if (isBanned) throw new Error("user banned");
    next();
    return;
  } catch (error) {
    catchError(error, 401, res);
  }
};

export default isBanned;
