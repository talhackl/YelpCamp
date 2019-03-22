var express                     =                   require("express"),
    app                         =                   express(),
    bodyParser                  =                   require("body-parser"),
    mongoose                    =                   require("mongoose"),
    passport                    =                   require("passport"),
    passportLocal               =                   require("passport-local"),
    passportLocalMongoose       =                   require("passport-local-mongoose"),
    methodOverride              =                   require("method-override"),
    flashMessage                =                   require("connect-flash"),
    expressSession              =                   require("express-session"),
    campground                  =                   require("./models/campground.js"),
    comment                     =                   require("./models/comment"),
    User                        =                   require("./models/user"),
    seedDb                      =                   require("./seed");
    // slider                      =                   require("startbootstrap-full-slider");


//Seed DataBase
//seedDb();

//========================
//GENERAL CONFIGURATION
//========================
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(methodOverride("_method"));
app.use(flashMessage());


//=======================
//PASPORT CONFIGURATION
//=======================
app.use(expressSession({
    secret:"my name is eLvisH",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Sending CurrentUser from Every Route
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

//============================
//Requiring Routes
//============================
var camproute           =   require("./routes/campgrounds.js"),
    commentroute        =   require("./routes/comments.js"),
    indexroute          =   require("./routes/index.js");

app.use("/campgrounds",camproute);
app.use("/campgrounds",commentroute);
app.use(indexroute);


//===============
//Listening
//===============
app.listen(3000,function(){
    console.log("Yelp Camp Server Has Started");
});

