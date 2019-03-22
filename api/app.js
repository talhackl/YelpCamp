var express         =   require("express"),
    mongoose        =   require("mongoose"),
    app             =   express(),
    bodyParse       =   require("body-parser"),
    jQuery          =   require("jquery");

mongoose.connect('mongodb://localhost/api_demo');
app.use(express.static(__dirname+"/views"))
app.use(express.static(__dirname+"/public"));

var method = require('./apicontroller');

//  Here "/users" is the main route for access and the method is the collection of
//  routers/methods/controllers  that will attach according to the request......

app.use('/users/api', method);



//========================
//HOME PAGE
//========================
app.get("/home",function(req,res){
    res.sendFile(__dirname+"/views/home.html");
});








//======================
// INDEX ROUTE
//======================
// app.get("/users",function(req,res){
//     res.sendFile("home");
// });



//=========================
//SERVER IS LISTENING APP
//=========================
app.listen(3000,function(){
    console.log("API Server Started");
});
