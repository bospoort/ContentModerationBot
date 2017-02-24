"use strict";

var unirest = require("unirest");
var config = require('./config.json');
var baseUrl = "https://westus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/";

module.exports = function(contentType, input, cb) {
    switch (contentType){
        case 'ImageUrl':{
            unirest.post(baseUrl+'ProcessImage/Evaluate')
                .type("json")
                .headers({
                    "content-type": "application/json",
                    "Ocp-Apim-Subscription-Key":config.ocp_key, 
                })
                .send({
                    "DataRepresentation": "URL",
                    "Value": input,
                })
                .end(function (res) {
                    return cb(res.error, res.body );
                });
            break;
        }
        case 'Image':{
            break;
        }
        case 'Text':{
            unirest.post(baseUrl+'ProcessText/Screen/')
                //.type("application/json")
                .query({ 
                    "language": "eng",
                    "autocorrect": "true",
                    "urls": "true",
                    "PII": "true"                
                })
                .headers({
                    "Ocp-Apim-Subscription-Key":config.ocp_key, 
                    "Content-Type":"text/plain"
                })
                .send(
                    input
                )
                .end(function (res) {
                    return cb(res.error, res.body );
                });
            break;
        }
        case 'Video':{
            break;
        }
        default:
            break;
    }

};
