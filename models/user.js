const mongoose = require("mongoose")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
 
//add a user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//plugin lpassportlocalmongoose into userschema
userSchema.plugin(passportLocalMongoose);


module.exports =  mongoose.model("user", userSchema);
