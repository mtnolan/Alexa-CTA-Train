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
    console.log('event - ' + event);
    var skill = new TrainTrackerSkill();
    skill.execute(event, context);
};


var TrainTrackerSkill = function() {
    AlexaSkill.call(this, APP_ID);
    StationLookup.call();
    console.log('stations - ' + JSON.stringify(StationLookup.Stations));
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

            console.log(JSON.stringify(createParams));

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
function handleGetTrainIntent(intent, session, alexaCallback) {

    var userId = getUserId(session);

    getUserProfile(userId, callback, function(err, profile) {
        var path = '/api/1.0/ttarrivals.aspx?key=4bee6b7246d64327a003527128fd0da3&mapid=' + profile.HomeStation.S;
        var lineCode = '';
        if (typeof intent.slots.Line != 'undefined') {
            lineCode = getLineCode(intent.slots.Line.value, callback);
            path = path + '&rt=' + lineCode;
        } else if (typeof profile.Line != 'undefined') {
            lineCode = profile.Line.S;
            path = path + '&rt=' + lineCode;
        }

        //Ask what line

        var destination = intent.slots.Destination.value;

        var destinationCode = validateRequest(parseInt(profile.HomeStation.S), lineCode, destination);


        //If code is null - respond


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
                    callback({}, buildSpeechletResponse("Error", "Failed to parse CTA response.", "What train?", true));
                } else {
                    console.log(result.ctatt);
                    if (result.ctatt.errCd[0] != '0') {
                        console.log('Error code: ' + result.ctatt.errCd[0]);
                        if (result.ctatt.errCd[0] === '103') {
                            callback({}, buildSpeechletResponse("Error", "Invalid home station.  Please reset your Home station.", "What train?", true));
                        }
                        callback({}, buildSpeechletResponse("Error", result.ctatt.errNm[0], "What train?", true));
                    } else {
                        if (typeof result === 'undefined' || typeof result.ctatt.eta === 'undefined') {
                            noTrainsResponse(intent.slots.Destination.value, lineCode, callback);
                            return;
                        }

                        console.log(JSON.stringify(result));
                        var trainList = processTrainArrivals(result.ctatt.eta, intent.slots.Destination.value, destinationCode, lineCode, callback);

                        if (trainList.length === 0) {
                            noTrainsResponse(destination, lineCode, callback);
                        }

                        var stringResponse = createStringResponse(trainList);
                        console.log(stringResponse);

                        callback({}, buildSpeechletResponse("CTA Train", stringResponse, "What train?", true));
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
function noTrainsResponse(destination, lineCode, callback) {
    var stringResponse = 'There are no ' + getLineName(lineCode) + ' ' + destination + ' bound trains scheduled at this stop for the next 20 minutes.';
    callback({}, buildSpeechletResponse("CTA Train", stringResponse, "No Trains Scheduled", true));
}

function getUserId(session) {
    return session.user.userId;
}

/*
 * Converts API codes to Alexa-friedly phrases
 */
function getLineName(line) {
    console.log(line.toString());
    switch (line.toString()) {
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
    console.log(line.toString());
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
};

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
    switch (station) {
        case 40830: //18th 
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }

            }
        case 41120: //35th-Bronzeville-IIT 
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40120: //35th/Archer  
            {
                switch (line) {
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 41270: //43rd 
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41080: //47th (Green Line)    
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41230: //47th (Red Line)  
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40130: //51st 
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40580: //54th/Cermak  
            {
                switch (line) {

                }

            }
        case 40910: //63rd 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40990: //69th 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40240: //79th 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 41430: //87th 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40450: //95th 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40680: //Adams/Wabash 
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, true);
                    case "G":
                        return processGreen(destination);
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 41240: //Addison (Blue Line)  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41440: //Addison (Brown Line) 
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 41420: //Addison (Red Line)   
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 41200: //Argyle   
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40660: //Armitage 
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 40290: //Ashland/63rd 
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40170: //Ashland (Green, Pink Lines)  
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41060: //Ashland (Orange Line)    
            {
                switch (line) {
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40010: //Austin (Blue Line)   
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41260: //Austin (Green Line)  
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41320: //Belmont (Red, Brown, Purple Lines)   
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, false);
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40060: //Belmont (Blue Line)  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40340: //Berwyn   
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 41380: //Bryn Mawr    
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40440: //California (Pink Line)   
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }

            }
        case 41360: //California (Green Line)  
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40570: //California (Blue Line-O'Hare Branch) 
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40780: //Central Park 
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }

            }
        case 40280: //Central (Green Line) 
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41250: //Central (Purple Line)    
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 41000: //Cermak-Chinatown 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 41690: //Cermak-McCormick Place   
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41410: //Chicago (Blue Line)  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40710: //Chicago (Brown Line) 
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 41450: //Chicago (Red Line)   
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40420: //Cicero (Pink Line)   
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }

            }
        case 40970: //Cicero (Blue Line-Forest Park Branch)    
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40480: //Cicero (Green Line)  
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40630: //Clark/Division   
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40380: //Clark/Lake   
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "Blue":
                        return processBlue(destination);
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, true);
                    case "G":
                        return processGreen(destination);
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40430: //Clinton (Blue Line)  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41160: //Clinton (Green Line) 
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41670: //Conservatory 
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40230: //Cumberland   
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40090: //Damen (Brown Line)   
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 40210: //Damen (Pink Line)    
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }

            }
        case 40590: //Damen (Blue Line-O'Hare Branch)  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40050: //Davis    
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 40690: //Dempster 
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 40140: //Dempster-Skokie  
            {
                switch (line) {
                    case "Y":
                        return processYellow(destination);
                    default:
                        return null;
                }

            }
        case 40530: //Diversey 
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 40320: //Division 
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40720: //Cottage Grove    
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40390: //Forest Park  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40520: //Foster   
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 40870: //Francisco    
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 41220: //Fullerton    
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, false);
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40510: //Garfield (Green Line)    
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41170: //Garfield (Red Line)  
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40490: //Grand (Blue Line)    
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40330: //Grand (Red Line) 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40760: //Granville    
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40940: //Halsted (Green Line) 
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41130: //Halsted (Orange Line)    
            {
                switch (line) {
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40980: //Harlem (Blue Line-Forest Park Branch)    
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40020: //Harlem (Green Line)  
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40750: //Harlem (Blue Line-O'Hare Branch) 
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40850: //Harold Washington Library-State/Van Buren    
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, true);
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 41490: //Harrison 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40900: //Howard   
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    case "Red":
                        return processRed(destination);
                    case "Y":
                        return processYellow(destination);
                    default:
                        return null;
                }

            }
        case 40810: //Illinois Medical District    
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40300: //Indiana  
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40550: //Irving Park (Blue Line)  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41460: //Irving Park (Brown Line) 
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 40070: //Jackson (Blue Line)  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40560: //Jackson (Red Line)   
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 41190: //Jarvis   
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 41280: //Jefferson Park   
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41180: //Kedzie (Brown Line)  
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 41040: //Kedzie (Pink Line)   
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }

            }
        case 41070: //Kedzie (Green Line)  
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40250: //Kedzie-Homan (Blue Line) 
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41150: //Kedzie (Orange Line) 
            {
                switch (line) {
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 41290: //Kimball  
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 41140: //King Drive   
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40600: //Kostner  
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }

            }
        case 41660: //Lake 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40700: //Laramie  
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41340: //LaSalle  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40160: //LaSalle/Van Buren    
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, true);
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40770: //Lawrence 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 41050: //Linden   
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 41020: //Logan Square 
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41300: //Loyola   
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40270: //Main 
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 40930: //Midway   
            {
                switch (line) {
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40790: //Monroe (Blue Line)   
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41090: //Monroe (Red Line)    
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 41330: //Montrose (Blue Line) 
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41500: //Montrose (Brown Line)    
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 41510: //Morgan   
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40100: //Morse    
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40650: //North/Clybourn   
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40400: //Noyes    
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 40180: //Oak Park (Blue Line) 
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41350: //Oak Park (Green Line)    
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41680: //Oakton-Skokie    
            {
                switch (line) {
                    case "Y":
                        return processYellow(destination);
                    default:
                        return null;
                }

            }
        case 40890: //O'Hare   
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41310: //Paulina  
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 41030: //Polk 
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }

            }
        case 40150: //Pulaski (Pink Line)  
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }

            }
        case 40920: //Pulaski (Blue Line-Forest Park Branch)   
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40030: //Pulaski (Green Line) 
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 40960: //Pulaski (Orange Line)    
            {
                switch (line) {
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40040: //Quincy/Wells 
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, true);
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40470: //Racine   
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40200: //Randolph/Wabash  
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, true);
                    case "G":
                        return processGreen(destination);
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40610: //Ridgeland    
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    default:
                        return null;
                }

            }
        case 41010: //Rockwell 
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 41400: //Roosevelt    
            {
                switch (line) {
                    case "G":
                        return processGreen(destination);
                    case "Org":
                        return processOrange(destination);
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40820: //Rosemont 
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40800: //Sedgwick 
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 40080: //Sheridan 
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40840: //South Boulevard  
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 40360: //Southport    
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }

            }
        case 40190: //Sox-35th 
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40260: //State/Lake   
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, true);
                    case "G":
                        return processGreen(destination);
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40880: //Thorndale    
            {
                switch (line) {
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40350: //UIC-Halsted  
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40730: //Washington/Wells 
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, true);
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40370: //Washington (Blue Line)   
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 41210: //Wellington   
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }

            }
        case 41480: //Western (Brown Line) 
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    default:
                        return null;
                }
            }
        case 40740: //Western (Pink Line)  
            {
                switch (line) {
                    case "Pink":
                        return processPink(destination);
                    default:
                        return null;
                }
            }
        case 40220: //Western (Blue Line-Forest Park Branch)   
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40670: //Western (Blue Line-O'Hare Branch)    
            {
                switch (line) {
                    case "Blue":
                        return processBlue(destination);
                    default:
                        return null;
                }

            }
        case 40310: //Western (Orange Line)    
            {
                switch (line) {
                    case "Org":
                        return processOrange(destination);
                    default:
                        return null;
                }

            }
        case 40540: //Wilson   
            {
                switch (line) {
                    case "P":
                        return processPurple(destination, false);
                    case "Red":
                        return processRed(destination);
                    default:
                        return null;
                }

            }
        case 40460: //Merchandise Mart
            {
                switch (line) {
                    case "Brn":
                        return processBrown(destination);
                    case "P":
                        return processPurple(destination, false);
                    default:
                        return null;
                }
            }
    }
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