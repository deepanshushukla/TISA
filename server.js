/**
 * Created by Deepanshu on 10/5/2015.
 */
var express = require('express');
//hello uu
var facebook = require('./facebook');
var mongo = require('mongodb').MongoClient;
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
    var participant = req.query.participants;
    //var participant='561fe33c8b44d1941c61f5b8,561fe3bedc163d4119d1c7a, 565820c785aaf9c40edea31d'
    participant=participant.split(',').sort().join(',').trim();
    singleChat.findOne({ participants: participant }, function(err, row) {
        if (err) apputils.getErrorResponse(res , err)
        if(row){
            apputils.getSuccessResponse(res , row)
        }
        else{
            var newChat=new singleChat({ participants: participant });
            newChat.save(function (err, newchat) {
                if (err) apputils.getErrorResponse(res , err)
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
                if (err) apputils.getErrorResponse(res , err)
                apputils.getSuccessResponse(res , newchat)

            });
        }
    });
});
app.get('/login', function(req, res){
  var accessToken = req.query.accessToken;
    // Find a single movie by name.
    FB.setAccessToken(accessToken);
     FB.api('\me', { fields: ['id', 'name','email','picture'] }, function (response) {
        if (!response || response.error) {
            apputils.getErrorResponse(res,response.error);
            return;
        }
        var objecttosave={
                "email":response.email,
                "name":response.name,
                "picture":response.picture
            }
        User.findOne({ email: objecttosave.email }, function(err, user) {
                if (err) apputils.getErrorResponse(res , err)
                if(user){
                    apputils.getSuccessResponse(res , user)
                }
                else{
                    var newuser=new User(objecttosave);
                    newuser.save(function (err, newuser) {
                        if (err) apputils.getErrorResponse(res , err)
                        apputils.getSuccessResponse(res , newuser)

                    });
                }
         });
    });

});

function setHeadersForCrossDomainIssues(response){
    response.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'X-PINGOTHER');
    response.set('Access-Control-Allow-Origin', appUtil.appConstants.env.WEBSITE_URL);
    response.set('Access-Control-Allow-Credentials', true);
}

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
    app.listen(process.env.PORT || 5000);
