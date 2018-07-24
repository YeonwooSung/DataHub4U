var express = require('express');
var router = express.Router();

var conn = require('../api/sqlConnection');

/* GET users listing. */
router.get('/', function(req, res) {
    var id = req.query.id;

    var result = conn.getDeviceNumbers(id);

    if (result === null) {
        res.send('Oops! Something goes wrong :(');
    } else {
        var title = id + "'s page";
        res.render('users', {title: title, graphData: result});
    }
});

module.exports = router;
