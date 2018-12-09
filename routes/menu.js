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

        connection.query('select * from Requirements where P_Name=? AND Specification=?', [req.body.program, req.body.spec], function (err, rows_p) {
            if(err){ connection.release(); }

            console.log(rows_p);

            if(rows_p.length == 0) {
                console.log('검색 실패');
                res.json({success:false});
                connection.release();
            } else {
                console.log('검색 성공');
                connection.query('select * from CPU where Pspeed >= ? order by C_price asc', rows_p[0].CPU, function (err, rows_c) {
                    if(err) { connection.release(); }

                    var cpuData = JSON.parse(JSON.stringify(rows_c));
                    // console.log(cpuData);
                    var cpuInfo = [];
                    for(var i = 0; i < rows_c.length; i++) {
                        console.log(cpuData[i]);
                        cpuInfo.push(cpuData[i]);
                    }
                    connection.query('select * from GPU where Memory >= ? order by price asc', rows_p[0].GPU, function (err, rows_g) {
                        if(err) { connection.release(); }

                        var gpuData = JSON.parse(JSON.stringify(rows_g));
                        var gpuInfo = [];
                        for(var i = 0; i < rows_g.length; i++) {
                            console.log(gpuData[i]);
                            gpuInfo.push(gpuData[i]);
                        }

                        res.send({success:true, cpu:cpuInfo, gpu:gpuInfo});
                        connection.release();
                    });
                    // res.send({success:true, cpu:cpuInfo});
                    // connection.release();
                });
                // res.send({success:true, info:rows[0]});
                // connection.release();
            }
        });
    });
});

module.exports = router;
