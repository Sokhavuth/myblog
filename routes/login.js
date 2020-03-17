/*routes/login.js*/
const express = require('express');
const router = express.Router();
const db = require('./config');

router.get('/', (req, res) => {
  res.render('login',{blogTitle:"Login"});
});

module.exports = router;