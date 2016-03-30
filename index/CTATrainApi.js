var http = require('http');
var parse = require('xml2js').parseString;
var moment = require('moment-timezone');

var host = 'lapi.transitchicago.com';
var port = 80;
var pathPrefix = '/api/1.0/ttarrivals.aspx';
var apiKey = '4bee6b7246d64327a003527128fd0da3';

/*
 * 
 */
function processTrainArrivals(etaArray, destinationCode) {
	console.log('Trains - ' + etaArray);
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


function CTATrainApi() {

}

CTATrainApi.GetTrains = function(stationId, lineCode, destinationCode, errorResponse, goodResponse) {

	var path = pathPrefix + '?key=' + apiKey + '&mapid=' + stationId + '&rt=' + lineCode;

	var options = {
		host: host,
		port: port,
		path: path,
		method: 'GET'
	};

	getHTTPResponse(options, function(body) {
		console.log('BODY: ' + body);

		parse(body, function(err, result) {
			if (err != null) {
				console.log('Failed to parse CTA response - ' + err);
				errorHappenedResponse();
			} else {
				console.log('CTA response - ' + JSON.stringify(result.ctatt));
				if (result.ctatt.errCd[0] != '0') {
					errorHappenedResponse();
					return;
				} else {
					if (typeof result === 'undefined' || typeof result.ctatt.eta === 'undefined') {
						goodResponse([]);
						return;
					}

					var trainList = processTrainArrivals(result.ctatt.eta, destinationCode);
					console.log('train list - ' + JSON.stringify(trainList));
					goodResponse(trainList);
				}
			}
		});
	});
};
module.exports = CTATrainApi;