/* routes/post.js */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;
const express = require('express');
const router = express.Router({mergeParams:true});

router.get('/', function(req, res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("pages").find({id: req.params.id}).toArray(function(err, result) {
      if (err) throw err;
      req.pageList = result;
      db.close().then(getPage());
    });
  });

  function getPage(){
    res.render("page", {pageList:req.pageList, blogTitle:config.blogTitle});
  }
});

module.exports = router;