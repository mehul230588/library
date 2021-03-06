var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');

var authRouter = express.Router();

authRouter.route('/signUp')
    .post(function (request, response) {

        MongoClient.connect(url, function (err, client) {
            var user = {
                userName: request.body.userName,
                password: request.body.password
            }
            const db = client.db('test');
            const collection = db.collection('users');
            collection.insert(user, function (err, result) {
                request.login(result.ops[0], function () {
                    response.redirect('/auth/profile');
                });
            });
        });
    });

authRouter.route('/signIn')
    .post(passport.authenticate('local', { failureRedirect: '/  ' }),
    function (request, response) {
        response.redirect('/auth/profile');
    });


authRouter.route('/profile')
    .all(function(request, response, next){
        if(!request.user){
            response.redirect('/');
        }
        next(); 
    })
    .get(function (request, response) {
        response.json(request.user);
    });
module.exports = authRouter;
