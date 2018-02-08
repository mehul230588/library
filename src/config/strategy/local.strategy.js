var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://test:newpassword.123@cluster0-shard-00-00-jrkyu.mongodb.net:27017,cluster0-shard-00-01-jrkyu.mongodb.net:27017,cluster0-shard-00-02-jrkyu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';


module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: "userName",
        passwordField: "password"
    },
    function (username, password, done) {

        MongoClient.connect(url, function(err, client) {
            const db = client.db('test');
            const collection = db.collection('users');
            collection.findOne({userName: username}, function(err, result) {
                var user = result;
                if(user.password === password){
                    done(null, user);
                }
                else{
                    done(null, false, {message: 'Bad User'});
                }
            });
          });
        }
    ));
}