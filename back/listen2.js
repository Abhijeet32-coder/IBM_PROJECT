const express=require("express");
const route=require("./server.js");
const app=express();
const cors=require("cors");
app.use(cors());
app.use("/api",route);
app.use(express.json());
app.listen(5000,()=>{
    console.log("this is running on the port 5000");
})