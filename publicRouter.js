const express = require('express');
const router = express.Router();

/* GET temperature image */
router.get('/images/if_temperature_354242.svg', function(req, res) {
    res.sendFile(__dirname + '/public/images/if_temperature_354242.svg');
});

module.exports = router;
