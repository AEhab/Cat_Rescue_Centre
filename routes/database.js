var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  
  var dbase = db.db("mydb");
    dbase.collection("cats").findOne({name: "Alex" }, function(err, result){
    if (err) throw err;
    console.log(result.id);
    db.close();
  });
});