import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await userService.registerUserIntoDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'All User retrieve successfully',
    data: result,
  });
});


export const userController ={
  getAllUser,
  registerUser
}