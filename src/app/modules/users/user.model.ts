import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import bcrypt from "bcrypt";
import config from "../../config";


const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true , select: 0},
    passwordChangedAt: { type: Date, default: null },
    status: { type: String, enum: ["in-progress", "blocked"], default: "in-progress" },
    role: { type: String, enum: ["superAdmin", "admin", "customer"], default: "customer" },
    isDeleted:{type:Boolean,default:false}
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function (next) {
  const isAdminExist = await User.findOne({ role: 'superAdmin' });
  if (isAdminExist && this.role === 'superAdmin') {
    throw new AppError(StatusCodes.CONFLICT, 'Super Admin is already Exist!');
  }
  const isUserExist = await User.findOne({ email: this.email });
  if (isUserExist) {
    throw new AppError(StatusCodes.CONFLICT, 'This User is already Exist!');
  }
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_solt));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});








const User = model<TUser>("User", userSchema);

export default User;
