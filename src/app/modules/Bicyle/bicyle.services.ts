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

export const productServices ={
  createProductToDB,
  getAllProductsFromDB
}