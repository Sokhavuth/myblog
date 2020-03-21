/*index.js*/
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const postRouter = require('./routes/post');
 
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'dashboard')]);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/',indexRouter);
app.use('/login/',loginRouter);
app.use('/login/dashboard',dashboardRouter);
app.use('/signup', signupRouter);
app.use('/post/:id', postRouter);
 
app.listen(port, () => {
  console.log('The server is running at port '+port);
});