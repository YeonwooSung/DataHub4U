var express = require('express');
var router = express.Router();

var db = require('../api/sqlConnection');

/* GET */
router.get('/', function(req, res) {

    let deviceNum = req.query.deviceNum;
    let temperature = req.query.temperature;
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let timestamp = getTheCurrentTimeString();

    db.insertCollectedData(deviceNum, temperature, latitude, longitude, timestamp, 70);

    res.render('collect', { title: 'Temperature data'});
});


/**
 * The aim of this function is to get the current date time.
 * This function uses the Date.toLocaleString() function to achieve the localisation.
 *
 * @returns {*} the current timestamp string.
 */
function getTheCurrentTimeString() {
    let dateObj = new Date();

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();

    let hour = dateObj.getUTCHours();
    let minute = dateObj.getUTCMinutes();
    let second = dateObj.getUTCSeconds();

    var str = `${year}-${month}-${date} ${hour}:${minute}:${second}`;

    return str;

}



module.exports = router;
