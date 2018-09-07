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

/* GET DataHubU-1 image */
router.get('/images/DataHub4U-1.png', (req, res) => {
    res.sendFile(__dirname + '/public/images/DataHub4U-1.png');
});

/* GET curly_logo.png image */
router.get('/images/curly_logo.png', (req, res) => {
    res.sendFile(__dirname + '/public/images/curly_logo.png');
});

/* GET main_logo.png */
router.get('/images/main_logo.png', (req, res) => {
    res.sendFile(__dirname + '/public/images/main_logo.png');
});

/* GET sub_logo.png */
router.get('/images/sub_logo.png', (req, res) => {
    res.sendFile(__dirname + '/public/images/sub_logo.png');
});

/* GET stylesheet for the user page */
router.get('/stylesheets/userPage.css', (req, res) => {
    res.sendFile(__dirname + '/public/stylesheets/userPage.css');
});

/* GET stylesheet for the data page */
router.get('/stylesheets/dataPage.css', (req, res) => {
    res.sendFile(__dirname + '/public/stylesheets/dataPage.css');
});

/* GET stylesheet for the purchase page */
router.get('/stylesheets/purchasePage.css', (req, res) => {
    res.sendFile(__dirname + '/public/stylesheets/purchasePage.css');
});

/* GET javascript file "jquery.min.js" */
router.get('/javascripts/jquery.min.js', (req, res) => {
    res.sendFile(__dirname + '/public/javascripts/jquery.min.js');
});

/* GET javascript file "moment.min.js" */
router.get('/javascripts/moment.min.js', (req, res) => {
    res.sendFile(__dirname + '/public/javascripts/moment.min.js');
});

/* GET javascript file "userPage.js" */
router.get('/javascripts/userPage.js', (req, res) => {
    res.sendFile(__dirname + '/public/javascripts/userPage.js');
});

/* GET javascript file "registerPage.js" */
router.get('/javascripts/registerPage.js', (req, res) => {
    res.sendFile(__dirname + '/public/javascripts/registerPage.js');
});

module.exports = router;
