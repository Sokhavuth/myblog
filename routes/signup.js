/* routes/signup.js */
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = require('./config').mongoDBurl;

router.get('/', (req, res) => {
  res.render('signup');
});
router.post('/',(req,res) => {
  MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");

    var userObj = [
      { username:req.body.username, password:req.body.password, displayName:req.body.displayName, email:req.body.email },
    ];

    dbo.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      if(result.length === 0){
        dbo.collection("users").insertMany(userObj, function(err, result) {
          if (err) throw err;
          console.log("1 user was inserted!");
          db.close().then(res.redirect("/login"));
        });
      }else{
        db.close().then(console.log('No user was addedd.'));
      }
    });
  });
});
 
module.exports = router;