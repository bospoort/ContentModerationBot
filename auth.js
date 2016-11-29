"use strict";

var unirest = require("unirest");
var config = require('./config.json');

module.exports = function(callback) {
    var req = unirest("POST", "https://login.microsoftonline.com/contentmoderatorprod.onmicrosoft.com/oauth2/token");

    req.headers({
        "content-type": "application/x-www-form-urlencoded"
    });

    req.form({
        "resource": "https://api.contentmoderator.cognitive.microsoft.com/review",
        "client_id": config.cm_id,
        "client_secret": config.cm_key,
        "grant_type": "client_credentials"
    });

    req.end(function (res){
        if (res.error){
            return callback(res.error);
        }
        return callback(null, res.body);
    });
};
