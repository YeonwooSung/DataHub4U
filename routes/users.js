const express = require('express');
const router = express.Router();

const conn = require('../api/sqlConnection');
const cookie = require('cookie');

const FAILED_STATUS = 500;
const FAILED = 'Log in failed.. Please do the log in process again!';

/* GET users listing. */
router.get('/', function(req, res) {
    var id = req.query.id;

    if (id === null || id === undefined) {
        res.status(FAILED_STATUS).send(FAILED);
    } else {
        //
    }
});

module.exports = router;
