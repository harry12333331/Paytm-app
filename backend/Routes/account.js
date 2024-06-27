const express= require("express");
const mongoose=require("mongoose");
const { authmiddleware } = require("../middlewares");
const router= express.Router();
const { Account } = require('../db');
module.exports=router;
router.get("/balance",authmiddleware,async(req,res)=>{
    const account= await Account.findOne({userid:req.userid})
    res.json({
        balance: account.balance
    })
})
router.post("/transfer", authmiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userid: req.userid }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userid: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userid: req.userid }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userid: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});