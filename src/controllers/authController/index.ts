import { Request, Response } from "express";
import { catchError } from "../../helpers/errors";
import * as authService from "../../services/authService";
import { IUser } from "../../models/User";

export const createUnknownUser = async (_req: Request, res: Response) => {
  try {
    const response = await authService.createUnknownUser();
    res.status(201).send(response);
  } catch (error) {
    catchError(error, 500, res);
  }
};

export const singUp = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await authService.signUp(data);
    res.status(201).send(response);
  } catch (error) {
    catchError(error, 500, res);
  }
};

export const generateNewToken = async (req: Request, res: Response) => {
  try {
    const { _id } = res.locals.currentUser as IUser;
    const response = await authService.generateNewToken(_id as string);
    res.status(200).send(response);
  } catch (error) {
    catchError(error, 500, res);
  }
};

export const getCurrentUser = async (_req: Request, res: Response) => {
  try {
    const { _id, isUnknown } = res.locals.currentUser as IUser;
    const response = await authService.getCurrentUser(_id as string, isUnknown);
    res.status(200).send(response);
  } catch (error) {
    catchError(error, 500, res);
  }
};

export const singIn = async (_req: Request, res: Response) => {
  try {
    const { _id } = res.locals.currentUser as IUser;
    const { _id: unknownUserId } = res.locals.unknownUser as IUser;

    const response = await authService.singIn(_id as string, unknownUserId as string);
    res.status(200).send(response);
  } catch (error) {
    catchError(error, 500, res);
  }
};
