// const { Sequelize, DataTypes, DATE, STRING, ARRAY, UUID } = require("sequelize");
// const db = require("../config/dbConfig")
// const bcrypt = require("bcrypt")
// const user = db.define("user", {
//     id:{
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//     mobile: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//     address: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     role:{
//       type: DataTypes.STRING,
//       defaultValue:"user"
//     },
//     isBlocked: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     refreshToken: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     passwordChangedAt: {
//       type : DataTypes.DATE ,
//       allowNull:true
//      },
//     passwordResetToken: {
//       type : DataTypes.STRING , allowNull: true 
//     },
//     passwordResetExpires: {
//       type :DataTypes.DATE 
//     },
//     timesStamps: {
//       type : DataTypes.BOOLEAN,
//       defaultValue:true,
//     },
//     wishlist: {
//       type: DataTypes.STRING,
//       defaultValue:"",
//       // references:{
//       //   model:"product",
//       //   key:"id"
//       // }  
//     },
//     cart: {
//       type: DataTypes.STRING,
//       defaultValue: "",
//     },
// }) 


// user.beforeCreate((user , options) =>{
//     return bcrypt.hash(user.password, 10)
//     .then(hash => {
//         user.password = hash;
//     })
//     .catch(err => { 
//         throw new Error(); 
//     });
// })

// db.sync().then( async () => {
    
//     console.log('User table created successfully!');
//  }).catch((error) => {
//     console.error('Unable to create table : ', error);
//  });


// module.exports = user
const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


//Export the model
module.exports = mongoose.model("User", userSchema);