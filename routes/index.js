/*routes/index.js*/
const express = require('express');
const router = express.Router();
const config = require('./config');

router.get('/', (req, res) => {
  res.render('index',{blogTitle:config.blogTitle});
});

module.exports = router;