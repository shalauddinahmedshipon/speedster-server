import { ObjectId } from "mongoose";
import { Bicycle } from "./bicyle.interface";
import { Product } from "./bicyle.model";

const createProductToDB =async(product:Bicycle)=>{
  const result = await Product.create(product);
  return result
}
const getAllProductsFromDB =async(query:object)=>{
  const result = await Product.find(query).exec();
  return result
}
const getASingleProductFromDB =async(productId:string)=>{
  const result = await Product.findById(productId)
  return result
}

export const productServices ={
  createProductToDB,
  getAllProductsFromDB,
  getASingleProductFromDB
}