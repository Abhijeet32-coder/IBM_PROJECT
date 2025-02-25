const express=require("express");
const addpro=require('./models/addproschema.js');
const User=require("./models/userschema.js");
const bcrypt=require("bcryptjs");
const reg=require('./models/registerschema.js');
const auth=require("./mail.js");
// const cookies=require('cookie-parser');
const app=express();
app.use(express.json());
const route=express.Router();
route.use(express.json());
const mongoose=require("./db.js")
// app.use(cookies());




//this is register of the user
route.post('/register',async(req,res)=>{
    try{
     if(!req.body.name || !req.body.shop || !req.body.addr ||  !req.body.email){
         throw new Error("all values should be required");
     }
 const newuser=new reg({
     name: req.body.name,
     shop: req.body.shop,
     addr: req.body.addr,
     email: req.body.email,
 });
 var id=function generateUserId() {
     const randomDigits = Math.floor(1000 + Math.random() * 9000);
     const userId = `ph${randomDigits}`;
     User.findOne({userid:userId}).exec().then(regi=>{   if(regi){  id();  }  })
 return userId;
 }

// var id=async function generateUserId() {
//     while (true) {
//         const randomDigits = Math.floor(1000 + Math.random() * 9000);
//         const userId = `ph${randomDigits}`;
//         try {
//             // Check if userId already exists in the database
//             const existingUser = await User.findOne({ user: userId }).exec();
//             if (!existingUser) {
//                 return userId; // Return unique userId if not found
//             }
//         } catch (error) {
//             console.error(`Error checking userId existence: ${error.message}`);
//             throw new Error("Failed to generate user ID");
//         }
//     }
// }
 const user_id=id();
 password=req.body.name+".6789";
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);
 await newuser.save();
 console.log(JSON.stringify(req.body, null, 2));
 const mail={
     from:"pharmacyshop12@gmail.com",
     to:req.body.email,
     subject:"the username and the password are being shared",
     text:`Hello ${req.body.name} sir/madam the usename is  ${user_id} and the password is ${password} so please don't share this to the to any one.`,
 };
 await auth.sendMail(mail,(err,info)=>{
   if(err){
     console.log(err);
   }
   else{
     console.log(info.response);
   }
 })
 const log=new User({
     email:req.body.email,
     user:user_id,
     password:hashedPassword
 });
 await log.save();
 res.send("ok fine");
 }catch(err){
 console.log(err);
 res.send(err);
 }
 });


// route.post('/register', async (req, res) => {
//     try {
//         // Validate required fields
//         const { name, shop, addr, email } = req.body;
//         if (!name || !shop || !addr || !email) {
//             throw new Error("All values are required");
//         }

//         // Generate unique user ID
//         const user_id = await generateUserId();

//         // Generate initial password
//         const password = `${name}.6789`;

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Save new user data
//         const newUser = new reg({
//             name,
//             shop,
//             addr,
//             email
//         });
//         await newUser.save();

//         // Send email with user credentials
//         const mailOptions = {
//             from: "pharmacyshop12@gmail.com",
//             to: email,
//             subject: "Username and Password Information",
//             text: `Hello ${name},\n\nYour username is ${user_id} and your password is ${password}. Please keep this information secure.`
//         };

//         await auth.sendMail(mailOptions);

//         // Save user credentials
//         const user = new User({
//             email,
//             user: user_id,
//             password: hashedPassword
//         });
//         await user.save();

//         res.send("Registration successful");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err.message); // Send error response
//     }
// });

// // Function to generate a unique user ID
// async function generateUserId() {
//     while (true) {
//         const randomDigits = Math.floor(1000 + Math.random() * 9000);
//         const userId = `ph${randomDigits}`;
//         // Check if userId already exists
//         const existingUser = await User.findOne({ user: userId });
//         if (!existingUser) {
//             return userId; // Return unique userId
//         }
//     }
// }



 //this is for the login
//  route.post('/login',async(req,res)=>{
//     const {user,password}=req.body;
//   const user1=User.findOne({user});

//   const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, salt);
//   if (user1.password==hashedPassword) {
//     console.log(user1.user);
//     return res.json({'username':user1.user});
//   }else{
//    return res.status(400);
//   }
// });



route.post('/login', async (req, res) => {
    const { user, password } = req.body;
  
    try {
        const user1 = await User.findOne({ user });
  
        if (!user1) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user1.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        return res.status(200).json({ username: user1.user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});



//this is used to find the expire products
route.get('/exppro', async (req, res) => {
    try{
        const today = new Date(); 
        const expiredProducts = await addpro.find({ exp_date: { $lte: today } }, { _id: 1, p_name: 1, exp_date: 1,quantity:1,userid:1 });
        return res.send(expiredProducts)
    }catch(error){
        return res.send(error);
    }

        // if (expiredProducts.length > 0) {
        //     res.status(200).json(expiredProducts);
        // } else {
        //     res.status(404).json({ message: "No expired products found" });
        // }
    
});


//add tablet into the database

route.post('/addtablet',async(req,res)=>{
    try{
const {userid,p_name,p_type,quantity,cost,exp_date,comp_name}=req.body;
// const userid="ph1234";
const newpro=new addpro({
    userid:userid,
    p_name:p_name,
    p_type:p_type,
    quantity:quantity,
    cost:cost,
    exp_date:exp_date,
    comp_name:comp_name
});
addpro.findOne({userid :userid , p_name : p_name }).then(async(element)=>{    
      if (element != null){
          element.quantity += quantity
          element.cost = cost
          res.status(200).send("the data has been updated");
          return element.save()
        
      }

     else {

        await newpro.save();
        console.log("the new tablet has been successfully added");
        res.status(200).json({message:"tablet added successfully"})

}})
    }

catch {
    res.status(400).json({message:"error"})
}
});



route.delete('/exppro/:p_name', async (req, res) => {
    const { p_name } = req.params;

    try {
        // Assuming 'userid' is a unique identifier field in your 'addpro' collection
        const deletedProduct = await addpro.findOneAndDelete({ p_name: p_name });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Expired product not found' });
        }

        
        return res.json({ message: 'Expired product deleted successfully' });
    } catch (error) {
        console.error('Error deleting expired product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


route.get('/allproducts',async(req,res)=>{
const products=await addpro.find();
if(products==undefined){
    res.send({message:"this was not the correct one "})
}
res.json(products)
});




route.put('/allproducts/:p_name', async (req, res) => {
    const { p_name } = req.params;

    try {
        const product = await addpro.findOne({ p_name: p_name });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.quantity > 0) {
            product.quantity = product.quantity - 1;
            await product.save(); // Save the updated product document
        } else {
            return res.status(400).json({ message: 'No more stock available' });
        }

        return res.status(200).json({ message: 'Product quantity updated successfully' });
    } catch (error) {
        console.error('Error updating product quantity:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});



module.exports=route;




   