var express = require('express');
var router = express.Router();

const ZERO = 0;
const ONE = 1;
const TWO = 2;

var db = require('../api/sqlConnection');

/* GET */
router.get('/', function(req, res) {

    var deviceNum = req.query.deviceNum;
    var temperature = req.query.temperature;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var timestamp = getCurrentTime();

    db.insertIntoTable(deviceNum, temperature, latitude, longitude, timestamp, 60);

    res.render('collect', { title: 'Temperature data'});
});


/**
 * The aim of this function is to get the current date time.
 * This function uses the Date.toLocaleString() function to achieve the localisation.
 *
 * @returns {*} the current timestamp string.
 */
function getCurrentTime() {
    var str;

    var dateObj = new Date();

    var localeString = dateObj.toLocaleString('en-GB');

    var strArray = localeString.split(',');

    var dateArray = strArray[ZERO].split('/');

    str = dateArray[TWO] + "-";
    str += dateArray[ONE];
    str += "-";
    str += dateArray[ZERO];
    str += strArray[ONE];


    console.log(str); //to debug the date time stuff.

    return str;

}



module.exports = router;
