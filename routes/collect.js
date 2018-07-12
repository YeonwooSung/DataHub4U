var express = require('express');
var router = express.Router();

var db = require('../api/sqlConnection');

/* GET */
router.get('/', function(req, res) {
    var temperature = req.query.temperature;

    console.log(temperature);

    res.render('collect', { title: 'Temperature data'});
});

module.exports = router;
