var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    req.session.destroy();
    res.render('login.html');
});

module.exports = router;
