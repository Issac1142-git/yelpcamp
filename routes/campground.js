const express = require("express");
const router = express.Router();
const Campgrounds = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");
router.get("/", function(req, res){
    console.log(req.user);
    Campgrounds.find({}, function(err, allcampgrounds){
        if(!err){
            res.render("campgrounds", {campgrounds: allcampgrounds});
        }else{
            console.log(err);
        }
    })


})

router.post("/", function(req, res){
    
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampgrounds = {name: name, price: price, image: image, description: description, author: author};
    Campgrounds.create(newCampgrounds, function(err, campground){
        if(!err){
            res.redirect("/campgrounds");
        }else{
            console.log(err);
        }
    })
})

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("new");
})

router.get("/:id", function(req, res){
    Campgrounds.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(!err){
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }else{
            console.log(err);
        }
    })
})

//edit campground

router.get("/:id/edit", middleware.checkAuthorization, function(req, res){
    Campgrounds.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("back")
        }else{
            res.render("editCampground", {campground: foundCampground})
        }
    })
})


// update a campground with put request

router.put("/:id", middleware.checkAuthorization, function(req, res){
    var updatedCampground = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    };
    Campgrounds.findByIdAndUpdate(req.params.id, updatedCampground, function(err, updatedCampground){
        if(!err){
            res.redirect("/campgrounds")
        }
    } )
})

//delete campgrounds route

router.delete("/:id", middleware.checkAuthorization, function(req, res) {
        Campgrounds.findByIdAndRemove(req.params.id, function(err) {
            if (!err) {
                res.redirect("/campgrounds");
                
            }else{
                res.redirect("/campgrounds")
            }
        })
    })





module.exports = router;