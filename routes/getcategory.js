/*routes/category.js*/
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const url = config.mongoDBurl;
const edit = require('./edit');

module.exports = function(req, res, type){
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
    if(type === "posting")
      res.render("posting", {categoryList:req.categoryList, blogTitle:"Posting"});
    else if(type === "editing")
      edit.get(req, res);
  }
}