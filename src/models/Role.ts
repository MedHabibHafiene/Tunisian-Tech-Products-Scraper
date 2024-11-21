import { Schema, Document, model } from "mongoose";

export type RoleType = {
  _id: string;
  name: string;
  description: string;
};

export interface IRole extends Omit<RoleType, "_id">, Document {}

const role = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IRole>("Role", role);
