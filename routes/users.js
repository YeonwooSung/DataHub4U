const express = require('express');
const router = express.Router();

const conn = require('../api/sqlConnection');

const FAILED_STATUS = 500;
const FAILED = 'Log in failed.. Please do the log in process again!';

/* GET users listing. */
router.get('/', function(req, res) {
    let id = req.query.id;

    if (id === null || id === undefined) {
        res.status(FAILED_STATUS).send(FAILED);
    } else {
        conn.getDeviceNumbers(id, res);
    }
});


/* POST (AJAX) */
router.post('/', function (req, res) {
    let index = req.params.index;
    let deviceNum = req.params.deviceNum; //the device number of the target device
    let deviceName = req.params.deviceName; //the new device name
});

module.exports = router;
