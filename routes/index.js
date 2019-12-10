var express = require('express');
var router = express.Router();
const auth = require('../controller/userControl');
const verified = require('../middleware/token');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ title: 'Express' });
});


module.exports = router;