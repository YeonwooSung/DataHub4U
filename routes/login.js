var express = require('express');
var router = express.Router();

//import the '../util.js' for the user authentication.
var util = require('../util');

/* GET users listing. */
router.get('/', function(req, res) {
    //TODO
});


router.get('/authenticate', function(req, res) {
    var id = req.query.id;
    var pw = req.query.pw;

    pw = xorDecryption(id, pw);

    var logIn = util.getLogIn(id, pw);

    if (logIn !== null) {
        console.log("Authentication failed!");

        //TODO send the fail message or something else..
    } else {
        //
    }
});


/**
 * The aim of this function is to decrypt the sent encrypted password.
 *
 * @param id the user id
 * @param pw the user password
 */
function xorDecryption(id, pw) {
    var key = '';

    while (key.length < pw.length) {
        key += id;
    }

    var start = 0;
    var end = 3;

    var str;
    var limit = pw.length;

    var value1;
    var value2;
    var index = 0;
    var result = '';

    while (end < limit) {
        str = pw.substring(start, end);
        value1 = parseInt(str);

        value2 = key[index].charCodeAt(0);

        var temp = value1 ^ value2;
        result += String.fromCharCode(temp);
    }

    return result;
}

module.exports = router;
