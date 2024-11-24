import { Request, Response } from "express";
import { productServices } from "./bicyle.services";
import config from "../../config";

const createProduct =async(req:Request,res:Response)=>{

  try {
    const product = req.body.product;
   const result = await productServices.createProductToDB(product);
    res.status(200).json({
      message: "Bicycle created successfully",
      success: true,
      data: result
    })
  } catch (error:any) {
    res.status(500).json(
      {
        message: "Validation failed",
        success: false,
        error: error,
        stack:config.node_env==='development'? error.stack:undefined
          })
        }
       
}
const getAllProducts =async(req:Request,res:Response)=>{

  try {
    const {searchTerm} = req.query;
    const query:any = {};
    if(searchTerm){
      const searchRegex = new RegExp(searchTerm as string,"i");
      query.$or=[
        {name:searchRegex},
        {brand:searchRegex},
        {type:searchRegex}
      ]
    } 
   const result = await productServices.getAllProductsFromDB(query);
    res.status(200).json({
      message: "Bicycles retrieved successfully",
      success: true,
      data: result
    })
  } catch (error:any) {
    res.status(500).json(
      {
        message: "Validation failed",
        success: false,
        error: error,
        stack:config.node_env==='development'? error.stack:undefined
          })
        }
       
}

export const productController ={
  createProduct,getAllProducts
}