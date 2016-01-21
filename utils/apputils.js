/**
 * Created by anil on 4/7/15.
 */
var response = require('./appresponse');


module.exports = {
    getErrorResponse : function(res,err){
        res.send(new response.APIResponse(0, err));
    },
    getSuccessResponse : function(res , user){
        res.send(new response.APIResponse(1, user));
    },


    /**
     * returns current time in utc
     * @returns {number}
     */
    getCurrentTime : function(){
        var date = new Date();
        return date.getTime() - (date.getTimezoneOffset()*60*1000);
    }
}/**
 * Created by Deepanshu on 11/27/2015.
 */
