var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var path = require('path');

var cors = require("cors");
var cor = cors();
app.use(cor);
app.use(express.static(path.join(__dirname, "../public")));

var furniture = require('../model/furniture.js');
var user = require('../model/user');

/* routing get /api/user */
app.get('/api/user', function (req, res) {
    user.getUsers(function(err, result){
        if(!err){
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    })
})

// routing post /api/addUser
app.post('/api/user', urlencodeParser, jsonParser, function (req, res){
    var useremail = req.body.useremail;
    var userpassword = req.body.userpassword;
    var name = req.body.name;

    user.addUser(useremail, userpassword, name, function(err, result) {
        if(!err) {
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    })
})

//routing POST deleteUser//
app.delete('/api/user/:userid', function (req, res) {
    var userid = req.params.userid;

    user.deleteUser(userid, function (err, result) {
        if(!err) {
            console.log(result);
            res.send(result.affectedRows + ' record dihapus');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});

//routing POST updateUser//
app.post('/api/user/:userid', urlencodeParser, jsonParser, function (req, res) {
    var userpassword = req.body.userpassword;
    var name = req.body.name;
    var userid = req.params.userid;

    user.updateUser(userpassword, name, userid, function (err,result) {
        if(!err) {
            console.log(result);
            res.send(result.affectedRows + ' record diubah');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});

// routing get /api/catid/furniture
app.get('/api/category/:catid/furniture', function (req, res) {
    var catid = req.params.catid;
    furniture.getFurnitureByCat(catid, function (err, result) {
        if (!err){
            res.send(result);
        }
        else {
            console.log(err);
            res.send(err);
        }
    });
});
module.exports = app
