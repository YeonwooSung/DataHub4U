var express = require('express');
var router = express.Router();

var db = require('../api/sqlConnection');

/* GET */
router.get('/', function(req, res) {

    var deviceNum = req.query.deviceNum;
    var temperature = req.query.temperature;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var timestamp = getTheCurrentLocaleTimeString();

    db.insertIntoTable(deviceNum, temperature, latitude, longitude, timestamp, 60);

    res.render('collect', { title: 'Temperature data'});
});


/**
 * The aim of this function is to get the current date time.
 * This function uses the Date.toLocaleString() function to achieve the localisation.
 *
 * @returns {*} the current timestamp string.
 */
function getTheCurrentLocaleTimeString() {
    var str;

    var dateObj = new Date();

    var localeString = dateObj.toLocaleString('en-GB');

    var strArray = localeString.split(',');

    var dateArray = strArray[0].split('/');

    console.log('dateArray: ' + dateArray);

    str = dateArray[2] + "-";
    str += dateArray[0];
    str += "-";
    str += dateArray[1];
    str += strArray[1];


    console.log(str); //to debug the date time stuff.

    return str;

}



module.exports = router;
