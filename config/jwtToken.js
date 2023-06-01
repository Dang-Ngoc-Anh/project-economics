const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const generateTokenn = (id)=>{
return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn: "3d"})
}

module.exports = {generateTokenn};