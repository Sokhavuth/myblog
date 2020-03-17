var MongoClient = require('mongodb').MongoClient;
var url = require('./config').mongoDBurl;
var ObjectId = require('mongodb').ObjectID;
 
exports.getUsers = function(req,res){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;
        if(result.length > 0){
          db.close().then(resolve('users'));
        }else{
          db.close().then(resolve('nousers'));
        }
      });
    });
  });
}

exports.findById = function(id, cb) {
  process.nextTick(function() {

    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("users").find({_id:ObjectId(id)}).toArray(function(err, result) {
        if (err) throw err;
        if(result.length > 0){
         var record = result[0];
          cb(null, record);
          db.close();
        }else{
          cb(new Error('User ' + id + ' does not exist'));
          db.close();
        }
      });
  
    });

  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("users").find({username:username}).toArray(function(err, result) {
        if (err) throw err;
        if(result.length > 0){
          var record = result[0];
          db.close();
          return cb(null, record);
        }else{
          db.close();
          return cb(null, null);
        }
      });
    });
  });
}