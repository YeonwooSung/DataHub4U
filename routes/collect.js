var express = require('express');
var router = express.Router();

var db = require('../api/sqlConnection');

/* GET */
router.get('/', function(req, res) {
    var temperature = req.query.temperature;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var timestamp = getCurrentTime();

    db.insertIntoTable("a0000000", temperature, latitude, longitude, timestamp, 60); //TODO use the suitable sql table name!!

    res.render('collect', { title: 'Temperature data'});
});


/**
 * The aim of this function is to get the current timestamp (by using the UNIX timestamp).
 * @returns {*} the current timestamp string.
 */
function getCurrentTime() {
    var str;

    var currentTime = new Date();
    var year = currentTime.getYear() + 1900;
    var month = currentTime.getMonth();
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var second = currentTime.getSeconds();

    if (month !== 12) {
        month += 1;
    } else {
        month = 1;
    }

    str = year.toString();
    str += "-";
    str += appendZeroForDateFormat(month);
    str += "-";
    str += appendZeroForDateFormat(day);

    str += " ";

    str += appendZeroForDateFormat(hour);
    str += ":";
    str += appendZeroForDateFormat(minute);
    str += ":";
    str += appendZeroForDateFormat(second);

    console.log(str); //to debug the date time stuff.

    return str;

}


/**
 * This function checks the value of the argument and add 0 in front of the given timestamp element.
 *
 * @param val the timestamp element
 * @returns {*} the string timestamp element
 */
function appendZeroForDateFormat(val) {
    var str;

    if (val < 10) {
        str = "0" + val.toString();
    } else {
        str = val.toString();
    }

    return str;
}

module.exports = router;
