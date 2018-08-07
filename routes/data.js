const express = require('express');
const router = express.Router();

const conn = require('../api/sqlConnection');

/* GET data page */
router.get('/', function(req, res) {
    let user = req.query.user; //The user name.
    let deviceNum = req.query.deviceNum; //The device number of the target device.

    conn.getData(user, deviceNum, res);
});

module.exports = router;
