// ------ cm.js ---------
"use strict";

var unirest = require("unirest");
var token;

module.exports = function(pictureUrl, callback) {
    var req  = unirest("PUT", "https://westus.api.cognitive.microsoft.com/contentmoderator/review/v1.0/teams/kiktextmoderationmb/reviews");
    var auth = require('./auth.js');

    if (token===undefined){
        getToken(function(){
            moderate(token, pictureUrl, callback);
        });
    }
    else {
        moderate(token, pictureUrl, callback);
    }

    function getToken(callback){
        auth( function(err, body) {
            if (err) {
                console.log("Error: "+err);         
                session.send("Failed to get a token.");
                return;
            }
            console.log('Got a token.');
            token = 'Bearer '+body.access_token;
            callback();
        });
    }

    function moderate(token, pictureUrl, callback){
        req.type("json");
        req.headers({
            "content-type": "application/json",
            "cache-control": "no-cache",
            "authorization": token
        });
        req.send({
            "TeamName":"kiktest",
            "Content": {
                "Representation": "Url",
                "ContentValue": pictureUrl,
                "ContentId": "someimage.jpg"
            },
            "WorkflowId": "default",
            //you need to install and run ngrok http <port>. Then paste url here
            "CallBackEndpoint": "https://e4508b71.ngrok.io"
        });
        req.end(function (res) {
             if (res.statusCode==401){
                getToken(function(){
                    moderate(token, pictureUrl, callback);
                });
            }
            if (res.statusCode > 299) {
                return callback(new Error("CM call failed with: (" + res.statusCode + ") " + res.body));
            }
            if (res.error) 
                throw new Error(res.error);
            return callback(null, res.body );
        });
    }
}
