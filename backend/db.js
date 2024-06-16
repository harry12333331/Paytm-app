import { number } from "zod";

const mongoose=require("mongoose");
mongoose.connect('')
const user=mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String

})
export const User=mongoose.model('User',user)