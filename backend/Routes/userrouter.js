const express=require('express')
const router=express.Router();
const cors = require("cors")
const zod =require('zod');
const { User,Account } = require('../db');
const JWT_secret = require('../config');
const jwt=require("jsonwebtoken")
const { authmiddleware } = require('../middlewares');
const signupSchema=zod.object({
    username:zod.string(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()

})
router.post('/signup',async (req,res)=>{
    const body =req.body;

    /*if (!parsed.success) {
        // If validation fails, return detailed errors
        return res.status(400).json({
            message: "Validation failed",
            errors: parsed.error.issues
        });}*/
    const {success}=signupSchema.safeParse(body)
    if(!success){

        return res.status(400).json({
            message:"email already taken or wrong in puts"
        })}
    const existinguser= await User.findOne({
        username:body.username
    })
    if(existinguser){
        return res.status(409).json({
            message:"User already exists"
        })
    }
    const user = await User.create({
        username:body.username,
        password:body.password,
        lastname:body.lastname,
        firstname:body.firstname
    })
    const userId=user._id
    await Account.create({
        userid:userId,
        balance: 1 + Math.random() * 10000
    })

    const token=jwt.sign({userId},JWT_secret)
    res.json({
        token:token,
        message:'user created successfully'

    })
})
const updateBody = zod.object({
	password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})
router.put('/',authmiddleware,async(req,res)=>{
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    
    await User.updateOne({ _id: req.userid },req.body)
    res.json({
        message:"update success"
    })

    
})
router.get("/bulk",async (req,res)=>{
    const filter= req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstname: {
                $regex: filter,
                $options:'i'
            }
        }, {
            lastname: {

                $regex: filter,
                $options:'i'
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

const signinSchema = zod.object({
    username:zod.string(),
    password:zod.string()
})


router.post('/signin', async function(req,res){
    const body = req.body;
    const {success} = signinSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            msg:"invalid inputs",
        })
    }
    const user = await User.findOne({
        username:body.username,
        password:body.password
    })
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_secret)
        res.json({
            token:token
        })
        return;
        }
    res.status(411).json({
        msg:"Error while logging in"
    })
})


module.exports=router;