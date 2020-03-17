/*routes/login.js*/
const express = require('express');
const router = express.Router();
const users = require('./users');

router.use('/',function(req,res,next){
  users.getUsers().then(function(result){
    if(result === 'users')
      next();
    else
      res.render('signup');
  });
});

router.get('/', (req, res) => {
  res.render('login',{blogTitle:"Login"});
});

module.exports = router;