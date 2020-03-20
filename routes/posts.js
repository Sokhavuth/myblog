/* routes/posts.js */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;
const postLimit = config.postLimit;

module.exports = function(req, res){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("posts").find({}).sort({date: -1, time: -1}).limit(postLimit).toArray(function(err, result) {
        if (err) throw err;
        db.close().then(resolve(result));
      });
    });
  });
}