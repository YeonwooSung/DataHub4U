var express = require('express');
var router = express.Router();

var db = require('../api/sqlConnection');

/* GET */
router.get('/', function(req, res) {
    var temperature = req.query.temperature;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;

    console.log(temperature);
    console.log(latitude);
    console.log(longitude);

    res.render('collect', { title: 'Temperature data'});
});

module.exports = router;
