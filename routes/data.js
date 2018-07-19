var express = require('express');
var router = express.Router();

/* GET data page */
router.get('/', function(req, res) {
    res.render('data', { title: 'Data Thing' });
});

module.exports = router;
