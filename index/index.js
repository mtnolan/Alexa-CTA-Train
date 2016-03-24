var aws = require('aws-sdk');
var http = require('http');
var parse = require('xml2js').parseString;
var moment = require('moment-timezone');
var dynamodb = new aws.DynamoDB();
var AlexaSkill = require('./AlexaSkill');
var StationLookup = require('./StationLookup');

var APP_ID = 'amzn1.echo-sdk-ams.app.01d38e0e-785e-48b7-a7a6-8095e124f93d';

// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
    // Create an instance of the WiseGuy Skill.
    console.log('event - ' + JSON.stringify(event));
    var skill = new TrainTrackerSkill();
    skill.execute(event, context);
};


var TrainTrackerSkill = function() {
    AlexaSkill.call(this, APP_ID);
    StationLookup.call();
};

//Extend AlexaSkill
TrainTrackerSkill.prototype = Object.create(AlexaSkill.prototype);
TrainTrackerSkill.prototype.constructor = TrainTrackerSkill;


TrainTrackerSkill.prototype.intentHandlers = {
    "SetHomeStation": function(intent, session, response) {
        handleSetHomeStationIntent(intent, session, response);
    },
    "GetTrain": function(intent, session, response) {
        handleGetTrainIntent(intent, session, response);
    },
    "SetHomeStationByName": function(intent, session, response) {
        handleSetHomeStationByNameIntent(intent, session, response);
    },
    "AMAZON.HelpIntent": function(intent, session, response) {

    },

    "AMAZON.StopIntent": function(intent, session, response) {

    },

    "AMAZON.CancelIntent": function(intent, session, response) {

    }
};

//Addison - 41440
//Belmont - 41320

/*
 *  SetHomeStationByName Intent
 *  Intent for setting a user's home station and line using the station's ID.
 */
function handleSetHomeStationIntent(intent, session, alexaCallback) {
    console.log(intent);
    var homeStation = intent.slots.StopId;
    var line = intent.slots.Line;
    var params = {
        Key: {
            UserId: {
                S: userId
            }
        },
        TableName: "CTAUser"
    };

    dynamodb.getItem(params, function(err, data) {
        if (err) {
            console.log('Failed to get user profile: ' + err);
            alexaCallback({}, buildSpeechletResponse("CTA Train", "Something went wrong!  Please try again!", "Something went Wrong!", true));
        } else {
            console.log("User - " + JSON.stringify(userId) + " HomeStation - " + JSON.stringify(homeStation) + ' Line - ' + JSON.stringify(line));

            var createParams;

            if (typeof line.value == "undefined") {
                createParams = {
                    Item: {
                        'UserId': {
                            S: userId
                        },
                        'HomeStation': {
                            S: homeStation.value
                        }
                    },
                    ConditionExpression: 'attribute_not_exists(LookupId)',
                    TableName: "CTAUser"
                };
            } else {
                createParams = {
                    Item: {
                        'UserId': {
                            S: userId
                        },
                        'HomeStation': {
                            S: homeStation.value
                        },
                        'Line': {
                            S: line.value
                        }
                    },
                    ConditionExpression: 'attribute_not_exists(LookupId)',
                    TableName: "CTAUser"
                };
            }

            dynamodb.putItem(createParams, function(err, data) {
                if (err != null) {
                    console.log(err);
                    alexaCallback({}, buildSpeechletResponse("CTA Train", "Failed to set home station.", "Home station not set", true));
                } else {
                    console.log(data);
                    alexaCallback({}, buildSpeechletResponse("CTA Train", "Home station set.", "Home station set", true));
                }
            });
        }

    });
}

/*
 *  SetHomeStationByName Intent
 *  Intent for setting a user's home station and line using the station's name.
 */
function handleSetHomeStationByNameIntent(intent, session, alexaCallback) {
    console.log(JSON.stringify(intent));
    console.log('session - ' + JSON.stringify(session));
    var homeStation = intent.slots.Station;
    line = intent.slots.Line;
    userId = getUserId(session);
    console.log('HomeStation - ' + homeStation.value + ' | Line - ' + line.value);

    if (line.value === undefined) {
        var speechOutput = {
            speech: 'Please specify a line.',
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };

        var repromptOutput = {
            speech: 'Please specify a line.',
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };

        alexaCallback.ask(speechOutput, repromptOutput);
    }

    var params = {
        Key: {
            UserId: {
                S: userId
            }
        },
        TableName: "CTAUser"
    };
}

/*
 *  GetTrain Intent
 *  Intent for settings a user's home station and line using the station's name.
 */
function handleGetTrainIntent(intent, session, alexa) {

    var userId = getUserId(session);

    getUserProfile(userId, alexa, function(err, profile) {
        var path = '/api/1.0/ttarrivals.aspx?key=4bee6b7246d64327a003527128fd0da3&mapid=' + profile.HomeStation.S;
        var lineCode = '';
        if (typeof intent.slots.Line != 'undefined') {
            lineCode = getLineCode(intent.slots.Line.value, alexa);
            path = path + '&rt=' + lineCode;
        } else if (typeof profile.Line != 'undefined') {
            lineCode = profile.Line.S;
            path = path + '&rt=' + lineCode;
        }

        //Ask what line

        var destination = intent.slots.Destination.value;

        var destinationCode = validateRequest(parseInt(profile.HomeStation.S), lineCode, destination);

        if (destinationCode === undefined) {
            if (destination.toUpperCase() === 'IN') {
                destination = 'Inbound';
            } else if (destination.toUpperCase === 'OUT') {
                destination = 'Outbound';
            }

            var lineName = getLineName(lineCode);
            var cardText = destination + " is an invalid " + lineName + " destination.";
            var speechText = destination + " is an invalid " + lineName + " destination.  Please use " + getLineDestinationsString(lineCode) + ' as destinations for ' + lineName + ' trains.';

            alexa.tellWithCard(speechText, "CTA Train Tracker", cardText);
        } else if (destinationCode === null) {
            var lineName = getLineName(lineCode);
            var cardText = 'The ' + lineName + ' does not run on your designated home station.';
            var speechText = 'The ' + lineName + ' does not run on your designated home station.';

            alexa.tellWithCard(speechText, "CTA Train Tracker", cardText);
        }

        console.log('Destination - ' + destination + ' Code - ' + destinationCode);

        console.log(JSON.stringify(profile));
        var options = {
            host: 'lapi.transitchicago.com',
            port: 80,
            path: path,
            method: 'GET'
        };

        console.log(JSON.stringify(options));

        console.log('Making Request...');

        getHTTPResponse(options, function(body) {
            console.log('BODY: ' + body);

            parse(body, function(err, result) {
                if (err != null) {
                    console.log(err);
                    alexa({}, buildSpeechletResponse("Error", "Failed to parse CTA response.", "What train?", true));
                } else {
                    console.log(result.ctatt);
                    if (result.ctatt.errCd[0] != '0') {
                        console.log('Error code: ' + result.ctatt.errCd[0]);
                        if (result.ctatt.errCd[0] === '103') {
                            alexa({}, buildSpeechletResponse("Error", "Invalid home station.  Please reset your Home station.", "What train?", true));
                        }
                        alexa({}, buildSpeechletResponse("Error", result.ctatt.errNm[0], "What train?", true));
                    } else {
                        if (typeof result === 'undefined' || typeof result.ctatt.eta === 'undefined') {
                            noTrainsResponse(intent.slots.Destination.value, lineCode, alexa);
                            return;
                        }

                        console.log(JSON.stringify(result));
                        var trainList = processTrainArrivals(result.ctatt.eta, intent.slots.Destination.value, destinationCode, lineCode, alexa);

                        if (trainList.length === 0) {
                            noTrainsResponse(destination, lineCode, alexa);
                        }

                        var stringResponse = createStringResponse(trainList);
                        console.log(stringResponse);

                        alexa.tell(stringResponse);
                        //alexaCallback({}, buildSpeechletResponse("CTA Train", stringResponse, "What train?", true));
                    }
                }
            });
        });
    });
}

/*
 * 
 */
function processTrainArrivals(etaArray, destination, destinationCode, lineCode, callback) {
    console.log(etaArray);
    var trainList = [];

    for (var i = 0; i < etaArray.length; i++) {
        console.log(etaArray[i].trDr + " - " + destinationCode);
        //if(etaArray[i].destNm.toString().toUpperCase().localeCompare(destination.toUpperCase()) === 0)
        if (parseInt(etaArray[i].trDr) === destinationCode) {
            var eta = etaArray[i];

            var dateTimeString = eta.arrT.toString();
            var year = dateTimeString.substring(0, 4);
            var month = dateTimeString.substring(4, 6);
            var day = dateTimeString.substring(6, 8);
            var hour = dateTimeString.substring(9, 11);
            var min = dateTimeString.substring(12, 14);
            var sec = dateTimeString.substring(15, 17);
            var dateString = (year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec);

            var chicagoTime = moment.tz(dateString, "America/Chicago");

            var arrivalTime = new Date(chicagoTime);
            var dif = Math.abs(arrivalTime - new Date());
            var diffMins = Math.round(((dif % 86400000) % 3600000) / 60000);

            if (diffMins > 0) {
                trainList.push({
                    line: eta.rt,
                    Destination: eta.destNm,
                    ArrivalTime: diffMins
                });
            }
        }
    }

    return trainList;
}

/*
 *
 */
function createStringResponse(trainList) {
    var stringResponse = "";

    if (trainList.length === 0) {} else {
        for (var i = 0; i < trainList.length; i++) {
            if (i >= 2) {
                break;
            }

            var miunteVerbiage = "minutes";
            if (trainList[i].ArrivalTime === 1) {
                miunteVerbiage = "minute";
            }

            if (i === 0) {
                stringResponse = stringResponse + "The next " + getAlexaFriendlyDestination(trainList[i].Destination) + " bound " + getLineName(trainList[i].line) + " train will arrive in " + trainList[i].ArrivalTime + " " + miunteVerbiage + ". ";
            }

            if (i === 1) {
                stringResponse = stringResponse + "The following train will arrive in " + trainList[i].ArrivalTime + " " + miunteVerbiage + ". ";
            }
        }
    }

    console.log(stringResponse);
    return stringResponse;
}

/*
 *
 */
function noTrainsResponse(destination, lineCode, alexa) {
    var cardText = 'No trains scheduled for the next 20 minutes.'
    var speechText = 'There are no ' + getLineName(lineCode) + ' ' + destination + ' bound trains scheduled at this stop for the next 20 minutes.';
    var speechOutput = {
        speech: speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };

    alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
}

function getUserId(session) {
    return session.user.userId;
}

/*
 * Converts API codes to Alexa-friedly phrases
 */
function getLineName(lineCode) {
    switch (lineCode.toString()) {
        case "Red":
            return "Red-Line";
        case "Blue":
            return "Blue-Line";
        case "Brn":
            return "Brown-Line";
        case "G":
            return "Green-Line";
        case "Org":
            return "Orange-Line";
        case "P":
            return "Purple-Line";
        case "Pink":
            return "Pink-Line";
        case "Y":
            return "Yellow-Line";
    }
}

/*
 * Converts Alexa lines to the API codes
 */
function getLineCode(line, callback) {
    switch (line.toString().toUpperCase()) {
        case "RED":
            return "Red";
        case "BLUE":
            return "Blue";
        case "BROWN":
            return "Brn";
        case "GREEN":
            return "G";
        case "ORANGE":
            return "Org";
        case "PURPLE":
            return "P";
        case "PINK":
            return "Pink";
        case "YELLOW":
            return "Y";
    }
}

function getLineDestinationsString(lineCode) {
    switch (lineCode) {
        case "Red":
            return "Howard or 95th and the Dan Ryan";
        case "Blue":
            return "O'Hare or Forest Park";
        case "Brn":
            return "Kimball or the Loop";
        case "G":
            return "Harlem or Ashland and 63rd";
        case "Org":
            return "Midway or the Loop";
        case "P":
            return "Linden or the Loop";
        case "Pink":
            return "54th and Cermak or the Loop";
        case "Y":
            return "Howard or Skokie";
    }
}

/*
 * Retrieves user profile from Dynamo
 */
function getUserProfile(userId, alexaCallback, callback) {
    var params = {
        Key: {
            UserId: {
                S: userId
            }
        },
        TableName: "CTAUser"
    };

    dynamodb.getItem(params, function(err, data) {
        if (err) {
            console.log('Failed to get user profile: ' + err);
            alexaCallback({}, buildSpeechletResponse("CTA Train", "Something went wrong!  Please try again!", "Something went Wrong!", true));
        } else {
            console.log(data);
            if (data.Item) {
                callback(null, data.Item);
            } else {
                alexaCallback({}, buildSpeechletResponse("CTA Train", "Please set home station by saying: Set my home station to station. line...  Example: Set my home station to Belmont Brown-line", "Home Location Not Set", true));
            }
        }
    });
}

/*
 * Validates request for setting the station with the station Id
 */
function validateRequest(station, line, destination) {
    return StationLookup.Stations[station].process(line, destination);
}

/*
 * Converts destinations into Alexa-friendly phrases
 */
function getAlexaFriendlyDestination(destination) {
    switch (destination.toString().toUpperCase()) {
        case "95TH/DAN RYAN":
            return "Ninety Fifth and the Dan Ryan"
        case "ASHLAND/63RD":
            return "Ashland and sixty third"
        case "HARLEM/LAKE":
            return "Harlem and Lake"
        case "54TH/CERMAK":
            return "54th and Cermak"
        default:
            return destination;
    }
}



/*
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
        ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getColorFromSession(intent, session, callback) {
    var favoriteColor;
    var repromptText = null;
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";

    if (session.attributes) {
        favoriteColor = session.attributes.favoriteColor;
    }

    if (favoriteColor) {
        speechOutput = "Your favorite color is " + favoriteColor + ". Goodbye.";
        shouldEndSession = true;
    } else {
        speechOutput = "I'm not sure what your favorite color is, you can say, my favorite color " +
            " is red";
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: "CTA Train " + title,
            content: "CTA Train - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function getHTTPResponse(options, callback) {
    http.request(options, function(response) {
        response.setEncoding('utf8');
        var body = '';
        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            console.log(body);
            callback(body);
        });

    }).end();


}