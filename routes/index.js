/*routes/index.js*/
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index',{blogTitle:"Blog Engine Title"});
});

module.exports = router;