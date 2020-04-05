/*routes/category.js*/
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;

module.exports = function(req, res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("categories").find({}).toArray(function(err, result) {
      if (err) throw err;
      req.categoryList = result;
      db.close().then(getPost());
    });
  });

  function getPost(){
    res.render("posting", {categoryList:req.categoryList, blogTitle:"Posting"});
  }
}