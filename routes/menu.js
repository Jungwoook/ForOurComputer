var express = require('express');
var router = express.Router();
var pool = require('../dbConfig');

router.get('/', function(req, res, next) {

    res.render('menu.html');

    if(req.session.userName != undefined) {
        console.log('로그인했음');
        res.render('menu.html');
    } else {
        console.log("로그인안함");
        res.redirect('/login');
    }
});

router.post('/', function(req, res, next) {

    console.log(req.body);
    res.send({success:true});
});

module.exports = router;
