/* routes/pagination.js */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;
const express = require('express');
const router = express.Router();

router.post('/', function(req, res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    const skips = req.body.page * req.body.pageSize;
    dbo.collection("posts").find({}).sort({date: -1, time: -1}).skip(skips).limit(req.body.pageSize).toArray(function(err, result) {
      if (err) throw err;
      db.close().then(getPost(result));
    });
  });

  function getPost(postList){
    res.json({postList:postList});
  }
  
});

module.exports = router;