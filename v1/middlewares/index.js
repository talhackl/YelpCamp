//All Middleware Functions
var comment         =   require("../models/comment"),
    campground      =   require("../models/campground");


var middlewareObj={};

//===========================
//AUTHENTICATING FUNCTION
//===========================
middlewareObj.isLogIn= function isLogIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First!!");
    res.redirect("/login");
};
  
//======================================
//Comment AUTHORIZATION FUNCTION
//======================================
middlewareObj.commentauthorizing= function commentauthorizing(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,foundcomment){
            if(foundcomment.author.id.equals(req.user._id)){
                next();
            }else{
                res.redirect("back");
            }
        });
    }else{
        res.redirect("back");
    }
    
}

//=======================================
//Campground AUTHORIZATION FUNCTION
//========================================
middlewareObj.checkcampgroundownership= function checkcampgroundownership(req,res,next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id,function(err,foundcampground){
            if(err){
                res.redirect("back");
            }else{
                if(foundcampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("/login");
    }
   
};


module.exports=middlewareObj;