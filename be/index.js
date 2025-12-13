import express from 'express';
import mongoose,{Schema} from 'mongoose';
import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';

mongoose.connect("mongodb+srv://yshake1004:jatin_4006@cluster0.t90r1.mongodb.net/crop")
const signupSchema = new Schema({
    email:{
        type:email,
        required:true,
        unique:true
        
    },
        
    password:String

})
const Signup = mongoose.model('Signup',signupSchema);


const app = express();
app.use(express.json())
app.post('/signup',async(req,res)=>{
    const {username,password} = req.body;
    await Signup.create({username,password});
    res.json({message:"User signed up successfully"})  
})
app.post("/signin",async(req,res)=>{
    const {username,password} = req.body;
    const user = await Signup.findOne({username,password});
    if(user){
        const token = jwt.sign({username},SECRET_KEY);
        res.json({message:"Signin successful",token});
    } else {
        res.status(401).json({message:"Invalid credentials"});
    }
})
app.listen(3000,()=>{
    console.log("Server started on port 3000");
})