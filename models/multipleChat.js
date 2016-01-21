/**
 * Created by Deepanshu on 11/27/2015.
 */
/**
 * Created by Deepanshu on 10/13/2015.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var chatSchema   = new Schema({
    participants:String


});

module.exports = mongoose.model('multipleChat', chatSchema);/**
 * Created by Deepanshu on 11/27/2015.
 */
