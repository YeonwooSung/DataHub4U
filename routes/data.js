var express = require('express');
var router = express.Router();

var conn = require('../api/sqlConnection');

/* GET data page */
router.get('/', function(req, res) {
    var deviceNum = req.query.deviceNum; //The device number of the target device.

    var data = conn.getData(deviceNum);

    res.render('data', { title: 'data analysis' });
});

module.exports = router;
