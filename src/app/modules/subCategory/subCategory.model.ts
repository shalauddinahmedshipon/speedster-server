import { Schema, model } from "mongoose";
import { TSubCategory } from "./subCategory.interface";
import slugify from "slugify";

const SubCategorySchema = new Schema<TSubCategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

SubCategorySchema.pre('save',function(next){
  if(this.isModified('name')){
    this.slug=slugify(this.name,{lower:true,strict:true});
  }
  next()
})

const SubCategory = model<TSubCategory>("SubCategory", SubCategorySchema);
export default SubCategory;
