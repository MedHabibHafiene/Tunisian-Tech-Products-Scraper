import { Request, Response, NextFunction } from "express";
import User from "../../models/User";

const checkExistEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).send("user exists");
    return;
  }
  next();
};
export default checkExistEmail;
