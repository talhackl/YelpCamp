var express                 =       require("express"),
    app                     =       express(),
    mongoose                =       require("mongoose"),
    bodyParser              =       require("body-parser"),
    passport                =       require("passport"),
    LocalStrategy           =       require("passport-local"),
    passportLocalMongoose   =       require("passport-local-mongoose"),
    User                    =       require("./models/user"),
    expressSession          =       require("express-session");    


app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/auth_demo");

app.set("view engine","ejs");

app.use(passport.initialize());
app.use(passport.session());

app.use(expressSession({
    secret:"my name is eLvisH",
    resave:false,
    saveUninitialized:false
}));

passport.use(new LocalStrategy(User.authenticate()) );
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=========================
//          ROUTES
//=========================

app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",isLogin,function(req,res){
    res.render("secret");
});

//==========================
//Auth Routes
//==========================


app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log("error");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secret");
                console.log(user);
            });
        }
    });
});


//=============
//Login Route
//=============

app.get("/login",function(req,res){
    res.render("login");
}); 

app.post("/login",passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),function(req,res){

});

app.get('/logout',function(req,res){
    req.logout();
    res.redirect("/login");
});


//For preventing Secret page
function isLogin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}




app.listen(3000,function(){
    console.log("AUth Server Starts Now");
})