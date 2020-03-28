/* routes/delete.js */
const MongoClient = require('mongodb').MongoClient;
const url = require('./config').mongoDBurl;

module.exports = function(req,res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    
    if (err) throw err;
    var dbo = db.db("mydb");

    var myquery = { "id": req.params.id};

    dbo.collection('posts').deleteOne(myquery, function(err, res){
      if (err) throw err;
      console.log("1 document was deleted");

      dbo.collection("posts").find().sort({date: -1}).limit(9).toArray(function(err, result) {
        if (err) throw err;
        countPosts(result);
      });

      function countPosts(postList){
        dbo.collection("posts").countDocuments(function(err, countData){
          if (err) throw err;
          db.close().then(getData(postList, countData));
        });
      }

    });

  });

  function getData(postList, postNum){
    res.render("posts", { author: req.user.displayName, postList:postList, postNum:postNum, blogTitle:"Posts" });
  }
}