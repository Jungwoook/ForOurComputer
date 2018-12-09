var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    //   res.redirect('/login');
    res.send({name:req.session.userName});
});

module.exports = router;
