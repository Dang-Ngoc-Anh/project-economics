const asyncHandler = require("express-async-handler");
const productModel = require("../model/productModel");
const slugify = require("slugify")

const createProduct = asyncHandler(async(req,res) =>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await productModel.create(req.body);
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
}) ;

const getaProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const findProduct = await productModel.findById(id);
        res.json(findProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllProduct = asyncHandler(async(req,res) =>{
    try {
        const queryObject = {...req.query};
        const execFields = ["page" ,"sort" ,"limit" ,"fields"];
        execFields.forEach(el => {delete queryObject[el]}) 
        let queryStr = JSON.stringify(queryObject);
        queryStr =  queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`) 
         const getAllproduct = await productModel.find(JSON.parse(queryStr))
        res.json(getAllproduct)
    } catch (error) {
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async(req,res)=>{
    try {
        const {_id} = req.params;
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }

        const updateProduct = await productModel.findOneAndUpdate(
           _id , 
           req.body,
           {new : true}
        );

        res.json(updateProduct);
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteProducts = await productModel.findOneAndDelete({_id:id})
        res.json(deleteProducts);
    } catch (error) {
        throw new Error(error)
    }
})
module.exports = {createProduct , getaProduct ,getAllProduct ,updateProduct,deleteProduct}