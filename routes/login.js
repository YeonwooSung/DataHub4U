var express = require('express');
var router = express.Router();

//import the '../util.js' for the user authentication.
var util = require('../util');

//import the '../api/authentication.js' to  decrypt the encrypted password.
var authentication = require('../api/authenticationSupport');

/* GET users listing. */
router.get('/', function(req, res) {
    //TODO
});

/* GET log in authentication */
router.get('/authenticate', function(req, res) {
    var id = req.query.id;
    var pw = req.query.pw;

    pw = authentication.xorDecryption(id, pw);

    var logIn = util.getLogIn(id, pw);

    if (logIn !== null) {
        console.log("Authentication failed!");

        //TODO send the fail message or something else..
    } else {
        //
    }
});

module.exports = router;
