const express = require('express');
const router = express.Router();

//use the sql queries to check if the user is registered.
const sql = require('../api/sqlConnection');

const util = require('../api/util');

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('register', {title: 'Register'});
});

module.exports = router;
