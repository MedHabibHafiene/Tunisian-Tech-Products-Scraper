import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { catchError } from "../../helpers/errors";

const surpriseSchema = yup.object().shape({
  name: yup.string().min(1).max(25).required(),
  description: yup.string().max(255).optional(),
});

const constructSurprise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await surpriseSchema
    .validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((validationError) => {
      catchError({ message: validationError.errors }, 422, res);
      // return res.status(422).send(validationError.errors);
    });
};

export default constructSurprise;
