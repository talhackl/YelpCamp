var mongoose        =       require("mongoose"),
    Campground      =       require("./models/campground"),
    Comment         =       require("./models/comment");

var data=[
    {
        name:"Night Forest Camp",
        image:"https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7ca353cfcc4299e6c3d431ff862e1cf&auto=format&fit=crop&w=500&q=60",
        description:"A summer camp or sleepaway camp is a supervised program for children or teenagers conducted during the summer months in some countries. Children and adolescents who attend summer camp are known as campers. Summer school is usually a required academic curriculum for a student to make up work not accomplished during the academic year, whereas summer camps can include academic work, but is not a requirement for graduation The traditional view of a summer camp as a woody place with hiking, canoeing, and campfires is changing, with greater acceptance of newer types summer camps that offer a wide variety of specialized activities. For example, there are camps for the performing arts, music, magic, computer programming, language learning, mathematics, children with special needs, and weight loss. In 2006, the American Camp Association reported that 75 percent of camps added new programs. This is largely to counter a trend in decreasing enrollment in summer camps, which some argue to have been brought about by smaller family sizes and the growth in supplemental educational programs. There are also religiously affiliated summer camps, such as those run by Christian groups and various denominations of Judaism The primary purpose of many camps is educational, athletic, or cultural development. A summer camp environment may allow children to learn new skills in a safe and nurturing environment."
    },
    {
        name:"Camping From FarAway",
        image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=500&q=60",
        description:"A summer camp or sleepaway camp is a supervised program for children or teenagers conducted during the summer months in some countries. Children and adolescents who attend summer camp are known as campers. Summer school is usually a required academic curriculum for a student to make up work not accomplished during the academic year, whereas summer camps can include academic work, but is not a requirement for graduation The traditional view of a summer camp as a woody place with hiking, canoeing, and campfires is changing, with greater acceptance of newer types summer camps that offer a wide variety of specialized activities. For example, there are camps for the performing arts, music, magic, computer programming, language learning, mathematics, children with special needs, and weight loss. In 2006, the American Camp Association reported that 75 percent of camps added new programs. This is largely to counter a trend in decreasing enrollment in summer camps, which some argue to have been brought about by smaller family sizes and the growth in supplemental educational programs. There are also religiously affiliated summer camps, such as those run by Christian groups and various denominations of Judaism The primary purpose of many camps is educational, athletic, or cultural development. A summer camp environment may allow children to learn new skills in a safe and nurturing environment."
    },
    {
        name:"River Site Camp",
        image:"https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3e3ff1cce6d43ff22a50a83269f07ac&auto=format&fit=crop&w=500&q=60",
        description:"A summer camp or sleepaway camp is a supervised program for children or teenagers conducted during the summer months in some countries. Children and adolescents who attend summer camp are known as campers. Summer school is usually a required academic curriculum for a student to make up work not accomplished during the academic year, whereas summer camps can include academic work, but is not a requirement for graduation The traditional view of a summer camp as a woody place with hiking, canoeing, and campfires is changing, with greater acceptance of newer types summer camps that offer a wide variety of specialized activities. For example, there are camps for the performing arts, music, magic, computer programming, language learning, mathematics, children with special needs, and weight loss. In 2006, the American Camp Association reported that 75 percent of camps added new programs. This is largely to counter a trend in decreasing enrollment in summer camps, which some argue to have been brought about by smaller family sizes and the growth in supplemental educational programs. There are also religiously affiliated summer camps, such as those run by Christian groups and various denominations of Judaism The primary purpose of many camps is educational, athletic, or cultural development. A summer camp environment may allow children to learn new skills in a safe and nurturing environment."
    }
];




function seedDb(){
    Campground.remove({},function(err){
        // if(err){
        //     console.log("Error In Removing");
        // }
        // else{
        //     Comment.remove({},function(err,comm){
        //        if(err){
        //            console.log("Comment Not Removed");
        //        }else{
        //            console.log("Comments Removed");
        //        }
        //     });
        //     console.log("campgrounds Removed");
        //     //Add New Campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed,function(err,campground){
        //             if(err){
        //                 console.log(err);
        //             }
        //             else{
        //                 console.log("campground Added");
        //                 //Add Comments
        //                 Comment.create(
        //                     {
        //                         text:"Camping Is Just Awsome I Love To Camp With My #ChildHoodians",
        //                         author:"Talha Hafeez"
        //                     },
        //                     function(err,comment){
        //                         if(err){
        //                             console.log(err);
        //                         }
        //                         else{
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             // console.log(comment);
        //                             console.log("Comment Created");
        //                         }
        //                     }
        //                 );
        //             }
        //         })
        //     });
        // }
    });
};
module.exports=seedDb;