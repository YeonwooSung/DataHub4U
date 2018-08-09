var express = require('express');
var router = express.Router();

//use the sql queries to check if the user is registered.
let conn = require('./sqlConnection');

const crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Log In'});
});

/* GET log in authentication */
router.get('/authenticate', function(req, res) {
    let id = req.query.id;
    let pw = req.query.pw;

    pw = crypto.createHash('sha512').update(pw).digest('base64');
});

module.exports = router;
