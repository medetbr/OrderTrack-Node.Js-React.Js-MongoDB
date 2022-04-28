//libraries
const express = require("express");
const cors = require("cors")
//routers
const userRouter = require("./routers/userRouter")
const shopRouter = require("./routers/shopRouter")
const orderRouter = require("./routers/orderRouter")

//other
const loaders = require("./loaders");
loaders();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users",userRouter)
app.use("/api/shops",shopRouter)
app.use("/api/orders",orderRouter)

app.listen(5000,()=>{
    console.log("server is running...");
})
