var express = require('express');
var MongoClient = require('mongodb').MongoClient;


var adminRouter = express.Router();
// Connection URL

const books = [
    {
        title:"Book1",
        author:"Author1"
    },
    {
        title:"Book2",
        author:"Author2"
    },
    {
        title:"Book3",
        author:"Author3"
    }
];

adminRouter.route('/addBooks')
    .get(function(request, response){
        MongoClient.connect(url, function(err, client) {
            const db = client.db('test');
            const collection = db.collection('library');
            collection.insertMany(books, function(err, result) {
                response.send(result);
                db.close();
            });
          });
    });


module.exports = adminRouter;
