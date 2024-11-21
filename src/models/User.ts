import { IRole } from "./Role";
import { Schema, model, Document, Types } from "mongoose";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  activated: boolean;
  isBanned: boolean;
  isUnknown: boolean;
  verifyEmailToken: string;
  resetPasswordToken: string;
};

export interface IUser extends Omit<UserType, "_id">, Document {}

export interface IUserPopulateRole extends Omit<UserType, "_id" | "role"> {
  role: IRole;
}

const user = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: { type: String, required: false },
    role: { type: Types.ObjectId, ref: "Role" },
    activated: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isUnknown: {
      type: Boolean,
      default: false,
    },
    verifyEmailToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", user);
