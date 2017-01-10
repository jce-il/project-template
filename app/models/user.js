var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var UserSchema = new mongoose.Schema({

    userName : String,
    password : String
});

module.exports = UserSchema;