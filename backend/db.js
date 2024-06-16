import { number } from "zod";

const mongoose=require("mongoose");
mongoose.connect('mongodb+srv://admin:Harliv_1003@cluster0.58gzul4.mongodb.net/')
const user=mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String

})
export const User=mongoose.model('User',user)