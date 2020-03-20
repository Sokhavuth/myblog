/* routes/users.js */
const MongoClient = require('mongodb').MongoClient;
const url = require('./config').mongoDBurl;

exports.getUsers = function(req, res, next){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("users").find({}).limit(1).toArray(function(err, result) {
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