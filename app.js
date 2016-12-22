//modules
var express = require('express');
const  	app 		= express(),
		bodyParser  = require('body-parser'),
		port        = process.env.PORT || 8080,
		mongoose	   = require('mongoose'),
		session     = require('express-session');

//middleware (files in app/services)=============================
// tell express where to look for static assets
app.use(express.static('/public'));

app.use(session({
  secret: process.env.SECRET || "secret", 
  cookie: { maxAge: 60000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));

// set the routes 
app.use(require('./app/routes'));

//get json content from client
app.use(bodyParser.json());
//=========================================================




// connect to database
mongoose.connect("mongodb://localhost:27017/TestDB", function (err, db) {
    if (!err) {
        console.log("we are connected to mongo");
    }
})


// start our server ===========================
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});


