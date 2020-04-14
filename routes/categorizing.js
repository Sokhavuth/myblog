/* routes/categorizing.js */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;

module.exports = function(req, res){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {

      if (err) throw err;
      var dbo = db.db("mydb");

      var unixTime = (new Date(req.body.date+' '+req.body.time)).getTime();
      
      var records = [
        { unixTime:unixTime ,url:"/category/"+req.body.category, time:req.body.time, date:req.body.date, author:req.user.displayName, category:req.body.category}
      ];

      dbo.collection("categories").insertMany(records, function(err, result){
        if (err) throw err;
        db.close().then(resolve(result));
      });
    });
  });
}