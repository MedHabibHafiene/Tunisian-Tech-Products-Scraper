import { IUser } from "./../../models/User";
import { catchError } from "./../../helpers/errors";
import { Request, Response, NextFunction } from "express";

const isVerified = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { verifyEmailToken } = res.locals.currentUser as IUser;
    if (verifyEmailToken) throw new Error("user not verified");
    next();
  } catch (error) {
    catchError(error, 401, res);
  }
};

export default isVerified;
