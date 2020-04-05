/*routes/login.js*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const ifLogedin = require('connect-ensure-login');

const users = require('./users');
const auth = require('./auth');
const posting = require('./posting');
const posts = require('./posts');
const delet = require('./delete');
const edit = require('./edit');
const categorizing = require('./categorizing');
const categories = require('./categories');
const getcategory = require('./getcategory');

router.use('/',function(req,res,next){
  users.getUsers().then(function(result){
    if(result === 'users')
      next();
    else
      res.render('signup');
  });
});

passport.use(new Strategy(
  function(username, password, cb) {
    auth.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});
  
passport.deserializeUser(function(id, cb) {
  auth.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

router.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
  res.render('login',{blogTitle:"Login"});
});

router.post('/',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/login/dashboard');
});

router.get('/dashboard',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    res.render('dashboard', {blogTitle:"Dashboard"});
});

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/posting',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    getcategory(req,res);
});

router.post('/posting',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    posting(req, res).then(function(result){
      res.redirect('/login/posts');
    });
});

router.get('/posts',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    posts(req, res).then(function(result){
      res.render('posts', {postList:result.postList, postNum:result.postNum, blogTitle:"Posts"});
    });
});

router.get('/delete/:id/:type',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    delet(req,res);
});

router.get('/edit/:id/:type',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    edit.get(req,res);
});

router.post('/edit',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    edit.post(req,res);
});

router.get('/categorizing',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    res.render('categorizing', {blogTitle:"Categorizing"});
});

router.post('/categorizing',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    categorizing(req, res).then(function(result){
      res.redirect('/login/categories');
    });
});

router.get('/categories',
  ifLogedin.ensureLoggedIn('/login'),
  function(req, res){
    categories(req, res).then(function(result){
      res.render('categories', {categoryList:result.categoryList, categoryNum:result.categoryNum, blogTitle:"Categories"});
    });
});

module.exports = router;