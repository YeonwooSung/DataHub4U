const express = require('express');
const router = express.Router();

/* GET temperature image */
router.get('/images/if_temperature_354242.svg', function(req, res) {
    res.sendFile(__dirname + '/public/images/if_temperature_354242.svg');
});

/* GET stylesheet for the user page */
router.get('/stylesheets/userPage.css', function (req, res) {
    res.sendFile(__dirname + '/public/stylesheets/userPage.css');
});

module.exports = router;
