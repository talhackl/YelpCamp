var express         =   require('express'),
    router          =   express.Router(),
    bodyParser      =   require('body-parser'),
    mongoose        =   require('mongoose');


//==========================
//BODY-PARSER CONFIG
//==========================
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//=================
//MONGO CONFIG
//=================
var UserSchema = new mongoose.Schema({  
    name: String,
    email: String,
    phone: String
  });
var User= mongoose.model('User', UserSchema);


//=======================
//API ROUTERS
//=======================


//===================
//CREATER ROUTER
//===================
router.post('/', function (req, res) {
    User.create({
            name  : req.body.name,
            email : req.body.email,
            phone : req.body.password
        }, 
        function (err, user) {
            if (err){
                return res.status(500).send("There was a problem adding the information to the database.");
            } 
            res.status(200).send(user);
            console.log("Created New User");
        });
});


//===================
//INDEX ROUTER
//===================
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err){
            return res.status(500).send("There was a problem finding the users.");
        }
        res.json(users);
        console.log("Sended All Users");
    });
});


//===================
//SHOW ROUTER
//===================
router.get("/:id",function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log(err);
        }
        res.status(200).send(user);
        console.log("Sended Specific User");
    });
});


//===================
//UPDATE ROUTER
//===================
router.put("/:id",function(req,res){
    var newUser={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    };
    User.findByIdAndUpdate(req.params.id,newUser,function(err,foundUser){
        if(err){
            res.status(500).send("NOT FOUND");
        }
            res.status(200).send(foundUser);
            console.log("Updated Successfully");
    });
});


//===================
//DELETE ROUTER
//===================
router.delete("/:id",function(req,res){
    User.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Deleted");
        }
    });
});
module.exports = router;