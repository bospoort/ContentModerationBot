"use strict";

module.exports = function(req, res, callback) {
    console.log('Review callback.');
    console.log(JSON.stringify(req.body, null, 4));
    res.send('OK');
    return callback(null, res.body );
}
