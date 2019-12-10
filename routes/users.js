const express = require('express');
const router = express.Router();
const auth = require('../controller/userControl');
const user = require('../controller/userController');
const verified = require('../middleware/token');

router.post('/signup', auth.userRegister);

// router.post('/login', auth.userLogin)

router.get('/all', auth.userDisplay);

router.post('/login', (req, res) => {
  user.login(req, res);
});

router.post('/logout', (req, res) => {
  user.logout(req, res);
});


router.get('/alt', (req, res, next) => {
  res.status(200).json({
    mes: "special page"
  });
});


module.exports = router;
