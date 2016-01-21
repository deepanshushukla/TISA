/**
 * Created by Deepanshu on 10/13/2015.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
    name:String,
    email: String,
    picture:String,
    did:String,
    pt:String

});

module.exports = mongoose.model('userModel', userSchema);