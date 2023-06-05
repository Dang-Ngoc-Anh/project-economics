const userModel = require("../model/userModel");
const asynHandler = require("express-async-handler")
const { generateTokenn } = require("../config/jwtToken");
const { validateMonggodbId } = require("../util/validateMongodbId");
const { generaterefreshTokenn } = require("../config/refreshToken");
const jwt = require("jsonwebtoken")
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
    {
        validateMonggodbId(id);
        items= await userModel.findById(id);
    }
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
        validateMonggodbId(_id);
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
    
    // check user or not exit
    const findUser = await userModel.findOne({email})
    if(findUser){
        const refreshToken = await generaterefreshTokenn(findUser?.id);
        const updateUser = await userModel.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken
        },
        {
            new : true,
        });
        res.cookie('refreshToken' , refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,

        });

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
    const {id}  = req.params;
    try{
        const block = await userModel.findByIdAndUpdate(
            id,
            {
                isBlocked : true,
            },
            {
                new : true,
            }
        );

        res.json({
            message : "user blocked"
        })
    }catch(error){
        throw new Error(error);
    }
})

const unblockUser = asynHandler(async(req, res)=>{
    const {id}  = req.params;
    try{
        const block = await userModel.findByIdAndUpdate(
            id,
            {
                isBlocked : false,
            },
            {
                new : true,
            }
        );

        res.json({
            message : "user un blocked"
        })
    }catch(error){
        throw new Error(error);
    }
})

const handlerefreshToken = asynHandler(async(req , res)=>{
    const cookie = req.cookies;
    console.log(cookie)
    if(!cookie?.refreshToken) throw new Error("No refesh token in cookies");
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken);
    const user = await userModel.findOne({refreshToken})
    if(!user) throw new Error("No Refesh Token present in db");
    jwt.verify(refreshToken, process.env.JWT_SECRET , (err , decode)=>{
        if(err || user.id !== decode.id){
            throw new Error("There are something wrong with refersh token");
        }
    })

    const accessToken = generateTokenn(userModel._id);
    res.json({accessToken})
    });

const logout = asynHandler(async (req, res) => {
        const cookie = req.cookies;
        if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
        const refreshToken = cookie.refreshToken;
        const user = await userModel.findOne({ refreshToken });
        if (!user) {
          res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
          });
          return res.sendStatus(204); // forbidden
        }
        await User.findOneAndUpdate(refreshToken, {
          refreshToken: "",
        });
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
        });
        res.sendStatus(204); // forbidden
      });  


// save user Address

const saveAddress = asynHandler(async (req, res, next) => {
    const { _id } = req.user;
    validateMonggodbId(_id);
  
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        _id,
        {
          address: req?.body?.address,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updatePassword = asynHandler(async (req, res) => {
    const {_id} = req.user;
    console.log(req.user)
    const { password } = req.body;
    validateMonggodbId(_id);
    const user = await userModel.findById(_id);
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  });
module.exports = {
    createUser,
    getAllUser,
    deleteUser,
    updateUser,
    loginUser,
    blockUser,
    unblockUser,
    handlerefreshToken,
    logout,
    saveAddress,
    updatePassword,
}