var express = require('express');
var router = express.Router();
var pool = require('../dbConfig');

router.get('/', function(req, res, next) {
    res.render('signup.html');
});

router.post('/', function(req, res, next) {

    pool.getConnection(function(err,connection){

        connection.query('select * from user where id=?', req.body.id, function (err, rows) {
            if(err){ connection.release(); }

            if(rows.length == 0) {
                connection.query('insert into user value (?,?,?)', [req.body.id, req.body.password, req.body.name], function(err, rows) {
                    if(err) { connection.release(); }
                    console.log('signup success!');
                    res.json({success:true});
                });
            } else {
                console.log('duplicated id');
                res.json({success:false});
            }
            connection.release();
        });
    });
});

module.exports = router;
