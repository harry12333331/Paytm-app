const mongoose=require("mongoose");
mongoose.connect('')
const userSchema=mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String

})
const User = mongoose.model("user",userSchema)
const accountSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('account', accountSchema);

module.exports = {
	Account,User
};



