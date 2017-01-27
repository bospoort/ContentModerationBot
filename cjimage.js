// ------ cm.js ---------
"use strict";


module.exports = function(pictureUrl, callback) {
    var unirest = require("unirest");
    var config = require('./config.json');
    var auth = require('./auth.js');
    var url = config.url_prefix+'jobs';

    var req = unirest.post(url)
    .type("application/json")
    .query({
        ContentType: 'Image',
        ContentId: pictureUrl,
        WorkflowName: 'adultwf',
        CallBackEndpoint: 'http://requestb.in/1fcqjfk1'
    })
    .headers({
        "Ocp-Apim-Subscription-Key":config.ocp_key, 
        "authorization": auth.token
    })
    .send({
        "ContentValue": pictureUrl
    })
    .end(function (res) {
        if (res.statusCode > 299) {
            return callback(new Error("CM call failed with: (" + res.statusCode + ") " + res.body));
        }
        if (res.error) 
            throw new Error(res.error);
        return callback(null, res.body );
    });
}

