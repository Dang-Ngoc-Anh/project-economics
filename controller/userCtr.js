const userModel = require("../model/userModel");
const asynHandler = require("express-async-handler")
const { generateTokenn } = require("../config/jwtToken");
const createUser = asynHandler(async(req, res)=>{
    try {
        const email = req.body.email;
        const findUser = await userModel.findOne({email:email});
        if(!findUser){
            const newUser = await userModel.create(req.body);
            res.json(newUser);
        }else{
            res.json(
                {
                    success : false,
                    message : "User alredy exit"
                }
            );
        }
      } catch (error) {
        throw new Error(error);
      }
})

const getAllUser = asynHandler(async(req , res)=>{
    const {id} = req.params;
    if(id === undefined)
        items = await userModel.find({});
    else
        items= await userModel.findById(id);
    res.json(items)
})

const deleteUser = asynHandler(async(req , res) =>{
    try {
        const {id} = req.params;
        const user =  await userModel.findOneAndDelete({_id : id});
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({
            message : error
        })
    }
})

const updateUser = asynHandler(async(req , res)=>{
    try {
        const {_id} = req.user;
        const user =  await userModel.findOneAndUpdate(
            _id,
            {
                name: req?.body?.name,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        );
        res.status(200).json(user)
    } catch (error) {
        throw new Error(error)
    }
})

//login
const loginUser = asynHandler( async(req , res)=>{
    const {email , password} = req.body;
    
    const findUser = await userModel.findOne({email})
    if(findUser){
        res.json({
            _id : findUser?._id,
            firstname : findUser?.firstname,
            lastname : findUser?.lastname,
            email: findUser?.email,
            mobile:findUser?.mobile,
            password:findUser?.password,
            token:generateTokenn(findUser?._id)
        })
    }else
        throw new Error("invalid credentials")
});

const blockUser = asynHandler(async(req,res)=>{

})

const unblockUser = asynHandler(async(req, res)=>{

})
module.exports = {
    createUser,
    getAllUser,
    deleteUser,
    updateUser,
    loginUser,
    blockUser,
    unblockUser
}