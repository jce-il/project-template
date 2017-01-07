var express = require('express');
//var router = express.Router();
//var config=require('../configFile.json');

var mongoose = require ('mongoose');
//var db=mongoose.createConnection(config.connectionString);

var userSchema = require('../models/user');
var User = db.model('User',userSchema);

// functions for each different server calls.

// function signUp(req, res) {

//     var user = req.body;
//     var newUser = new User({userName:user.userName, password:user.password});

//     User.count({ userName: user.userName }, function (err, count) {
//         if (count > 0) {
//             res.json({ success: false, msg: "שם משתמש קיים ", user: user });
//         }
//         else
//         {
//             newUser.save();
//             req.session.user = newUser;
//             res.json({ success: true, msg: "ברוך הבא משתמש רשום חדש", user: user });

//         }

//     });
// }

function signIn(req, res) {
    
        var existUser = new User(req.body);

        console.log("In sign in :",existUser);

        if(req.session.user != null)
        {
            res.json({ in: false, msg: "הנך מחובר! התנתק לפני התחברות חוזרת", user: null });
        }
        else
        {
            User.findOne({  userName: existUser.userName}, function (err, user) {
                if (user) {

                    if(user.password != existUser.password)
                    {
                        res.json({ in: false, msg: "הסיסמא שהכנסת שגויה", user: user });
                    }
                    else
                    {
                        req.session.user = user;
                        res.json({ in: true, msg: "התחברת בהצלחה", user: user });
                    }

                }
                else {
                    res.json({ in: false, msg: "משתמש אינו קיים ", user: user });

                }
            });
        }
}

function signOut(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.json({out: true});
        }
    });

}

function getSessionInfo(req, res) {         //check if user is logged in or not?
    console.log(req.session.user);
    if(req.session.user == null)
    {
        console.log("no session");
        res.json({signed : false, session : null});
    }
    else
    {
        console.log("yes session");
        res.json({signed: true, session: req.session });
    }

}


//module.exports = router;
