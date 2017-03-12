'use strict';
var unirest = require('unirest');
var config = require('./config.json');
var utils = require('./utils.js');

var baseUrl = 'https://westus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/';
var request = require('request-promise');

module.exports = function(contentType, input, cb) {
    switch (contentType){
        case 'ImageUrl':{
            unirest.post(baseUrl+'ProcessImage/Evaluate')
                .type('json')
                .headers({
                    'content-type': 'application/json',
                    'Ocp-Apim-Subscription-Key':config.ocp_key, 
                })
                .send({
                    'DataRepresentation': 'URL',
                    'Value': input,
                })
                .end(function (res) {
                    return cb(res.error, res.body );
                });
            break;
        }
        case 'Image':{
            utils.downLoadImage(input.contentUrl, 'tempfile.jpg', function () {
                unirest.post(baseUrl+'ProcessImage/Evaluate')
                    .headers({
                        'content-type': 'image/jpeg',
                        'Ocp-Apim-Subscription-Key':config.ocp_key, 
                        'Content-Length': response.length
                    })
//                        .attach('picture', unirest.request(input.contentUrl),{ 'knownLength': response.length } )
//                        .attach({'picture': 'reliability.jpg' })//this gets an image size 400 error
                    // .attach({'picture': input.contentUrl })
                    .attach({'picture': "reliability.jpg" })
                    .end(function (res) {
                    return cb(res.error, res.body );
                });
            });
            break;
        }        
        case 'Text':{
            unirest.post(baseUrl+'ProcessText/Screen/')
                //.type('application/json')
                .query({ 
                    'language': 'eng',
                    'autocorrect': 'true',
                    'urls': 'true',
                    'PII': 'true'                
                })
                .headers({
                    'Ocp-Apim-Subscription-Key':config.ocp_key, 
                    'Content-Type':'text/plain'
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
