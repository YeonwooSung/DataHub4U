const express = require('express');
const router = express.Router();

const conn = require('../api/sqlConnection');

/* GET data page */
router.get('/', (req, res) => {
    let user = req.query.user; //The user name.
    let deviceNum = req.query.deviceNum; //The device number of the target device.

    conn.getData(user, deviceNum, res);
});

/* GET weekly data (AJAX) */
router.get('/week', (req, res) => {
    let deviceNum = req.query.deviceNum;

    conn.getWeekData(deviceNum, res);
});

/* GET monthly data (AJAX) */
router.get('/month', (req, res) => {
    let deviceNum = req.query.deviceNum;

    conn.getMonthData(deviceNum, res);
});

/* GET the data in the range of custom date (AJAX) */
router.get('/custom', (req, res) => {
    let startDate = req.query.start;
    let endDate = req.query.end;
    let deviceNum = req.query.deviceNum;

    conn.getCustomRangeData(startDate, endDate, deviceNum, res);
});

module.exports = router;
