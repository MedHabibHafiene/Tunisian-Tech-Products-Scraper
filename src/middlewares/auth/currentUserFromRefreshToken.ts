import { payloadTokentype } from "./../../types/payloadTokentype";
import { verifTokenFromHeader } from "./../../helpers/tokenHelper";
import { catchError } from "./../../helpers/errors";
import { Request, Response, NextFunction } from "express";
import config from "../../config";
import User from "../../models/User";
import UnknownUser from "../../models/UnknownUser";

const currentUserFromRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payloadToken = (await verifTokenFromHeader(
      req,
      config.refreshToken as string
    )) as payloadTokentype;
    const user = await User.findById(payloadToken.id).populate("role");

    if (!user) {
      const unknownUser = await UnknownUser.findById(payloadToken.id).populate(
        "role"
      );

      if (!unknownUser) {
        res.status(404).send("user not found"); // to do verify with return
        return;
      }

      res.locals.currentUser = unknownUser;
      next();
      return;
    }
    res.locals.currentUser = user;
    next();
    return;
  } catch (error) {
    catchError({ message: (error as Error).message }, 403, res);
    // res.status(403).send('IToken expired');
  }
};

export default currentUserFromRefreshToken;
