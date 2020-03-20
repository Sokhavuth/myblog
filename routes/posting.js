/* routes/posting.js */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;

module.exports = function(req, res){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {

      if (err) throw err;
      var dbo = db.db("mydb");
    
      const postId = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);

      var records = [
        {url:"/post/"+postId, time:req.body.time, date:new Date(req.body.date), id:postId, author:req.user.displayName, title:req.body.title, content:req.body.content, category:req.body.category}
      ];

      dbo.collection("posts").insertMany(records, function(err, result){
        if (err) throw err;
        db.close().then(resolve(result));
      });
    });
  });
}