
const mongoose=require("mongoose");
mongoose.connect('')
const user=mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String

})
const User=mongoose.model("User",user)
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

const Account = mongoose.model('Account', accountSchema);

module.exports = {
	Account,User
};



