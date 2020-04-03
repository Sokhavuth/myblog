/* routes/delete.js */
const MongoClient = require('mongodb').MongoClient;
const url = require('./config').mongoDBurl;

module.exports = function(req,res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    
    if (err) throw err;
    var dbo = db.db("mydb");

    if(req.params.type === "post"){
      collection = "posts";
      var myquery = { "id": req.params.id};
    }
    else if(req.params.type === "category"){
      collection = "categories";
      var myquery = { "category": req.params.id};
    }

    dbo.collection(collection).deleteOne(myquery, function(err, result){
      if (err) throw err;
      console.log("1 document was deleted");

      if(collection === "posts")
        res.redirect("/login/posts");
      else if(collection === "categories")
        res.redirect("/login/categories");
    });

  });
}