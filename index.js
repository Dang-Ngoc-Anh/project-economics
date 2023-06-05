const express = require('express')
const app = express()
const dotenv = require("dotenv").config();
const port = process.env.PORT
const morgan = require("morgan")
const bodyParser = require("body-parser")
const userRouter = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const cors = require('cors');
const cookieParser = require("cookie-parser")
require('dotenv').config();

const dbConfig = require("./config/dbConfig");

dbConfig()
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/api" , userRouter);
app.use("/api/v1/product" , productRoute );

app.listen(port , ()=>{
    console.log(`Connection success ${port}`)
})
