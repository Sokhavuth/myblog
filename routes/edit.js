/* routes/edit.js */
var MongoClient = require('mongodb').MongoClient;
var url = require('./config').mongoDBurl;
const Utility = require('./util');
const util = new Utility();

module.exports.get = function(req,res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    
    if (err) throw err;
    var dbo = db.db("mydb");

    if(req.params.type === "post"){
      var collection = "posts";
      var myquery = {id:req.params.id};
    }else if(req.params.type === "category"){
      var collection = "categories";
      var myquery = {category:req.params.id};
    }else if(req.params.type === "page"){
      var collection = "pages";
      var myquery = {id:req.params.id};
    }

    dbo.collection(collection).find(myquery).toArray(function(err, result) {
      if (err) throw err;
      req.postList = result;
      db.close().then(getData());
    });

    function getData(){
      if(collection === "posts")
        res.render('edit', { user:req.user, postList:req.postList, categoryList:req.categoryList, blogTitle:"​​Edit" });
      else if(collection === "categories")
        res.render('categoryEdit', {categoryList:req.postList, blogTitle:"​​Edit" });
      else if(collection === "pages")
        res.render('pageEdit', {pageList:req.postList, blogTitle:"​​Edit" })
    }

  });
};

module.exports.post = function(req,res){
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
    if(req.body.posttype === "submit"){
      var collection = "posts";
      var myquery = { id: req.body.id};
      var thumbUrl = util.getThumbUrl(req.body.content);
      var unixTime = (new Date(req.body.date+' '+req.body.time)).getTime();
      var newvalues = { $set: { thumbUrl:thumbUrl, unixTime:unixTime, date:req.body.date, time:req.body.time ,type:req.body.postpage, author:req.user.displayName, title:req.body.title, content:req.body.content, category:req.body.category} };
    }else if(req.body.categorytype === "Submit"){
      var collection = "categories";
      var unixTime = (new Date(req.body.date+' '+req.body.time)).getTime();
      var myquery = { category: req.body.oricategory};
      var newvalues = { $set: { unixTime:unixTime, time:req.body.time, date:req.body.date, category:req.body.category} };
    }else if(req.body.pagetype === "page"){
      var collection = "pages";
      var myquery = { id: req.body.id};
      var newvalues = { $set: { title:req.body.title, content:req.body.content } };
    }
    
      dbo.collection(collection).updateOne(myquery,newvalues, function(err, result){
        if (err) throw err;
        console.log("1 document was updated");
        if(collection === "posts")
          res.redirect('/login/posts');
        else if(collection === "categories")
          res.redirect("/login/categories");
        else if(collection === "pages")
          res.redirect("/login/pages");
      });
  });
}
