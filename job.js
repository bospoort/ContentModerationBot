// ------ cm.js ---------
"use strict";

module.exports = function(contentType, workflow, input, callback) {
    var unirest = require("unirest");
    var config = require('./config.json');
    var auth = require('./auth.js');
    var url = config.url_prefix+'jobs';

    var req = unirest.post(url)
        .type("application/json")
        .query({
            ContentType: contentType,
            ContentId: input,
            WorkflowName: workflow,
            CallBackEndpoint: 'http://requestb.in/1ero2uq1'
        })
        .headers({
            "Ocp-Apim-Subscription-Key":config.ocp_key, 
            "authorization": auth.token
        })
        .send({
            "ContentValue": input
        })
        .end(function (res) {
            return callback(res.error, res.body );
        });
}

