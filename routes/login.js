var express = require('express');
var router = express.Router();
var pool = require('../dbConfig');

router.get('/', function(req, res, next) {

    console.log(req.session);
    if(req.session.userName != undefined) {
        console.log('로그인했음');
        res.redirect('/menu');
    } else {
        console.log("로그인안함");
        res.render('login.html');
    }

});

router.post('/', function(req, res, next) {

    pool.getConnection(function(err,connection){

        connection.query('select * from user where id=? AND password=?', [req.body.id, req.body.password], function (err, rows) {
            if(err){ connection.release(); }

            if(rows.length == 0) {
                console.log('로그인 실패');
                res.json({success:false});
            } else {
                var sess = req.session;
                sess.userID = req.body.id;
                sess.userName = rows[0].name;
                console.log('로그인 성공');
                res.send({success:true});
            }
            connection.release();
        });
    });
});

module.exports = router;
