import { Types } from "mongoose";

export interface TCategory {
  _id?: Types.ObjectId;
  name: string;
  slug: string;
  isDeleted:boolean
  subCategories?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}




