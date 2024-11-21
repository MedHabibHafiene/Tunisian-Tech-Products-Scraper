import { sign, Secret, verify } from "jsonwebtoken";
import { Request, Response } from "express";
import config from "../config";

export const generateAccessToken = (payload: { id: string }, key: Secret) =>
  sign(payload, key, { expiresIn: config.accessTokenExpires });
export const generateRefreshToken = (payload: { id: string }, key: Secret) =>
  sign(payload, key);
export const generateVerifEmailToken = (
  payload: { email: string },
  key: Secret
) => sign(payload, key);
export const verifToken = (token: string, key: Secret) => verify(token, key);
export const verifTokenFromHeader = async (req: Request, key: Secret) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader === "undefined") throw new Error("No token");
  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("No token");
  return verifToken(token, key);
};
