import { Request, Response, NextFunction } from "express";
import { catchError } from "../../helpers/errors";
import bcrypt from "bcrypt";
import User from "../../models/User";

const singIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isMatch = await bcrypt.compare(
      req.body.password,
      res.locals.currentUser.password
    );
    if (!isMatch) throw Error("Incorrect email or password");
    next();
    return;
  } catch (error) {
    catchError(error, 500, res);
  }
};
export default singIn;
