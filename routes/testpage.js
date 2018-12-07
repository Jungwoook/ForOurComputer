var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log(req.session);
    if(req.session.userName != undefined) {
        console.log('로그인했음');
    } else {
        console.log("로그인안함");
    }
    res.render('testpage.html');
});

module.exports = router;
