const mongoose=require("mongoose");

const Schema = mongoose.Schema;
const userschema = new Schema({
    email:{type:String,require:true},
    user: {type:String,unique:true,require:true,minlength:4},
    password: {type:String,minlength:8}
});


const User = mongoose.model('User', userschema);

module.exports=User;