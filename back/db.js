const mongoose=require("mongoose");
require('dotenv').config();

// const url=;


const connection=mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connection successful");
})
.catch((err) => {
  console.error("Connection error:", err);
});
    
module.exports=connection;