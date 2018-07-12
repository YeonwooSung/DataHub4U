var express = require('express');
var router = express.Router();

/* GET data page */
router.get('/data', function(req, res, next) {
    res.render('data', { title: 'Data Thing' });
});

module.exports = router;
