var express         =       require("express"),
    router          =       express.Router(),//express.Router({mergeParams:true})
    campground      =       require("../models/campground"),
    comment         =       require("../models/comment"),
    middleware      =       require("../middlewares/index");


            //New Route
 router.get("/:id/comments/new",middleware.isLogIn,function(req,res){
    campground.findById(req.params.id,function(err,foundcampground){
        if(err){
            console.log(err);
        }else{
            //console.log(foundcampground+"");
            res.render("comments/new",{Campground:foundcampground});
        }
    });
});
            
                        //Create Route
router.post("/:id/comments",middleware.isLogIn,function(req,res){
    comment.create({
        text:req.body.text,
    },function(err,comment){
        if(err){
        console.log(err);
        }else{
            campground.findById(req.params.id,function(err,foundcampground){
            if(err){
                res.redirect("/campgrounds");
            }else{
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                foundcampground.comments.push(comment);
                foundcampground.save();
                res.redirect("/campgrounds/"+req.params.id);
            }
            });
        }
    });
});


            //Edit Route
router.get("/:id/comments/:comment_id/edit",middleware.commentauthorizing,function(req,res){
    comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err){
            console.log(err);
        }else{
            // console.log(foundcomment);
            res.render("comments/edit",{Comment:foundcomment,Campground_id:req.params.id});
        }
    });
    
});

            //Update Route
router.put("/:id/comments/:comment_id",middleware.commentauthorizing,function(req,res){
    var incomcomment={
        text:req.body.text
    }
    comment.findByIdAndUpdate(req.params.comment_id,incomcomment,function(err,updatedcomment){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});
            //Destroy Route
router.delete("/:id/comments/:comment_id",middleware.commentauthorizing,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});



module.exports=router;