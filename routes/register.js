const express = require('express');
const router = express.Router();

//use the sql queries to check if the user is registered.
const sql = require('../api/sqlConnection');

const util = require('../api/util');

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('register', {title: 'Register', alert: undefined});
});

router.post('/', function (req, res) {
    console.log(req.body);
    let { userName, id, password, confirmedP, email, confirmedE } = req.body;

    password = util.encodePassword(password);

    sql.checkIfRegisteredAlready(userName, id, password, res);

    res.status(200);
});

module.exports = router;
