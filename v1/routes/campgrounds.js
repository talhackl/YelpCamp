var express         =       require("express"),
    router          =       express.Router(),
    campground      =       require("../models/campground"),
    middleware      =       require("../middlewares/index");




            //INDEX
//DISPLAY ALL THE CAMPGROUNDS FROM DB
router.get("/",function(req,res){
    campground.find({},function(err,campgrounds){
        if(err){
            console.log("ERROR IN FINDING CAMPGROUNDS");
        }
        else{
            // console.log(req.user);
            res.render("campgrounds/Index",{campgrounds:campgrounds});
        }
    });
    
});

            //CREATE
//CREATE A NEW CAMPGROUND AND ADD IN DB
router.post("/",middleware.isLogIn,function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newcampground={name:name,image:image,description:description,author:author};
    campground.create(newcampground,function(err,newcampground){
        if(err){
            console.log("ERROR IN INSERTING");
        }
        else{
            res.redirect("/campgrounds");
            }
        }
    );
});


            //NEW
//GO TO THE NEW CAMPGROUND PAGE
router.get("/new",middleware.isLogIn,function(req,res){
    res.render("campgrounds/newcampground");
});

            //Show Route
router.get("/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err)
            console.log(err);
        else{
            //console.log(foundcampground+"");
            res.render("campgrounds/show",{Campground:foundcampground});
        }
    });
});

            //Edit Route
//GO TO THE EDIT CAMPGROUND PAGE
router.get("/:id/edit",middleware.checkcampgroundownership,function(req,res){
    campground.findById(req.params.id,function(err,foundcampground){
        res.render("campgrounds/edit",{campground:foundcampground});
    });
});

            //Update Route
router.put("/:id",middleware.checkcampgroundownership,function(req,res){
    var reqcampground={
        name:req.body.name,
        image:req.body.image,
        description:req.body.description
    };
    campground.findByIdAndUpdate(req.params.id,reqcampground,function(err,updatedcampground){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
            //DESTROY
router.delete("/:id",middleware.checkcampgroundownership,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/campgrounds");
    })
});




module.exports=router;