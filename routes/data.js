var express = require('express');
var router = express.Router();

/* GET data page */
router.get('/', function(req, res) {
    console.log("hi");
    res.render('data', { title: 'Data Thing' });
});

/* GET data analysis page */
router.get('/analysis', function (req, res) {
    console.log("hi!!");
    res.render('data', { title: 'Analysis' });
});

module.exports = router;
