var express = require('express');
var router = express.Router();

//import the '../util.js' for the user authentication.
var util = require('../api/util');

//import the '../api/authentication.js' to  decrypt the encrypted password.
var authentication = require('../api/authenticationPassport');

/* GET users listing. */
router.get('/', function(req, res) {
    var id = req.query.id;
    var pw = req.query.pw;
});

module.exports = router;
