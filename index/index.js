var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
var AlexaSkill = require('./AlexaSkill');
var StationLookup = require('./StationLookup');
var CTATrainApi = require('./CTATrainApi');

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
	"GetHomeStation": function(intent, session, response) {
		handleGetHomeStation(intent, session, response);
	},
	"SetHomeStationLineReprompt": function(intent, session, response) {
		handleLineReprompt(intent, session, response);
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


//--------------------------INTENTS--------------------------------------------

/*
 *  SetHomeStation Intent
 *  Intent for setting a user's home station and line using the station's ID.
 */
function handleSetHomeStationIntent(intent, session, alexa) {
    var homeStation = intent.slots.StopId;
    line = intent.slots.Line;
    userId = getUserId(session);

    if (!homeStation) {
        var cardText = "Could not find station that station.";
        var speechText = "I could not find a station.  Please try again.";

        alexa.tellWithCard(speechText, "CTA Train Tracker", cardText);
    }

    var matchingStation = StationLookup.Stations[homeStation];

    if (!matchingStation) {
        console.log('matching station not found for id - ' + homeStation);
        var cardText = "Could not find station " + homeStation + '.';
        var speechText = "I could not find a station with that I. D.  Please try again, or set your station by name.";

        alexa.tellWithCard(speechText, "CTA Train Tracker", cardText);
    }

    console.log('Matching station: ' + JSON.stringify(matchingStation));

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
            errorHappenedResponse(alexa);
        } else {
            console.log("User - " + JSON.stringify(userId) + " HomeStation - " + JSON.stringify(homeStation) + ' Line - ' + JSON.stringify(line));

        }

    });
}

/*
 *  SetHomeStationByName Intent
 *  Intent for setting a user's home station and line using the station's name.
 */
function handleSetHomeStationByNameIntent(intent, session, alexa) {
	var homeStation = intent.slots.Station.value;
	line = intent.slots.Line;
	userId = getUserId(session);
	var lineCode = getLineCode(line.value);
	console.log('HomeStation - ' + homeStation + ' | Line - ' + lineCode);

	var matchingStations = StationLookup.FindStations(homeStation, lineCode);

	var matchingStation;
	if (matchingStations.length === 0) {
		var cardText = 'Could not find the station you were looking for: ' + homeStation;
		var speechText = "Hmm... I couldn't find a station by that name.  Please try again.";
		var speechOutput = {
			speech: speechText,
			type: AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		console.log('No stations found - ' + homeStation);
		alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
		return;
	} else if (matchingStations.length > 1) {
		//Check for line designation
		//Alexa - more then one stop found
		session.attributes.matchingStations = matchingStations;

		var cardText = '';
		speechText = '';
		repromptText = '';
		//Pick a line
		if (!lineCode) {
			pickLineResponse(session, alexa);
			return;
		} else //Only case this is hit is with blue line for Harlem and Western stations
		{
			blueMatchingNamesResponse(session, alexa);
			return;
		}
	} else {
		matchingStation = matchingStations[0];
	}

	putUserProfile(userId, matchingStation.stationId, lineCode, alexa, function(response) {
		setHomeStationResponse(response, matchingStation, lineCode, alexa);
	});
}

/*
 *  GetTrain Intent
 *  Intent for settings a user's home station and line using the station's name.
 */
function handleGetTrainIntent(intent, session, alexa) {
	var userId = getUserId(session);

	getUserProfile(userId, function() {
		errorHappenedResponse(alexa)
	}, function(data) {
		var profile;
		console.log(JSON.stringify(data));
		if (data.Item && data.Item.HomeStation.S) {
			profile = data.Item;
		} else {
			var cardText = "Home Location Not Set";
			var speechText = "Please set home station by saying: Set my home station to station name.  Example: Set my home station to Washington and Wells";
			var speechOutput = {
				speech: speechText,
				type: AlexaSkill.speechOutputType.PLAIN_TEXT
			};
			alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
			return;
		}

		var destination = intent.slots.Destination.value;
		var lineCode;
		var line;
		if (intent.slots.Line.value) {
			line = intent.slots.Line.value;
			lineCode = getLineCode(line);
		} else if (profile.Line) {
			lineCode = profile.Line.S;
		}

		if (!lineCode) {
			session.attributes.UserProfile = profile;
			session.attributes.Destination = destination;
			noDesignatedLineResponse(session, alexa, !line);
			return;
		}

		if (!destination) {
			var cardText = "Destination could not be determined.  Make sure you use the line's terminal stations when declaring a destination.";
			var speechText = "Hmm...  I couldn't determine the destination.  Please try again.";
			var speechOutput = {
				speech: speechText,
				type: AlexaSkill.speechOutputType.PLAIN_TEXT
			};
			alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
			return;
		}

		getTrains(profile.HomeStation.S, destination, lineCode, alexa);
	});
}


/*
 * GetHomeStation Intent
 * Intent for getting a user's home station.
 */
function handleGetHomeStation(intent, session, alexa) {
    console.log('get home station');
    var userId = getUserId(session);

    getUserProfile(userId, function() {
        errorHappenedResponse(alexa);
    }, function(data) {
        var profile;
        console.log(JSON.stringify(data));
        if (data.Item && data.Item.HomeStation.S) {
            var station = StationLookup.Stations[parseInt(data.Item.HomeStation.S)];

            console.log('Home Station Found - ' + JSON.stringify(station));

            var cardText = "Your home station is set to " + station.alexaFriendlyName + '.';
            var speechText = "Your home station is set to " + station.alexaFriendlyName + '.';
            var speechOutput = {
                speech: speechText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
        } else {
            var cardText = "Home Station Not Set";
            var speechText = "Your home station isn't set.  Please set home station by saying: Set my home station to station name.  Example: Set my home station to Washington and Wells";
            var speechOutput = {
                speech: speechText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
        }
    });
}

/*
 * SetHomeStationLineRepropt Intent
 * Intent for asking the user for a line to specify which
 * station they want to set for a home station.
 */
function handleLineReprompt(intent, session, alexa) {
	if (session.new) {
		var cardText = "To set your home station say 'Aelxa, tell CTA to set my home station to [station name]' or to get train arrivals say 'Alexa ask CTA when is the next [Destionation] bound [Line Color] line train?'";
		var speechText = "I didn't quite catch that.  Please try again.";
		var speechOutput = {
			speech: speechText,
			type: AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
		return;
	}
	var sessionType = session.attributes.sessionType;
	userId = getUserId(session);
	previousMatchingStations = session.attributes.matchingStations;
	line = intent.slots.LineOrBlueSide.value;

	if (sessionType === 'PickLineMultiple') {
		console.log('pick line multiple');
		if (!line) {
			noDesignatedLineResponse(session, alexa, false);
			return;
		}

		var lineCode = getLineCode(line);
		if (!lineCode) {
			noDesignatedLineResponse(session, alexa, false);
			return;
		}

		processHomeStationLineReprompt(userId, previousMatchingStations, lineCode, session, alexa)
	} else if (sessionType === 'BlueMatching') {
		console.log('Blue Matching');
		processHomeStationBlueReprompt(userId, previousMatchingStations, line, alexa);
	} else if (sessionType === 'PickLine') {
		var stationId = session.attributes.UserProfile.HomeStation.S;
		var destination = session.attributes.Destination;
		var lineCode = getLineCode(line);
		if (!lineCode) {
			noDesignatedLineResponse(session, alexa, false);
			return;
		}
		getTrains(stationId, destination, lineCode, alexa);
	}
}


//------------------------------Helpers--------------------------------------

function getTrains(stationId, destination, lineCode, alexa) {
	var destinationCode = validateRequest(parseInt(stationId), lineCode, destination);

	if (destinationCode === undefined) {
		if (destination.toUpperCase() === 'IN') {
			destination = 'Inbound';
		} else if (destination.toUpperCase === 'OUT') {
			destination = 'Outbound';
		}

		var lineName = getLineName(lineCode);
		var cardText = destination + " is an invalid " + lineName + " destination.";
		var speechText = destination + " is an invalid " + lineName + " destination.  Please use " + getLineDestinationsString(lineCode) + ' as destinations for ' + lineName + ' trains.';

		var speechOutput = {
			speech: speechText,
			type: AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
		return;
	} else if (destinationCode === null) {
		var lineName = getLineName(lineCode);
		var cardText = 'The ' + lineName + ' does not run on your designated home station.';
		var speechText = 'The ' + lineName + ' does not run on your designated home station.';

		var speechOutput = {
			speech: speechText,
			type: AlexaSkill.speechOutputType.PLAIN_TEXT
		};

		alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
		return;
	}

	console.log('Destination - ' + destination + ' Code - ' + destinationCode);

	CTATrainApi.GetTrains(stationId, lineCode, destinationCode, function() {
		errorHappenedResponse(alexa);
	}, function(trainList) {

		if (trainList.length === 0) {
			noTrainsResponse(destination, lineCode, alexa);
		}

		var stringResponse = createStringResponse(trainList);
		console.log(stringResponse);

		alexa.tell(stringResponse);
	});
}

/*
 * Processing method for handling a user specifying a train line when prompted
 */
function processHomeStationLineReprompt(userId, previousMatchingStations, lineCode, session, alexa) {
	var matchingStations = [];
	console.log('process home station line reprompt');
	for (var key in previousMatchingStations) {
		var stationId = previousMatchingStations[key].stationId;

		if (StationLookup.Stations[stationId].hasLine(lineCode)) {
			matchingStations.push(previousMatchingStations[key]);
		}
	}

	if (matchingStations.length > 1) {
		blueMatchingNamesResponse(session, alexa);
	} else if (matchingStations.length === 0) {
		var lineName = getLineName(lineCode);
		cardText = 'The ' + lineName + ' does not run at this station.';
		speechText = 'The ' + lineName + ' does not run at this station.  Please try setting your home station again.';
		var speechOutput = {
			speech: speechText,
			type: AlexaSkill.speechOutputType.PLAIN_TEXT
		};
		alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
	} else {
		console.log('1 found');
		var matchingStation = matchingStations[0];

		putUserProfile(userId, matchingStation.stationId, lineCode, alexa, function(response) {
			setHomeStationResponse(response, matchingStation, lineCode, alexa);
		});
	}
}

/*
 * Processing method for handling a user specifying O'Hare or Forest park side line.
 * Method only used for multiple stations with the same name on the blue line (Harlem, Western)
 */
function processHomeStationBlueReprompt(userId, previousMatchingStations, blueSide, alexa) {
	//Handles O'Hare or Forest Park
	for (var key in previousMatchingStations) {

		var station = previousMatchingStations[key];
		console.log(station.blueLineSide +'===' + blueSide);

		if (station.blueLineSide && station.blueLineSide.toUpperCase() === blueSide.toUpperCase()) {
			putUserProfile(userId, station.stationId, 'Blue', alexa, function(response) {
				setHomeStationResponse(response, station, 'Blue', alexa);
			});
		}
	}
}

/*
 *
 */
function processTrainArrivals(etaArray, destination, destinationCode, lineCode, callback) {
    console.log(etaArray);
    var trainList = [];

    for (var i = 0; i < etaArray.length; i++) {
        console.log(etaArray[i].trDr + " - " + destinationCode);
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
        for (var i = 0; i < trainList.length; i++)
        {
          var miunteVerbiage = "minutes";
          if (trainList[i].ArrivalTime === 1) {
              miunteVerbiage = "minute";
          }
          if (i === 0) {
              stringResponse = stringResponse + "The next " + getAlexaFriendlyDestination(trainList[i].Destination) + " bound " + getLineName(trainList[i].line) + " train will arrive in " + trainList[i].ArrivalTime + " " + miunteVerbiage + ". ";
          } else {
            if (i === 1) {
              if(trainList.length > 2)
              {
                stringResponse = stringResponse + "The following trains will arrive in " + trainList[i].ArrivalTime + " " + miunteVerbiage;
              } else {
                stringResponse = stringResponse + "The following train will arrive in " + trainList[i].ArrivalTime + " " + miunteVerbiage;
              }
            }

            if(i > 1) {
              stringResponse = stringResponse + trainList[i].ArrivalTime + " " + miunteVerbiage;
            }

            if(i === trainList.length - 1) {
              stringResponse = stringResponse + ".";
            } else {
              stringResponse = stringResponse + ", ";
            }
        }
      }
    }

    console.log(stringResponse);
    return stringResponse;
}

/*
<<<<<<< HEAD
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

/*
 * Sends response after setting a user's home station
 */
function setHomeStationResponse(response, matchingStation, lineCode, alexa) {

    if (lineCode) {
        var lineName = getLineName(lineCode);
        var cardText = 'Home station has been set to ' + matchingStation.alexaFriendlyName + ' ' + lineName + '.';
        var speechText = 'Your home station has been set to ' + matchingStation.alexaFriendlyName + ' ' + lineName + '.';
    } else {
        var cardText = 'Home station has been set to ' + matchingStation.alexaFriendlyName + '.';
        var speechText = 'Your home station has been set to ' + matchingStation.alexaFriendlyName + '.';
    }

    var speechOutput = {
        speech: speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    console.log(JSON.stringify(response));
    alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
}

/*
 * Helper method to get user id from session
 */
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
function getLineCode(line) {

    console.log(JSON.stringify(line));
    if (!line) return undefined;
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
    console.log('Could not find line - ' + line.toString().toUpperCase());
}

/*
 * Gets line destinations from line codes
 */
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
function getUserProfile(userId, failureFunction, successFunction) {
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
            failureFunction();
        } else {
            console.log('Successfully got user profile');
            successFunction(data);
        }
    });
}

/*
 * Helper method to put a user profile to dynamo
 */
function putUserProfile(userId, homeStationId, lineCode, alexa, continueFunction) {
    var createParams;
    console.log('Setting user profile.  UserId - ' + userId + ' HomeStationId - ' + homeStationId + ' Line- ' + lineCode);
    createParams = {
        Item: {
            'UserId': {
                S: userId
            },
            'HomeStation': {
                S: homeStationId.toString()
            },
            'Line': lineCode === undefined ? null : {
                S: lineCode
            }
        },
        TableName: "CTAUser"
    };

    dynamodb.putItem(createParams, function(err, data) {
        if (err != null) {
            console.log('Error put user profile - ' + err);
            errorHappenedResponse(alexa);
        } else {
            console.log('Put user profile success - ' + JSON.stringify(data));
            continueFunction(data);
        }
    });
}

/*
 * Validates request for setting the station with the station Id
 */
function validateRequest(station, line, destination) {
    console.log('Validating request.  Station - ' + station + ' Line - ' + line + ' destination - ' + destination);
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


//--------------------RESPONSES----------------------------

/*
 * Sends response for no trains found at station
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

/*
 * Sends response for user to pick a line if home station couldn't be determined.
 */
function pickLineResponse(session, alexa) {
	session.attributes.sessionType = 'PickLineMultiple'
	var cardText = 'Found more then one station!  Please specify a line.  Example: Blue-Line';
	var speechText = 'I found more then one station with that name.  What train line is at this stop?';
	var repromptText = 'You can respond with the color of the line for this stop.  Example: Blue-Line';

	var speechOutput = {
		speech: speechText,
		type: AlexaSkill.speechOutputType.PLAIN_TEXT
	};
	var repromptOutput = {
		speech: repromptText,
		type: AlexaSkill.speechOutputType.PLAIN_TEXT
	};

	alexa.askWithCard(speechOutput, repromptOutput, "CTA Train Tracker", cardText);
}

function noDesignatedLineResponse(session, alexa, undefinedLine) {
	session.attributes.sessionType = 'PickLine'
	if (undefinedLine) {
		var speechText = 'What line would you like to check trains for?';
	} else {
		var speechText = "Hmm...  I didn't quite understand what you said.  What line would you like to check trains for?";
	}
	var cardText = 'What line would you like to check trains for?  (Red, Blue, Brown etc...)';
	var repromptText = 'You can respond with the color of the line you wish to check trains for.  Example: Blue-Line';
	var speechOutput = {
		speech: speechText,
		type: AlexaSkill.speechOutputType.PLAIN_TEXT
	};
	var repromptOutput = {
		speech: repromptText,
		type: AlexaSkill.speechOutputType.PLAIN_TEXT
	};

	alexa.askWithCard(speechOutput, repromptOutput, "CTA Train Tracker", cardText);
}

function blueMatchingNamesResponse(session, alexa) {
	session.attributes.sessionType = 'BlueMatching';
	var cardText = "That line has more then one station with that name.  Is this station closer to O'Hare or Forst Park?";
	var speechText = "That line has more then one station with that name.  Is this station closer to O'Hare or Forst Park?";
	var repromptText = "You can respond O'Hare or Forest Park";

	var speechOutput = {
		speech: speechText,
		type: AlexaSkill.speechOutputType.PLAIN_TEXT
	};
	var repromptOutput = {
		speech: repromptText,
		type: AlexaSkill.speechOutputType.PLAIN_TEXT
	};

	alexa.askWithCard(speechOutput, repromptOutput, "CTA Train Tracker", cardText);
}

/*
 * Sends response after setting a user's home station
 */
function setHomeStationResponse(response, matchingStation, lineCode, alexa) {

	if (lineCode) {
		var lineName = getLineName(lineCode);
		var cardText = 'Home station has been set to ' + matchingStation.alexaFriendlyName + ' ' + lineName + '.';
		var speechText = 'Your home station has been set to ' + matchingStation.alexaFriendlyName + ' ' + lineName + '.';
	} else {
		var cardText = 'Home station has been set to ' + matchingStation.alexaFriendlyName + '.';
		var speechText = 'Your home station has been set to ' + matchingStation.alexaFriendlyName + '.';
	}

	var speechOutput = {
		speech: speechText,
		type: AlexaSkill.speechOutputType.PLAIN_TEXT
	};
	console.log(JSON.stringify(response));
	alexa.tellWithCard(speechOutput, "CTA Train Tracker", cardText);
}

/*
 * Sends response after unexpected error happened
 */
function errorHappenedResponse(alexa) {
	var cardText = "Something went wrong...  Please try again.";
	var speechText = "Hmm...  Something seems to have gone wrong.  Please try again.";

	alexa.tellWithCard(speechText, "CTA Train Tracker", cardText);
}
