const Campgrounds = require("./models/campground");
const Comment = require("./models/comment");

var data = [
    {name: "Hill", image: "https://images.unsplash.com/photo-1466940219795-c670f475e59f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aGlsbHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe libero quae dolor unde aliquid cum quis illum deserunt id ipsam?"},
    {name: "thunderstorm", image:"https://images.unsplash.com/photo-1561485132-59468cd0b553?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dGh1bmRlcnN0b3JtfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe libero quae dolor unde aliquid cum quis illum deserunt id ipsam?"},
    {name: "fog", image:"https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe libero quae dolor unde aliquid cum quis illum deserunt id ipsam?"}
  ]

  
// Initial database seeding
  function seedDb(){
      Campgrounds.remove({}, function(err){
    //     if(err){
    //     console.log(err);
    //     }else{
    //     data.forEach(function(seed){
    //     Campgrounds.create(seed, function(err, campground){
    //       if(!err){
    //         console.log("Data added to Campgrounds");
    //         Comment.create({
    //           text: "Issac Learning Web Development",
    //           author: "Issac"
    //         }, function(err, comment){
    //           if(!err){
    //             campground.comments.push(comment);
    //             campground.save(function(err, comment){
    //               if(!err){
    //                 console.log(comment);
    //               }
    //             });
    //           }
    //         })
    //       }
    //     })
    //   })

    //     }
      })
    }

    module.exports = seedDb;
