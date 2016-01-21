

exports.AppException = function(errorCode, errorMessage, error){
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.error = error;
}
exports.APIResponse = function(statusCode, result){
    this.statusCode = statusCode;
    var appUtil = require('./apputils');
    this.time = appUtil.getCurrentTime();
    this.result = result;
}/**
 * Created by Deepanshu on 11/27/2015.
 */
