var express = require('express');
var router = express.Router();

//use the sql queries to check if the user is registered.
var sqlConnection = require('./sqlConnection'); //TODO to check if the id and password are in the user table

//import the '../api/authentication.js' to  decrypt the encrypted password.
var authentication = require('../api/authenticationPassport');

/* GET users listing. */
router.get('/', function(req, res) {
    var id = req.query.id;
    var pw = req.query.pw;
});

module.exports = router;
