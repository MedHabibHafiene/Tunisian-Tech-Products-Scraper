import { Schema, model, Document, Types } from "mongoose";

export type UnknownUserType = {
  _id: string;
  role: string;
  activated: boolean;
  isBanned: boolean;
  isUnknown: boolean;
};

export interface IUnknownUser extends Omit<UnknownUserType, "_id">, Document {}

const unknownUser = new Schema(
  {
    role: { type: Types.ObjectId, ref: "Role" },
    activated: {
      type: Boolean,
      default: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isUnknown: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model<IUnknownUser>("UnknownUser", unknownUser);
