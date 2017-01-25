var restify = require('restify');
var builder = require('botbuilder');

//set up server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3991, function () {
   console.log('%s listening to %s', server.name, server.input); 
});

//get a token and refresh periodically
var auth = require('./auth.js');
auth.refreshToken();
setInterval(auth.refreshToken, 15*60*1000);

//set up review callback
server.use(restify.bodyParser());//this is needed to get body out of restify request...
server.post('/review', function create(req, res, next) {
    var review = require('./reviewCallback.js'); 
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
        builder.Prompts.choice(session, "Choose an option:", 'Moderate Text|Moderate Picture|Moderate Video|Review|Job|Quit');
    },
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('/moderateText');
                break;
            case 1:
                session.beginDialog('/moderatePicture');
                break;
            case 2:
                session.beginDialog('/moderateVideo');
                break;
            case 3:
                session.beginDialog('/reviewPicture');
                break;
            case 4:
                session.beginDialog('/jobPicture');
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

bot.dialog('/moderateText', [ 
    function (session, args) {
        builder.Prompts.text(session, "Give me a sentence to moderate, please.");
    },
    function (session, results){
        var input = session.message.text;
        var cm = require("./cmtext.js");
        var token = auth.getToken
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

bot.dialog('/moderatePicture', [ 
    function (session, args) {
        builder.Prompts.text(session, "Give me a URL to a picture, please.");
    },
    function (session, results){
        var input = session.message.text;
        var cm = require("./cmimage.js");
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

bot.dialog('/moderateVideo', function (session) {
    session.endDialog("Video moderation will come soon.");
});

bot.dialog('/reviewPicture', [ 
    function (session, args) {
        builder.Prompts.text(session, "Give me a URL to a picture to review, please.");
    },
    function (session, results){
        var input = session.message.text;
        var cm = require("./crimage.js");
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


bot.dialog('/jobPicture', [ 
    function (session, args) {
        builder.Prompts.text(session, "This is a Job. Give me a URL to a picture, please.");
    },
    function (session, results){
        var cm = require('./cjimage.js');
        var input = session.message.text;
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

        //racy:     http://static.bikini.com/inside_4_7.jpg
        //neutral:  http://d.ibtimes.co.uk/en/full/1441242/roger-federer.jpg
