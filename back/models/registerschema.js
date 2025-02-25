const mongoose=require('mongoose');




const Schema=mongoose.Schema;
const register=new Schema({
    name:{type:String},
    shop:{type:String},
    addr:{type:String},
    email:{type:String,unique:true}

});


register.index({email:1});
const Reg=mongoose.model('resi',register);

module.exports=Reg;