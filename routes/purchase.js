const express = require('express');
const router = express.Router();

/* GET purchase page */
router.get('/', (req, res) => {
    res.render('purchase');
});

module.exports = router;