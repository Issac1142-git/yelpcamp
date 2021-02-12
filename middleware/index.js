const Comment = require("../models/comment")
const Campgrounds = require("../models/campground")

var middlewareobj ={};

//comment authorization
middlewareobj.commentAuthorization = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found")
                res.redirect("back")
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "you dont have to access or modify this comment")
                    res.redirect("back")
                }
            }
        })
    }else{
        res.redirect("back")
    }
}

//check if logged in or not
middlewareobj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First")
    res.redirect("/login")
}
//Authorize users to prevent campgrounds from unknown user
middlewareobj.checkAuthorization = function(req, res, next){
    if(req.isAuthenticated()){
        Campgrounds.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground Not Found")
                res.redirect("back")
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You dont have to access this campground")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error", "You need to be logged in")
        res.redirect("back")
    }
}
module.exports = middlewareobj;