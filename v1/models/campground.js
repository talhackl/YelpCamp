var mongoose=require("mongoose");
// var comment= require("./comment");

//SCHEMA OF MONGODB FOR YELP CAMP
var campgroundschema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});


//MODEL OF YELP CAMP SCHEMA
var campground=mongoose.model("Campground",campgroundschema);

module.exports=campground;
