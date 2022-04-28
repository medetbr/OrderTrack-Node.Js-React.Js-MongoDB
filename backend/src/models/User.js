const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username : {type:String,unique:true,required:true},
    email: {type:String,unique:true,required:true},
    password : {type:String,required:true,min:6},
    customer : {type:Boolean,default:true},
    profile_image: String,
}, { timestamps: true })

const User = mongoose.model("User",userSchema);

module.exports = User;