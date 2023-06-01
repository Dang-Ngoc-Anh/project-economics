const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
const asyncHanle = require("express-async-handler");

const authMiddleware = asyncHanle( async(req , res , next) =>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token , process.env.JWT_SECRET);
                const user = await userModel.findById(decoded?.id)
                req.user = user;
                next();
            }
        }catch(error){
            throw new Error("Not authorized to expried , Please login again");
        }
    }else{
        throw new Error("There is no token to attach to header");
    }
}) ;
const isAdmin = asyncHanle(async(req,res,next)=>{
    const {email} = req.user;
    const adminUser = await userModel.findOne({email});
    console.log(adminUser)
    if(adminUser.role !== "admin" ){
        throw new Error("You are not admin")
    }else
        next();
})
module.exports = {authMiddleware , isAdmin}