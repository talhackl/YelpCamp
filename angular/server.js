var     express         =   require('express'),
        app             =   express(),                             
        mongoose        =   require('mongoose'),                    
        morgan          =   require('morgan'),             // log requests to the console (express4)
        bodyParser      =   require('body-parser'),    
        methodOverride  =   require('method-override');

//=================
//MONGO CONFIG
//=================
mongoose.connect('mongodb://localhost/angular_js');     // connect to mongoDB database on modulus.io4
var userSchema=mongoose.Schema({
    text:String
});
var Todo=mongoose.model("Todo",userSchema);

//======================
//APP CONFIGURATIONS
//======================
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());




//==============================================
//API ROUTES
//==============================================
app.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});


app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
























    // listen (start app with node server.js) ======================================
    app.listen(3000,function(){
        console.log("Server Created");
    });
