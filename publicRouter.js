const express = require('express');
const router = express.Router();

/* GET temperature image */
router.get('/images/if_temperature_354242.svg', (req, res) => {
    res.sendFile(__dirname + '/public/images/if_temperature_354242.svg');
});

/* GET the humidity image */
router.get('/images/if_weather_44_2682807.png', (req, res) => {
    res.sendFile(__dirname + '/public/images/if_weather_44_2682807.png');
});

/* GET go_back image */
router.get('/images/goBack.svg', (req, res) => {
    res.sendFile(__dirname + '/public/images/goBack.svg');
});

/* GET home image */
router.get('/images/home.svg', (req, res) => {
    res.sendFile(__dirname + '/public/images/home.svg');
});

/* GET stylesheet for the user page */
router.get('/stylesheets/userPage.css', (req, res) => {
    res.sendFile(__dirname + '/public/stylesheets/userPage.css');
});

/* GET stylesheet for the data page */
router.get('/stylesheets/dataPage.css', (req, res) => {
    res.sendFile(__dirname + '/public/stylesheets/dataPage.css');
});

/* GET javascript file "jquery.min.js" */
router.get('/javascripts/jquery.min.js', (req, res) => {
    res.sendFile(__dirname + '/public/javascripts/jquery.min.js');
});

/* GET javascript file "moment.min.js" */
router.get('/javascripts/moment.min.js', (req, res) => {
    res.sendFile(__dirname + '/public/javascripts/moment.min.js');
});

module.exports = router;
