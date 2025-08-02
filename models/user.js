const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }
})

userSchema.plugin(passportLocalMongoose);//By defalult include username,password & salting
module.exports = mongoose.model("user",userSchema);