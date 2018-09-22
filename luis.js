require('dotenv').config();

var request = require('request');
var querystring = require('querystring');

function getLuisIntent(utterance) {

    // endpoint URL
    var endpoint =
        "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/";

    var luisAppId = process.env.LUIS_APP_ID;
    console.log("Luis App ID is :");
    console.log(luisAppId);

    var endpointKey = process.env.LUIS_ENDPOINT_KEY;

    // Create query string 
    var queryParams = {
        "verbose":  true,
        "q": utterance,
        "subscription-key": endpointKey
    }

    var luisRequest =
        endpoint + luisAppId +
        '?' + querystring.stringify(queryParams);

    request(luisRequest,
        function (err,
            response, body) {

            if (err)
                console.log(err);
            else {
                var data = JSON.parse(body);
                console.log('Query: ${data.query}');
                console.log('Top Intent: ${data.topScoringIntent.intent}');
                console.log('Intents:');
                console.log(data.intents);
            }
        });
}


getLuisIntent('turn on the bedroom light');