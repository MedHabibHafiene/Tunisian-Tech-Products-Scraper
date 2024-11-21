import { Request, Response, NextFunction } from "express";
import User from "../../models/User";

const findByEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send("Problem while finding user");
    return;
  }
  res.locals.unknownUser = res.locals.currentUser;
  res.locals.currentUser = user;
  next();
};
export default findByEmail;
