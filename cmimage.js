"use strict";

var request = require("request");
var config = require('./config.json');
var baseUrl = "https://westus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessImage/Evaluate";

module.exports = function(utterance, callback) {
    var req = {
        method: "POST",
        url: baseUrl,
        headers: {
            "Content-Type":"application/json",
            "Ocp-Apim-Subscription-Key": config.ocp_key
        },
        body: {
            "DataRepresentation":"URL",
            "Value": utterance
        }
    };
    request(req, function(err, resp, body) {
        if (err) {
            return callback(err);
        }

        if (resp.statusCode > 299) {
            return callback(new Error("Cognitive Services Moderation failed with: (" + resp.statusCode + ") " + body));
        }
        return callback(null, body ? JSON.parse(body) : "");
    });
};

