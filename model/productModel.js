// const { Sequelize, DataTypes, DATE, STRING } = require("sequelize");
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
//     cart: {
//       type: Array,
//       defaultValue: [],
//     },
//     address: {
//       type: DataTypes.STRING,
//     },
//     wishlist: 
//       [{ type: DataTypes.STRING}]
//     ,
//     refreshToken: {
//       type: DataTypes.STRING,
//     },
//     passwordChangedAt: DATE,
//     passwordResetToken: STRING,
//     passwordResetExpires: DATE,
//     timesStamps: true
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