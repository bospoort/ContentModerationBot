var restify = require('restify');
var builder = require('botbuilder');

//*****************
//set up server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3991, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

//*****************
//set up review callback
server.use(restify.bodyParser());//needed to get body out of restify request
var review = require('./review.js');

server.post('/review', function create(req, res, next) {
    return review(req, res, next);
 });
  
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', function (session) {
    var url = session.message.text;
    var cm = require("./cmstudio.js")
    //urls: 
    //racy: http://static.bikini.com/inside_4_7.jpg
    //neutral: http://d.ibtimes.co.uk/en/full/1441242/roger-federer.jpg

    cm( url, function(err, cmBody) {
        if (err) {
            console.log("Error: "+err);         
            session.send("Oops. Something went wrong.");
            return;
        }
        console.log("JobId: " + cmBody.JobId);
        session.send('Picture posted');
    });
});


