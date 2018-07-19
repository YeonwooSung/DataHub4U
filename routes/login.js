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
    //TODO password..?
});

module.exports = router;
