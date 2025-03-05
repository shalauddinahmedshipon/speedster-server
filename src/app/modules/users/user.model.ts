import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";



const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    passwordChangedAt: { type: Date, default: null },
    status: { type: String, enum: ["in-progress", "blocked"], default: "in-progress" },
    role: { type: String, enum: ["superAdmin", "admin", "customer"], default: "customer" },
  },
  {
    timestamps: true,
  }
);


const User = model<TUser>("User", UserSchema);

export default User;
