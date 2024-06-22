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
    await Account.create({
        userid:userid,
        balance: 1 + Math.random() * 10000
    })
    const token=jwt.sign({userid},JWT_secret)
    res.json({
        token:token,
        message:'user created successfully'

    })
})
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
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
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
router.post('/signin',authmiddleware,async(req,res)=>{



    
    
})

module.exports=router;