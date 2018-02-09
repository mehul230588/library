var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var passport = require('passport');

var bookRouter = express.Router();
bookRouter.use(function(request, response, next){
    if(!request.user){
        response.redirect('/');
    }
    else{
        next(); 
    }
});

bookRouter.route('/')
    .get(function(request, response){
        MongoClient.connect(url, function(err, client) {
            const db = client.db('test');
            const collection = db.collection('library');
            collection.find({}).toArray(function(err, result) {
                response.send(result);
            });
          });
    });

bookRouter.route('/:id')
.get(function(request, response){
    var id = new ObjectID(request.params.id);
    MongoClient.connect(url, function(err, client) {
        const db = client.db('test');
        const collection = db.collection('library');
        collection.findOne({'_id':id}, function(err, result) {
            response.send(result);
        });
      });
});

module.exports = bookRouter;
