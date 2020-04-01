/* routes/categories.js */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;

module.exports = function(req, res){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");

      dbo.collection("categories").find({}).sort({date: -1, time: -1}).limit(9).toArray(function(err, result) {
        if (err) throw err;
        countPosts(result);
      });

      function countPosts(categoryList){
        dbo.collection("categories").countDocuments(function(err, countData){
          if (err) throw err;
          db.close().then(resolve({categoryList:categoryList, categoryNum:countData}));
        });
      }

    });
  });
}