import { IUserPopulateRole } from "./../../models/User";
import { catchError } from "./../../helpers/errors";
import { Request, Response, NextFunction } from "express";
import { unknownRole } from "../../constants/roleStandard";

const isUnknown = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = res.locals.currentUser as IUserPopulateRole;
    if (role === undefined || role.name !== unknownRole.name)
      throw new Error("you don't have permission");
    next();
    return;
  } catch (error) {
    catchError(error, 401, res);
  }
};

export default isUnknown;
