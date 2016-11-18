var restify = require('restify');
var builder = require('botbuilder');

//set up server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3991, function () {
   console.log('%s listening to %s', server.name, server.input); 
});

//set up review callback
server.use(restify.bodyParser());//this is needed to get body out of restify request...
var review = require('./review.js');//callback 

server.post('/review', function create(req, res, next) {
    return review(req, res, next);
 });
  
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', [ 
     function (session) { 
         session.send("Hi, I can do moderation."); 
         session.beginDialog('/menu'); 
     }, 
     function (session, results) { 
         session.endConversation("Thank you. Bye."); 
     } 
]);

bot.dialog('/menu', [
    function (session) {
        builder.Prompts.choice(session, "Choose an option:", 'Text|Picture|Video|Quit');
    },
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('/text');
                break;
            case 1:
                session.beginDialog('/picture');
                break;
            case 2:
                session.beginDialog('/video');
                break;
            default:
                session.endDialog();
                break;
        }
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/menu');
    }
]).reloadAction('showMenu', null, { matches: /^(menu|back)/i });

bot.dialog('/text', [ 
    function (session, args) {
        builder.Prompts.text(session, "Give me a sentence to moderate, please.");
    },
    function (session, results){
        var input = session.message.text;
        var cm = require("./cmtext.js");
        cm( input, function(err, body) {
            if (err) {
                console.log("Error: "+err);         
                session.send("Oops. Something went wrong.");
                return;
            }
            var output = JSON.stringify(body);
            console.log("Result: " + output);
            session.endDialog(output);
        });
    }
]);

bot.dialog('/picture', [ 
    function (session, args) {
        builder.Prompts.text(session, "Give me a URL to a picture, please.");
    },
    function (session, results){
        var input = session.message.text;
        var cm = require("./cmstudio.js")
        //racy:     http://static.bikini.com/inside_4_7.jpg
        //neutral:  http://d.ibtimes.co.uk/en/full/1441242/roger-federer.jpg
        cm( input, function(err, body) {
            if (err) {
                console.log("Error: "+err);         
                session.send("Oops. Something went wrong.");
                return;
            }
            var output = JSON.stringify(body);
            console.log("Result: " + output);
            session.endDialog(output);
        });
    }
]);

bot.dialog('/video', function (session) {
    session.endDialog("Video mod will come soon.");
});
