"use strict";

var request = require("request");
var baseUrl = "https://westus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen/";
var ocp_key = "90a28e21f40b4dfd89bf76f445eb1d20";

module.exports = function(utterance, callback) {
    var req = {
        method: "POST",
        url: baseUrl,
        headers: {
            "Content-Type":"text/plain",
            "Ocp-Apim-Subscription-Key": ocp_key
        },
        qs: {
            "language": "eng",
            "autocorrect": "true",
            "urls": "true",
            "PII": "true"
        }
    };
    req.body=utterance;
    request(req, function(err, resp, body) {
        if (err) {
            return callback(err);
        }

        if (resp.statusCode > 299) {
            return callback(new Error("Cognitive Services Text Moderation failed with: (" + resp.statusCode + ") " + body));
        }
        return callback(null, body ? JSON.parse(body) : "");
    });
};

