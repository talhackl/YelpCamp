var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cats");

var catSchema=new mongoose.Schema({
    name:String,
    age:Number,
    temprament:String
});

var Cat=mongoose.model("Cat",catSchema);
// var george=new Cat({
//     name:"Mrs NOrris",
//     age:11,
//     temprament:"Devil"
// });
// george.save(function(err,Cat){
//     if(err){
//         console.log("SomeThing Went Wrong");
//     }
//     else{
//         console.log("It Added To DB Successfully");
//     }
// });

Cat.find({},function(err,cats){
    if(err){
        console.log("Error In finding");
    }
    else{
        console.log(cats);
    }
});

// Cat.create({
//     name:"Garfield",
//     age:5,
//     temprament:"Crazy"
// },function(err,cat){
//     if(err){
//         consol.log("Error in Adding");
//     }
//     else{
//         console.log("Created");
//         console.log(cat);
//     }
// });