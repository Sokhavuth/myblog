const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;

router.post('/', function(req, res, next) {
  MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { content: { $regex: req.body.query } };
    
    dbo.collection("posts").find(query).sort({date: -1}).limit(30).toArray(function(err, result){
      if (err) throw err;
      req.postList = result;
      db.close().then(getPost(result));
    });
  });

  function getPost(postList){
    res.render("search", { postList:postList, blogTitle:config.blogTitle });
  };

});

module.exports = router;