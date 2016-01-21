/**
 * Created by Deepanshu on 10/5/2015.
 */
var express = require('express');
//hello uu
var facebook = require('./facebook');
var mongo = require('mongodb').MongoClient;
var monk = require('monk');
var constant = require('./utils/appconstants');
var app = express();
var FB = require('fb');
var mongoose   = require('mongoose');
mongoose.connect(constant.mongourl);
var User  = require('./models/user');
var singleChat  = require('./models/singleChat');
var multipleChat  = require('./models/multipleChat');
var apputils = require('./utils/apputils')

//mongod --dbpath d:\TISA\data\
//app.use(function(req,res,next){
//    req.db = db;
//    next();
//});

app.get('/singlechatID', function(req, res){
 // var participant = req.query.participants;
    var participant='561fe33c8b44d1941c61f5b8,561fe3bedc163d4119d1c7a, 565820c785aaf9c40edea31d'
    participant=participant.split(',').sort().join(',').trim();
    singleChat.findOne({ participants: participant }, function(err, row) {
        if (err) console.error(err);
        if(row){
            apputils.getSuccessResponse(res , row)
        }
        else{
            var newChat=new singleChat({ participants: participant });
            newChat.save(function (err, newchat) {
                if (err) console.log(err);
                apputils.getSuccessResponse(res , newchat)

            });
        }
    });
});
app.get('/multiplechatID', function(req, res){
  var participant = req.query.participants;
//    var participant='561fe33c8b44d1941c61f5b8,561fe3bedc163d4119d1c7a, 565820c785aaf9c40edea31d'
    participant=participant.split(',').sort().join(',').trim();

    multipleChat.findOne({ participants: participant }, function(err, row) {
        if (err) console.error(err);
        if(row){
            apputils.getSuccessResponse(res , row)
        }
        else{
            var newChat=new multipleChat({ participants: participant });
            newChat.save(function (err, newchat) {
                if (err) console.log(err);
                apputils.getSuccessResponse(res , newchat)

            });
        }
    });
});
app.get('/login', function(req, res){
//  var accessToken = req.query.accessToken;
    // Find a single movie by name.
//    FB.setAccessToken(accessToken);
    var objecttosave={
        "email":'deeeeep1790@gmail.com',
        "name":'shukls',
        "picture":'mypic'
    }

    User.findOne({ email: objecttosave.email }, function(err, user) {
        if (err) console.error(err);
        if(user){
            apputils.getSuccessResponse(res , user)
             }
        else{
            var newuser=new User(objecttosave);
            newuser.save(function (err, newuser) {
                if (err) console.log(err);
                apputils.getSuccessResponse(res , newuser)

            });
        }
    });
//    FB.api('\me', { fields: ['id', 'name','email','picture'] }, function (response) {
//        if (!response || response.error) {
//            console.log(!response ? 'error occurred' : response.error);
//            return;
//        }
//        var useremail = response.email;
//
//        User.findOne({ email: useremail }, function(err, user) {
//            if (err) return console.error(err);
//
//            res.send(user);
//        });
//    });

    function handleError(err, res, req){
        setHeadersForCrossDomainIssues(res);
        console.log(err)
        if(err.errorCode){
            if(err.error) console.warn(err.error.stack);
            if(! req._dumped){
                apputils.getErrorResponse(res,err);
            }
        }else{
            apputils.getErrorResponse(res,appUtil.exceptions.getUnknownErrorException());
        }
    }
    app.use(function(err, req, res, next) {
        handleError(err, res, req);
    });

    function setHeadersForCrossDomainIssues(response){
        response.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        response.set('Access-Control-Allow-Headers', 'X-PINGOTHER');
        response.set('Access-Control-Allow-Origin', appUtil.appConstants.env.WEBSITE_URL);
        response.set('Access-Control-Allow-Credentials', true);
    }



});
    app.listen(3002,"0.0.0.0");
