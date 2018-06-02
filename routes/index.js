var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var dialog = require('dialog');

var url = 'mongodb://localhost:27017/mydb';

router.get('/',function(req,res,next){
  res.render('home_page');
});

router.get('/home_page',function(req,res,next){
  res.render('home_page');
});

router.post('/home_page',function(req,res,next){
  res.render('home_page');
});

router.get('/donate',function(req,res,next){
  res.render('donate');
});
router.get('/adopt',function(req,res,next){
  res.render('adopt');
});
router.get('/contact_us',function(req,res,next){
  res.render('contact_us');
});
router.get('/home_page',function(req,res,next){
  res.render('home_page');
});
router.post('/payform',function(req,res,next){
  var amount = req.body.donat_value;
  var catid = req.body.catid;
  var type = req.body.donation_type;
  var hide = null;
  if (catid == null || catid == "")
  {
	  type = "The Centre";
	  hide = "hidden";
  }
  res.render('payform',{money: amount , catid: catid ,hide: hide, type: type});
});

router.get('/about_us',function(req,res,next){
  res.render('about_us');
});

router.get('/test', function(req, res, next) {
 res.render('index');
});

//  data base 
router.post('/donat-adopt', 
	function(req, res, next) {
		if(req.body.but == "donate")
		{
			mongo.connect(url, function(err, db) {
				if (err) throw err;
				var dbase = db.db("mydb");
				dbase.collection("cats").findOne({name: req.body.catname}, function(err, result){
					if (err) throw err; 
					res.render('donate',{catid: result.id, checkme: "checked" });
					db.close();
				});
			});
		}
		else
		{
			mongo.connect(url, function(err, db) {
				if (err) throw err;
				var dbase = db.db("mydb");
				dbase.collection("cats").findOne({name: req.body.catname}, function(err, result){
					if (err) throw err; 
					if(result.Adopted == true)
					{
					dialog.info('The cat has been adopted');
					res.render('adopt');
					db.close();
					}
					else
					{
						var item = {id: req.body.catname , name: req.body.catname , Adopted: true};
						dbase.collection("cats").updateOne({name: req.body.catname}, {$set: item}, function(err, result) {
						assert.equal(null, err);
						db.close();
					    });
					res.render('contact_us',{subject: "Adoption for "+result.name+" having id "+result.id });
					db.close();
					}
				});
			});
		}
	});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
};
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection("user-data").insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log("Item inserted");
      db.close();
    });
  });

  res.redirect('/test');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});

module.exports = router;
