//include .js files
var data = require('./src/server/database.js');

//
var express = require('express');
var app = express();

//add all linked files in index.html
app.use(express.static('src/admin'));

//send Admin/index.html + all linked files
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/admin/index.html');
});

//listen in port 3000. in heroku.com it should be 'PORT': an enviroment variable.
app.listen(3000, function () {
    console.log('listening on 3000')
})

//testing


