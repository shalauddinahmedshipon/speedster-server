import { TUser } from "./user.interface";
import User from "./user.model";

const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

export const userService ={
  getAllUserFromDB,
  registerUserIntoDB
}