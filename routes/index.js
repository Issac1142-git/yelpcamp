const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../models/user")


router.get("/", function(req, res){
    res.render("landing");
})


// authentication routes

//login form
router.get("/login", function(req, res){
    res.render("login");
});

//handling login route
router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login", failureFlash: true}),
 function(req, res){
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}


//getting signup form
router.get("/register", function(req, res){
    res.render("register");
});

//adding logic to signup form
router.post("/register", function(req, res){
    User.register({
        username: req.body.username,
        }, req.body.password,
         function(err, user){
        if(err){
            console.log(err);
            req.flash("error", "User which you given already Exists!")
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "welcome to yelpcamp " + user.username)
            res.redirect("/campgrounds")
        })
    })
})

//logout routes

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "successfully loggedout")
    res.redirect("/campgrounds")
})


module.exports = router;