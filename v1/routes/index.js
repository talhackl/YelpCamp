var express         =       require("express"),
    passport        =       require("passport"),
    router          =       express.Router(),
    User            =       require("../models/user"),
    campground      =       require("../models/campground");


//GET THE HOME PAGE OF WEBSITE
router.get("/",function(req,res){
    campground.find({},function(err,collection){
        if(err){
            console.log(err);
        }else{
            // res.statusCode(200).send(collection);
            res.render("index/landing",{campgrounds:collection});
        }
    });
});

//===============
//Register Routes
//===============

router.get("/register",function(req,res){
    res.render("index/register");
});

router.post("/register",function(req,res){
    var newuser=new User({username:req.body.username});
    User.register(newuser,req.body.password,function(err,user){
        
        if(err){
            console.log(err);
            res.render("index/register");
        }
    });
    passport.authenticate("local"),(req,res,function(){
        console.log("Entered");
        res.redirect("/campgrounds");
    });
});

//============
//LogIn
//============

router.get("/login",function(req,res){
    res.render("index/login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){

});

//============
//LogOut
//============

router.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
});


module.exports=router;