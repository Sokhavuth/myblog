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
    if(req.body.category != "")
      var query = {category:req.body.category};
    else
      var query = {};

    if(req.body.type === "categories")
      var collection = "categories";
    else
      var collection = "posts";

    dbo.collection(collection).find(query).sort({date: -1, time: -1}).skip(skips).limit(req.body.pageSize).toArray(function(err, result) {
      if (err) throw err;
      db.close().then(getItems(result));
    });
  });

  function getItems(itemList){
    res.json({itemList:itemList});
  }
  
});

module.exports = router;