// const mysql  = require("mysql2");

// const dbConnect = () => {
//   try {
//     const pool = mysql.createPool({
//       host : process.env.HOST,
//       user : process.env.USER,
//       password : process.env.PASSWORD,
//       database : process.env.DATABASE,
//       waitForConnections: true,
//       connectionLimit: 10,
//       maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//       idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//       queueLimit: 0,
//       enableKeepAlive: true,
//       keepAliveInitialDelay: 0
//     });
//     pool.query("select * from user" , (err , val) =>{
//       if(err)
//       throw err
//         console.log(val)
//     })


//   } catch (error) {
//     console.log("data base err");
//   }
// };
// module.exports = dbConnect;
// const {Sequelize} = require("sequelize");

// const db = new Sequelize(
//     process.env.DATABASE,
//     process.env.USER,
//     process.env.PASSWORD,
//   {
//     host: process.env.HOST,
//     dialect: 'mysql'
//   }
// );

// db.authenticate()
//   .then(() => {console.log("connect sucess")})
//   .catch(err => console.log(err))

// module.exports = db
const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;