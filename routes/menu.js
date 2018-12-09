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
    // res.send({success:true});

    pool.getConnection(function(err,connection){

        connection.query('select * from Requirements where P_Name=? AND Specification=?', [req.body.program, req.body.spec], function (err, rows) {
            if(err){ connection.release(); }

            console.log(rows);

            if(rows.length == 0) {
                console.log('검색 실패');
                res.json({success:false});
            } else {
                console.log('검색 성공');
                // res.send({success:true});
                res.send({success:true, info:rows[0]});
            }
            connection.release();
        });
    });
});

module.exports = router;
