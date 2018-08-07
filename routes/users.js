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

module.exports = router;
