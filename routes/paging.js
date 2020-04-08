/* routes/paging.js */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;
const Utility = require('./util');
const util = new Utility();

module.exports = function(req, res){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {

      if (err) throw err;
      var dbo = db.db("mydb");
    
      const pageId = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
      const thumbUrl = util.getThumbUrl(req.body.content);

      var records = [
        {thumbUrl:thumbUrl, date: new Date(), url:"/page/"+pageId, id:pageId, author:req.user.displayName, title:req.body.title, content:req.body.content}
      ];

      dbo.collection("pages").insertMany(records, function(err, result){
        if (err) throw err;
        db.close().then(resolve(result));
      });
    });
  });
}