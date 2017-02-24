"use strict";

var unirest = require("unirest");
var config = require('./config.json');

module.exports = function(contentType, pictureUrl, callback) {
    var auth = require('./auth.js');

    unirest.post(config.url_prefix + "reviews")
        .type("json")
        .headers({
            "content-type": "application/json",
            "cache-control": "no-cache",
            "Ocp-Apim-Subscription-Key":config.ocp_key, 
            "authorization": auth.token
        })
        .send([{
            "Metadata": [
                // {
                //     "Key": "string",
                //     "Value": "string"
                // }
            ],
            "Type": contentType,
            "Content": pictureUrl,
            "ContentId": "someimage.jpg",
            //you need to install and run ngrok http <port>. Then paste url here
            //Alternatively use requestb.in
            "CallBackEndpoint": "http://requestb.in/1fcqjfk1"
        }])
        .end(function (res) {
            return callback(res.error, res.body );
        });
}
