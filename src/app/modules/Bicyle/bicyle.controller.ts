import { Request, Response } from "express";
import { productServices } from "./bicyle.services";
import config from "../../config";

const createProduct =async(req:Request,res:Response)=>{

  try {
    const product = req.body.product;
   const result = await productServices.createProductToDB(product);
    res.status(200).json({
      message: "Bicycle created statusfully",
      status: true,
      data: result
    })
  } catch (error:any) {
    res.status(500).json(
      {
        message: "Validation failed",
        status: false,
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
      message: "Bicycles retrieved statusfully",
      status: true,
      data: result
    })
  } catch (error:any) {
    res.status(500).json(
      {
        message: "Validation failed",
        status: false,
        error: error,
        stack:config.node_env==='development'? error.stack:undefined
          })
        }
       
}

const getASingleProduct =async(req:Request,res:Response)=>{
  try {
    const productId = req.params.productId;
  const result = await productServices.getASingleProductFromDB(productId);
  res.status(200).json({
    message: "Bicycles retrieved statusfully",
    status: true,
    data: result
  })
  } catch (error:any) {
    res.status(500).json(
      {
        message: "Validation failed",
        status: false,
        error: error,
        stack:config.node_env==='development'? error.stack:undefined
          })
  }

}
const updateProduct =async(req:Request,res:Response)=>{
  try {
    const productId = req.params.productId;
    const updateFields = req.body;
  const result = await productServices.updateProductFromDB(productId,updateFields);
  res.status(200).json({
    message: "Bicycle updated statusfully",
    status: true,
    data: result
  })
  } catch (error:any) {
    res.status(500).json(
      {
        message: "Validation failed",
        status: false,
        error: error,
        stack:config.node_env==='development'? error.stack:undefined
          })
  }

}
const deleteProduct =async(req:Request,res:Response)=>{
  try {
    const productId = req.params.productId;
    await productServices.deleteProductFromDB(productId);
 
  res.status(200).json({
    message: "Bicycle deleted statusfully",
    status: true,
    data: {}
  })
  } catch (error:any) {
    res.status(500).json(
      {
        message: "Failed to delete the By cycle",
        status: false,
        error: error,
        stack:config.node_env==='development'? error.stack:undefined
          })
  }

}

export const productController ={
  createProduct,
  getAllProducts,
  getASingleProduct,
  updateProduct,
  deleteProduct
}