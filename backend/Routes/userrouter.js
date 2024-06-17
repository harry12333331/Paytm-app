const express=require('express')
const router=express.Router();
const zod =require('zod');
const { User } = require('../db');
const JWT_secret = require('../config');
const { authmiddleware } = require('../middlewares');
const signupSchema=zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()

})
router.post('/signup',async (req,res)=>{
    const body =req.body;
    const {success}=signupSchema.safeParse(body)
    if(!success){

        return res.status(411).json({
            message:"email already taken or wrong in puts"
        })
    }
    const existinguser= await User.findOne({
        username:body.username
    })
    if(existinguser){
        return res.status(411).json({
            message:"User already exists"
        })
    }
    const user = await User.createOne({
        username:body.username,
        password:body.password,
        lastname:body.lastname,
        firstname:body.firstname
    })
    const userid=user._id
    const token=jwt.sign({userid},JWT_secret)
    res.json({
        token:token,
        message:'user created successfully'

    })
})
router.post('/signin',authmiddleware,(req,res)=>{
    
    
})

module.exports=router;