const express=require("express")
const router= express.Router();
const userrouter= require("./userrouter")
router.use("/user",userrouter)
module.exports=router;

