import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { catchError } from "../../helpers/errors";

const userSchema = yup.object().shape({
  firstName: yup.string().min(2).max(25).required(),
  lastName: yup.string().min(2).max(25).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  phoneNumber: yup.string().required(),
});

const constructUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await userSchema
    .validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((validationError) => {
      catchError({ message: validationError.errors }, 422, res);
      // return res.status(422).send(validationError.errors);
    });
};

export default constructUser;
