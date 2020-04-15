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
    
    var query = {category:req.body.playlist};

    dbo.collection("posts").find(query).sort({unixTime: -1}).toArray(function(err, result) {
      if (err) throw err;
      db.close().then(getItems(result));
    });
  });

  function getItems(itemList){
    res.json({itemList:itemList});
  }
  
});

module.exports = router;