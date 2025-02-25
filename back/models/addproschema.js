const mongoose=require('mongoose');

const Schema =mongoose.Schema;
const add=new Schema({
    userid:{type:String},
    p_name:{type:String,unique:true },
    p_type:{type:String},
    quantity:{type:Number},
    cost:{type:Number},
    exp_date:{type:Date},
    comp_name:{htype:String},
});

module.exports=mongoose.model("tabletadd",add);