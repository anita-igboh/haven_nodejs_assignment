const express = require('express');
const router = express.Router();
const blogpage = require('../controller/blogControl')
const verify = require('../middleware/token');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', blogpage.blogEntry);

router.put('/:id', verify, blogpage.blogUpdate);

router.delete('/:id', blogpage.blogDelete);

router.get('/', blogpage.blogDisplay);

router.get('/story/:id',  blogpage.blogDisplayOne);

module.exports = router;
