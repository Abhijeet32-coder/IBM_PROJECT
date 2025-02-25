const nodemailer=require("nodemailer");


const Auth=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"pharmacyshop12@gmail.com",
        pass:"lzxi xaie oymg llyu",
    }
})
module.exports=Auth;