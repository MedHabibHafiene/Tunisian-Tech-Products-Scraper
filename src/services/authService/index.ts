import { Model } from "mongoose";
import config from "../../config";
import { unknownRole } from "../../constants/roleStandard";
import hashedPwd from "../../helpers/hashedPwd";
import { rolePartner } from "../../helpers/role";
import {
  generateAccessToken,
  generateRefreshToken,
  generateVerifEmailToken,
} from "../../helpers/tokenHelper";
import Role from "../../models/Role";
import UnknownUser, { IUnknownUser } from "../../models/UnknownUser";
import User, { IUser } from "../../models/User";

export const createUnknownUser = async () => {
  const unknown = await Role.findOne({ name: unknownRole.name });
  const unknownUser = await new UnknownUser({
    role: unknown,
  }).save();
  const refreshToken = generateRefreshToken(
    {
      id: unknownUser._id as string,
    },
    config.refreshToken as string
  );
  const accessToken = generateAccessToken(
    { id: unknownUser._id as string } ,
    config.accessToken as string
  );
  return { refreshToken, accessToken };
};

export const signUp = async (data: IUser) => {
  const pwd = await hashedPwd(data.password);
  await new User({
    ...data,
    password: pwd,
    verifyEmailToken: generateVerifEmailToken(
      { email: data.email },
      config.verifyEmailToken as string
    ),
    role: await rolePartner(),
  }).save();

  // To do return message to waiting admin accept
  return "Your account is being processed, an email will be sent to you later";
};

export const generateNewToken = async (userId: string) => {
  const accessToken = generateAccessToken(
    { id: userId },
    config.accessToken as string
  );

  return { accessToken };
};

export const getCurrentUser = async (userId: string, isUnknown: boolean) => {
  const model = isUnknown ? UnknownUser : User;
  const currentUser = await (model as Model<IUser | IUnknownUser>)
    .findById(
      { _id: userId },
      {
        _id: 0,
        password: 0,
        refreshTokenKey: 0,
        activated: 0,
        isBanned: 0,
        verifyEmailToken: 0,
        resetPasswordToken: 0,
      }
    )
    .populate([{ path: "role", select: "-_id name" }]);

  return currentUser;
};

export const singIn = async (userId: string, unknownUserId: string) => {
  await UnknownUser.findByIdAndDelete(unknownUserId);

  const refreshToken = generateRefreshToken(
    {
      id: userId,
    },
    config.refreshToken as string
  );
  const accessToken = generateAccessToken(
    { id: userId },
    config.accessToken as string
  );
  return { refreshToken, accessToken };
};
