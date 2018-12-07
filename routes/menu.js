var express = require('express');
var router = express.Router();
var pool = require('../dbConfig');

router.get('/', function(req, res, next) {

    res.render('menu.html');
});

router.post('/', function(req, res, next) {

    console.log(req.body);
    res.send({success:true});
});

module.exports = router;
