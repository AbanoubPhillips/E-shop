import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv/config";
import bodyParser from 'body-parser';
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import productRouter from './router/product_router.js';
import userRouter from "./router/user_router.js";
import ordersRouter from "./router/order_router.js";
import categoriesRouter from "./router/category_router.js";
import orderItemRouter from "./router/orderitem-router.js";

const app = express();
// port
app.listen(3000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.options('*',cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/public/upload',express.static(__dirname + '/public/upload'));



// atlas database connection 
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true, 
    useUnifiedTopology: true ,
    dbName:'e-shop'
})
.then(()=>console.log("database connected"))
.catch((err)=>console.error(err));

// handle app routers
app.use("/api/v1",userRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/orders",ordersRouter);
app.use("/api/v1/categories",categoriesRouter);
app.use("/api/v1/order_item",orderItemRouter);

