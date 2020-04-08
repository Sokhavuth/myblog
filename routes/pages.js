/* routes/posts.js */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;

module.exports = function(req, res){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");

      dbo.collection("pages").find({}).sort({date: -1}).limit(9).toArray(function(err, result) {
        if (err) throw err;
        countPages(result);
      });

      function countPages(pageList){
        dbo.collection("pages").countDocuments(function(err, countData){
          if (err) throw err;
          db.close().then(resolve({pageList:pageList, pageNum:countData}));
        });
      }

    });
  });
}