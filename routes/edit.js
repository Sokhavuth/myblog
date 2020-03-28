/* routes/edit.js */
var MongoClient = require('mongodb').MongoClient;
var url = require('./config').mongoDBurl;

module.exports.get = function(req,res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    
    if (err) throw err;
    var dbo = db.db("mydb");

    dbo.collection("posts").find({id:req.params.id}).toArray(function(err, result) {
      if (err) throw err;
      req.postList = result;
      db.close().then(getData());
    });
  });

  function getData(){
    res.render('edit', { user:req.user, postList:req.postList, blogTitle:"​​Edit" });
  };
};

module.exports.post = function(req,res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
      var myquery = { id: req.body.id};
      var newvalues = { $set: { type:req.body.postpage, author:req.user.displayName, title:req.body.title, content:req.body.content, category:req.body.category} };

      dbo.collection("posts").updateOne(myquery,newvalues, function(err, result){
        if (err) throw err;
        console.log("1 document was updated");
        res.redirect('/login/posts');

      });
  });
}
