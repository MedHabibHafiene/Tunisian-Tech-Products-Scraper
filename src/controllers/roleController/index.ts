import {
  unknownRole,
  adminRole,
  employeeRole,
  partnerRole,
} from "../../constants/roleStandard";
import { Request, Response } from "express";
import { catchError } from "../../helpers/errors";
import Role from "../../models/Role";

export const createRole = async (_req: Request, res: Response) => {
  try {
    // const response = await authService.createUnknownUser()
    // res.send(response)
    const roleData = await new Role({
      ...employeeRole,
    }).save();
    res.send(roleData);
  } catch (error) {
    catchError(error, 500, res);
  }
};
