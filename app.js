const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
var session = require('express-session');
const flash = require("connect-flash");
const app = express();
const methodOverride = require("method-override");

const seedDb = require("./seeddb")
const User = require("./models/user");
const Campgrounds = require("./models/campground");
const Comment = require("./models/comment");

const indexRouter = require("./routes/index");
const campgroundRouter = require("./routes/campground");
const commentRouter = require("./routes/comment");
mongoose.connect("/*** add your url ***/", {useNewUrlParser: true, useUnifiedTopology: true});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
// seedDb();

//==================================
//Passport configuration
app.use(session({
    secret: "This is yelpcamp login secret key",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
});




app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRouter);
app.use("/campgrounds", campgroundRouter);
app.use("/campgrounds/:id/comments", commentRouter);


// Routes




app.listen(process.env.PORT, function(){
    console.log("Server Listening!");
})





//Adding New Campgrounds to Database

// Campgrounds.create({
//     name: "Hill",
//     image: "https://bit.ly/3r4TfOf",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, libero!"
// }, function(err, campground){
//     if(!err){
//         console.log(campground);
//     }else{
//         console.log(err);
//     }
// })
// var campgrounds = [
//     {name: "Hill", image: "https://bit.ly/3r4TfOf"},
//     {name: "Forest", image: "https://bit.ly/3pBWw7E"},
//     {name: "Mountain", image:"https://bit.ly/3aeJ9Up"},
//     {name: "Hill", image: "https://bit.ly/3r4TfOf"},
//     {name: "Forest", image: "https://bit.ly/3pBWw7E"},
//     {name: "Mountain", image:"https://bit.ly/3aeJ9Up"},
//     {name: "Hill", image: "https://bit.ly/3r4TfOf"},
//     {name: "Forest", image: "https://bit.ly/3pBWw7E"}
// ];

//fetch campground data from database
