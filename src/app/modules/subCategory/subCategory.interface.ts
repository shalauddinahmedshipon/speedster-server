import { Types } from "mongoose";

export interface TSubCategory {
  _id?: Types.ObjectId;
  name: string;
  slug: string;
  category: Types.ObjectId;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
