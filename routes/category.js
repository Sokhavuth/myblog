/*routes/category.js*/
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;
const express = require('express');
const router = express.Router({mergeParams:true});

router.get('/', function(req, res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("posts").find({category: req.params.cat}).sort({date: -1, time: -1}).limit(6).toArray(function(err, result) {
      if (err) throw err;
      req.postList = result;
      db.close().then(getPost());
    });
  });

  function getPost(){
    res.render("category", {postList:req.postList, blogTitle:config.blogTitle});
  }
});

module.exports = router;