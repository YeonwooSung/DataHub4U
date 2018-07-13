var express = require('express');
var router = express.Router();

var db = require('../api/sqlConnection');

/* GET */
router.get('/', function(req, res) {
    var temperature = req.query.temperature;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;

    console.log("\ntemperature: " + temperature);
    console.log("latitude: " + latitude);
    console.log("longitude: " + longitude);

    db.insertIntoTable("table", temperature, latitude, longitude); //TODO use the suitable sql table name!!

    res.render('collect', { title: 'Temperature data'});
});

module.exports = router;
