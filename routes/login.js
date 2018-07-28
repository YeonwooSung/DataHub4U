var express = require('express');
var router = express.Router();

//import the '../util.js' for the user authentication.
var util = require('../api/util');

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Log In'});
});

/* GET log in authentication */
router.get('/authenticate', function(req, res) {
    var id = req.query.id;
    var pw = req.query.pw;

    var logIn = util.getLogIn(id, pw);

    if (logIn !== null) {
        console.log("Authentication failed!");

        res.send('Authentication failed!\nPlease re-do the log in!');
    } else {

        if (logIn.authLever >= 1) {
            res.writeHead(200, {
                'Set-Cookie':['id=' + id, 'pw=' + pw, 'Permanent=cookies; Max-Age=${60*60*24*30}'] //max age = 1 month
            });
            //TODO log in finished..
        } else {
            //TODO send the message "wrong password"
        }
    }
});

module.exports = router;
