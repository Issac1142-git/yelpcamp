const express = require("express");
const router = express.Router({mergeParams: true});
const Campgrounds = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");




// comment routes

router.get("/new", middleware.isLoggedIn, function(req, res){
    Campgrounds.findById(req.params.id, function(err, campground){
        if(!err){
            res.render("newComment", {campground: campground})
        }else{
            console.log(err)
        }
    })
})

router.post("/", middleware.isLoggedIn, function(req, res){
    
    Campgrounds.findById(req.params.id, function(err, campground){
        console.log(req.user);
        if(!err){
            Comment.create(req.body.comment, function(err, comment){
                if(!err){
                    comment.author.id = req.user._id;
                    comment.author.username = (req.user.username).charAt(0).toUpperCase() + (req.user.username).slice(1);
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

//edit comment routes

router.get("/:comment_id/edit", middleware.commentAuthorization, function(req, res){
Comment.findById(req.params.comment_id, function(err, foundComment){
    if(!err){
        res.render("editComment", {comment: foundComment, campground_id: req.params.id});
    }
})
})

//update comment routes
router.put("/:comment_id", middleware.commentAuthorization, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(!err){
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//delete a comment

router.delete("/:comment_id", middleware.commentAuthorization, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})



module.exports = router;