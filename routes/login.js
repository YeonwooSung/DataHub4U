const express = require('express');
const router = express.Router();

//use the sql queries to check if the user is registered.
let conn = require('../api/sqlConnection');

let util = require('../api/util');

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Log In'});
});

/* GET log in authentication */
router.get('/authenticate', function(req, res) {
    let id = req.query.id;
    let pw = req.query.pw;

    if ((pw = util.encodePassword(pw)) !== undefined) {
        //
    } else {
        res.status(501).send('password encoding failed');
    }
});

module.exports = router;
