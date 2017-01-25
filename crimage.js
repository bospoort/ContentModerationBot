"use strict";

var unirest = require("unirest");
var config = require('./config.json');

module.exports = function(pictureUrl, callback) {
    var req  = unirest("POST", config.url_prefix + "reviews");
    var auth = require('./auth.js');

    req.type("json");
    req.headers({
        "content-type": "application/json",
        "cache-control": "no-cache",
        "Ocp-Apim-Subscription-Key":config.ocp_key, 
        "authorization": auth.token
    });
    req.send([{
        "Metadata": [
            // {
            //     "Key": "string",
            //     "Value": "string"
            // }
        ],
        "Type": "Image",
        "Content": pictureUrl,
        "ContentId": "someimage.jpg",
        //you need to install and run ngrok http <port>. Then paste url here
        //Alternatively use requestb.in
        "CallBackEndpoint": "http://requestb.in/t35yc3t3"
    }]);
    req.end(function (res) {
        if (res.statusCode > 299) {
            return callback(new Error("CM call failed with: (" + res.statusCode + ") " + res.body));
        }
        if (res.error) 
            throw new Error(res.error);
        return callback(null, res.body );
    });
}
