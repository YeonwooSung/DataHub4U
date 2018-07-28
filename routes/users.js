var express = require('express');
var router = express.Router();

var conn = require('../api/sqlConnection');
var cookie = require('cookie');

/* GET users listing. */
router.get('/', function(req, res) {
    //parse the cookie
    var cookies = {};

    if (req.headers.cookie !== undefined) {
        cookies = cookie.parse(req.headers.cookie);

        var id = cookies.id;

        if (id == null) {
            res.send('Log in failed.. Please do the log in process again!')
        } else {

            var result = conn.getDeviceNumbers(id);

            if (result === null) {
                res.send('Oops! Something goes wrong :(');
            } else {
                var title = id + "'s page";
                res.render('users', {title: title, data: result});
            }

        }

    }
});

module.exports = router;
