var Stations = {};

function StationLookup() {

	console.log('Creating Station Lookup...');
	//18th
	Stations[40830] = new Station(40830, '18th Street', ['Pink'], ['Eighteenth', 'Eighteenth Street', '18th'], false, undefined);

	//35th-Bronzeville-IIT
	Stations[41120] = new Station(41120, '35th Street', ['G'], ['Thirty Fifth', 'Thirty Fifth and Archer', 'Thirty Fifth Street', '35th'], false, undefined);

	//35th/Archer
	Stations[40120] = new Station(40120, '35th and Archer', ['Org'], ['Thirty Fifth', 'Bronzeville', 'IIT', 'Thirty Fifth Street', '35th'], false, undefined);

	//43rd
	Stations[41270] = new Station(41270, '43rd Street', ['G'], ['Fourty Thir,  Fourty Third Street', '43rd'], false, undefined);

	//47th (Green Line)
	Stations[41080] = new Station(41080, '47th Street', ['G'], ['Fourty Seventh', 'Fourty Seventh Street', '47th'], false, undefined);

	//47th (Red Line)
	Stations[41230] = new Station(41230, '47th Street', ['Red'], ['Fourty Seventh', 'Fourty Seventh Street', '47th'], false, undefined);

	//51st
	Stations[40130] = new Station(40130, '51st Street', ['G'], ['Fifty First', 'Fifty First Street', '51st'], false, undefined);

	//54th/Cermak
	Stations[40580] = new Station(40580, '54th and Cermak', ['Fifty Fourth and Cermak', '54th'], [false], false, undefined);

	//63rd
	Stations[40910] = new Station(40910, '63rd Street', ['Red'], ['Sixty Third', 'Sixty Third Street', '63rd'], false, undefined);

	//69th
	Stations[40990] = new Station(40990, '69th Street', ['Red'], ['Sixty Nineth', 'Sixty Nineth Street', '69th'], false, undefined);

	//79th
	Stations[40240] = new Station(40240, '79th Street', ['Red'], ['Seventy Nineth', 'Seventy Nineth Street', '79th'], false, undefined);

	//87th
	Stations[41430] = new Station(41430, '87th Street', ['Red'], ['Eighty Seventh', 'Eighty Seventh Street', '87th'], false, undefined);

	//95th
	Stations[40450] = new Station(40450, '95th Street', ['Red'], ['Ninety Fifth', 'Ninety Fifth Street', '95th'], false, undefined);

	//Adams/Wabash
	Stations[40680] = new Station(40680, 'Adams and Wabash', ['Pink', 'Brn', 'P', 'G', 'Org'], ['Adams and Wabash', 'Wabash and Adams'], false, undefined);

	//Addison (Blue Line)
	Stations[41240] = new Station(41240, 'Addison', ['Blue'], ['Addison'], false, undefined);

	//Addison (Brown Line)
	Stations[41440] = new Station(41440, 'Addison', ['Brn'], ['Addison'], false, undefined);

	//Addison (Red Line)
	Stations[41420] = new Station(41420, 'Addison', ['P', 'Red'], ['Addison'], false, undefined);

	//Argyle
	Stations[41200] = new Station(41200, 'Argyle', ['Red'], ['Argyle'], false, undefined);

	//Armitage
	Stations[40660] = new Station(40660, 'Armitage', ['Brn', 'P'], ['Armitage'], false, undefined);

	//Ashland/63rd
	Stations[40290] = new Station(40290, 'Ashland and 63rd Street', ['G'], ['Ashland and 63rd', 'Ashland and 63rd Street', '63rd and Ashland', '63rd Street and Ashland'], false, undefined);

	//Ashland (Green, Pink Lines)
	Stations[40170] = new Station(40170, 'Ashland', ['Pink', 'G'], ['Ashland'], false, undefined);

	//Ashland (Orange Line)
	Stations[41060] = new Station(41060, 'Ashland', ['Org'], ['Ashland'], false, undefined);

	//Austin (Blue Line)
	Stations[40010] = new Station(40010, 'Austin', ['Blue'], ['Austin'], false, undefined);

	//Austin (Green Line)
	Stations[41260] = new Station(41260, 'Austin', ['G'], ['Austin'], false, undefined);

	//Belmont (Red, Brown, Purple Lines)
	Stations[41320] = new Station(41320, 'Belmont', ['Brn', 'P', 'Red'], ['Belmont'], false, undefined);

	//Belmont (Blue Line)
	Stations[40060] = new Station(40060, 'Belmont', ['Blue'], ['Belmont'], false, undefined);

	//Berwyn
	Stations[40340] = new Station(40340, 'Berwyn', ['Red'], ['Berwyn'], false, undefined);

	//Bryn Mawr
	Stations[41380] = new Station(41380, 'Bryn Mawr', ['Red'], ['Bryn Mawr'], false, undefined);

	//California (Pink Line)
	Stations[40440] = new Station(40440, 'California', ['Pink'], ['California'], false, undefined);

	//California (Green Line)
	Stations[41360] = new Station(41360, 'California', ['G'], ['California'], false, undefined);

	//California (Blue Line-O'Hare Branch)
	Stations[40570] = new Station(40570, 'California', ['Blue'], ['California'], false, undefined);

	//Central Park
	Stations[40780] = new Station(40780, 'Central Park', ['Pink'], ['Central Park'], false, undefined);

	//Central (Green Line)
	Stations[40280] = new Station(40280, 'Central', ['G'], ['Central'], false, undefined);

	//Central (Purple Line)
	Stations[41250] = new Station(41250, 'Central', ['P'], ['Central'], false, undefined);

	//Cermak-Chinatown
	Stations[41000] = new Station(41000, 'Cermak', ['Red'], ['Cermak', 'Chinatown'], false, undefined);

	//Cermak-McCormick Place
	Stations[41690] = new Station(41690, 'Cermak', ['G'], ['Cermak', 'McCormick Place'], false, undefined);

	//Chicago (Blue Line)
	Stations[41410] = new Station(41410, 'Chicago', ['Blue'], ['Chicago'], false, undefined);

	//Chicago (Brown Line)
	Stations[40710] = new Station(40710, 'Chicago', ['Brn', 'P'], ['Chicago'], false, undefined);

	//Chicago (Red Line)
	Stations[41450] = new Station(41450, 'Chicago', ['Red'], ['Chicago'], false, undefined);

	//Cicero (Pink Line)
	Stations[40420] = new Station(40420, 'Cicero', ['Pink'], ['Cicero'], false, undefined);

	//Cicero (Blue Line-Forest Park Branch)
	Stations[40970] = new Station(40970, 'Cicero', ['Blue'], ['Cicero'], false, undefined);

	//Cicero (Green Line)
	Stations[40480] = new Station(40480, 'Cicero', ['G'], ['Cicero'], false, undefined);

	//Clark/Division
	Stations[40630] = new Station(40630, 'Clark and Division', ['Red'], ['Clark and Division', 'Division and Clark'], false, undefined);

	//Clark/Lake
	Stations[40380] = new Station(40380, 'Clark and Lake', ['Pink', 'Blue', 'Brn', 'P', 'G', 'Org'], ['Clark and Lake', 'Lake and Clark'], false, undefined);

	//Clinton (Blue Line)
	Stations[40430] = new Station(40430, 'Clinton', ['Blue'], ['Clinton'], false, undefined);

	//Clinton (Green Line)
	Stations[41160] = new Station(41160, 'Clinton', ['Pink', 'G'], ['Clinton'], false, undefined);

	//Conservatory
	Stations[41670] = new Station(41670, 'Conservatory', ['G'], ['Conservatory'], false, undefined);

	//Cumberland
	Stations[40230] = new Station(40230, 'Cumberland', ['Blue'], ['Cumberland'], false, undefined);

	//Damen (Brown Line)
	Stations[40090] = new Station(40090, 'Damen', ['Brn'], ['Damen'], false, undefined);

	//Damen (Pink Line)
	Stations[40210] = new Station(40210, 'Damen', ['Pink'], ['Damen'], false, undefined);

	//Damen (Blue Line-O'Hare Branch)
	Stations[40590] = new Station(40590, 'Damen', ['Blue'], ['Damen'], false, undefined);

	//Davis
	Stations[40050] = new Station(40050, 'Davis', ['P'], ['Davis'], false, undefined);

	//Dempster
	Stations[40690] = new Station(40690, 'Dempster', ['P'], ['Dempster'], false, undefined);

	//Dempster-Skokie
	Stations[40140] = new Station(40140, 'Dempster Skokie', ['Y'], ['Dempster Skokie'], false, undefined);

	//Diversey
	Stations[40530] = new Station(40530, 'Diversey', ['Brn', 'P'], ['Diversey'], false, undefined);

	//Division
	Stations[40320] = new Station(40320, 'Division', ['Blue'], ['Division'], false, undefined);

	//Cottage Grove
	Stations[40720] = new Station(40720, 'Cottage Grove', ['G'], ['Cottage Grove'], false, undefined);

	//Forest Park
	Stations[40390] = new Station(40390, 'Forest Park', ['Blue'], ['Forest Park'], false, undefined);

	//Foster
	Stations[40520] = new Station(40520, 'Foster', ['P'], ['Foster'], false, undefined);

	//Francisco
	Stations[40870] = new Station(40870, 'Francisco', ['Brn'], ['Francisco'], false, undefined);

	//Fullerton
	Stations[41220] = new Station(41220, 'Fullerton', ['Brn', 'P', 'Red'], ['Fullerton'], false, undefined);

	//Garfield (Green Line)
	Stations[40510] = new Station(40510, 'Garfield', ['G'], ['Garfield'], false, undefined);

	//Garfield (Red Line)
	Stations[41170] = new Station(41170, 'Garfield', ['Red'], ['Garfield'], false, undefined);

	//Grand (Blue Line)
	Stations[40490] = new Station(40490, 'Grand', ['Blue'], ['Grand'], false, undefined);

	//Grand (Red Line)
	Stations[40330] = new Station(40330, 'Grand', ['Red'], ['Grand'], false, undefined);

	//Granville
	Stations[40760] = new Station(40760, 'Granville', ['Red'], ['Granville'], false, undefined);

	//Halsted (Green Line)
	Stations[40940] = new Station(40940, 'Halsted', ['G'], ['Halsted'], false, undefined);

	//Halsted (Orange Line)
	Stations[41130] = new Station(41130, 'Halsted', ['Org'], ['Halsted'], false, undefined);

	//Harlem (Blue Line-Forest Park Branch)
	Stations[40980] = new Station(40980, 'Harlem', ['Blue'], ['Harlem'], false, 'Forest Park');

	//Harlem (Green Line)
	Stations[40020] = new Station(40020, 'Harlem', ['G'], ['Harlem'], false, undefined);

	//Harlem (Blue Line-O'Hare Branch)
	Stations[40750] = new Station(40750, 'Harlem', ['Blue'], ['Harlem'], false, "O'Hare");

	//Harold Washington Library-State/Van Buren
	Stations[40850] = new Station(40850, 'State and Van Buren', ['Pink', 'Brn', 'P', 'Org'], ['Harold Washington Library', 'State and Van Buren', 'Van Buren and State'], false, undefined);

	//Harrison
	Stations[41490] = new Station(41490, 'Harrison', ['Red'], ['Harrison'], false, undefined);

	//Howard
	Stations[40900] = new Station(40900, 'Howard', ['P', 'Red', 'Y'], ['Howard'], false, undefined);

	//Illinois Medical District
	Stations[40810] = new Station(40810, 'Illinois Medical District', ['Blue'], ['Illinois Medical District'], false, undefined);

	//Indiana
	Stations[40300] = new Station(40300, 'Indiana', ['G'], ['Indiana'], false, undefined);

	//Irving Park (Blue Line)
	Stations[40550] = new Station(40550, 'Irving Park', ['Blue'], ['Irving Park'], false, undefined);

	//Irving Park (Brown Line)
	Stations[41460] = new Station(41460, 'Irving Park', ['Brn'], ['Irving Park'], false, undefined);

	//Jackson (Blue Line)
	Stations[40070] = new Station(40070, 'Jackson', ['Blue'], ['Jackson'], false, undefined);

	//Jackson (Red Line)
	Stations[40560] = new Station(40560, 'Jackson', ['Red'], ['Jackson'], false, undefined);

	//Jarvis
	Stations[41190] = new Station(41190, 'Jarvis', ['Red'], ['Jarvis'], false, undefined);

	//Jefferson Park
	Stations[41280] = new Station(41280, 'Jefferson Park', ['Blue'], ['Jefferson Park'], false, undefined);

	//Kedzie (Brown Line)
	Stations[41180] = new Station(41180, 'Kedzie', ['Brn'], ['Kedzie'], false, undefined);

	//Kedzie (Pink Line)
	Stations[41040] = new Station(41040, 'Kedzie', ['Pink'], ['Kedzie'], false, undefined);

	//Kedzie (Green Line)
	Stations[41070] = new Station(41070, 'Kedzie', ['G'], ['Kedzie'], false, undefined);

	//Kedzie-Homan (Blue Line)
	Stations[40250] = new Station(40250, 'Kedzie', ['Blue'], ['Kedzie', 'Homan'], false, undefined);

	//Kedzie (Orange Line)
	Stations[41150] = new Station(41150, 'Kedzie', ['Org'], ['Kedzie'], false, undefined);

	//Kimball
	Stations[41290] = new Station(41290, 'Kimball', ['Brn'], ['Kimball'], false, undefined);

	//King Drive
	Stations[41140] = new Station(41140, 'King Drive', ['G'], ['King Drive'], false, undefined);

	//Kostner
	Stations[40600] = new Station(40600, 'Kostner', ['Pink'], ['Kostner'], false, undefined);

	//Lake
	Stations[41660] = new Station(41660, 'Lake', ['Red'], ['Lake'], false, undefined);

	//Laramie
	Stations[40700] = new Station(40700, 'Laramie', ['G'], ['Laramie'], false, undefined);

	//LaSalle
	Stations[41340] = new Station(41340, 'LaSalle', ['Blue'], ['LaSalle'], false, undefined);

	//LaSalle/Van Buren
	Stations[40160] = new Station(40160, 'LaSalle and Van Buren', ['Pink', 'Brn', 'P', 'Org'], ['LaSalle and Van Buren','Van Buren and LaSalle'], false, undefined);

	//Lawrence
	Stations[40770] = new Station(40770, 'Lawrence', ['Red'], ['Lawrence'], false, undefined);

	//Linden
	Stations[41050] = new Station(41050, 'Linden', ['P'], ['Linden'], false, undefined);

	//Logan Square
	Stations[41020] = new Station(41020, 'Logan Square', ['Blue'], ['Logan Square'], false, undefined);

	//Loyola
	Stations[41300] = new Station(41300, 'Loyola', ['Red'], ['Loyola'], false, undefined);

	//Main
	Stations[40270] = new Station(40270, 'Main', ['P'], ['Main'], false, undefined);

	//Midway
	Stations[40930] = new Station(40930, 'Midway', ['Org'], ['Midway'], false, undefined);

	//Monroe (Blue Line)
	Stations[40790] = new Station(40790, 'Monroe', ['Blue'], ['Monroe'], false, undefined);

	//Monroe (Red Line)
	Stations[41090] = new Station(41090, 'Monroe', ['Red'], ['Monroe'], false, undefined);

	//Montrose (Blue Line)
	Stations[41330] = new Station(41330, 'Montrose', ['Blue'], ['Montrose'], false, undefined);

	//Montrose (Brown Line)
	Stations[41500] = new Station(41500, 'Montrose', ['Brn'], ['Montrose'], false, undefined);

	//Morgan
	Stations[41510] = new Station(41510, 'Morgan', ['Pink', 'G'], ['Morgan'], false, undefined);

	//Morse
	Stations[40100] = new Station(40100, 'Morse', ['Red'], ['Morse'], false, undefined);

	//North/Clybourn
	Stations[40650] = new Station(40650, 'North and Clybourn', ['Red', 'Red'], ['North and Clybourn', 'Clybourn and North', 'North Avenue and Clybourn'], false, undefined);

	//Noyes
	Stations[40400] = new Station(40400, 'Noyes', ['P'], ['Noyes'], false, undefined);

	//Oak Park (Blue Line)
	Stations[40180] = new Station(40180, 'Oak Park', ['Blue'], ['Oak Park'], false, undefined);

	//Oak Park (Green Line)
	Stations[41350] = new Station(41350, 'Oak Park', ['G'], ['Oak Park'], false, undefined);

	//Oakton-Skokie
	Stations[41680] = new Station(41680, 'Oakton', ['Y'], ['Oakton'], false, undefined);

	//O'Hare
	Stations[40890] = new Station(40890, "O'Hare", ['Blue'], ["O'Hare"], false, undefined);

	//Paulina
	Stations[41310] = new Station(41310, 'Paulina', ['Brn'], ['Paulina'], false, undefined);

	//Polk
	Stations[41030] = new Station(41030, 'Polk', ['Pink'], ['Polk'], false, undefined);

	//Pulaski (Pink Line)
	Stations[40150] = new Station(40150, 'Pulaski', ['Pink'], ['Pulaski'], false, undefined);

	//Pulaski (Blue Line-Forest Park Branch)
	Stations[40920] = new Station(40920, 'Pulaski', ['Blue'], ['Pulaski'], false, undefined);

	//Pulaski (Green Line)
	Stations[40030] = new Station(40030, 'Pulaski', ['G'], ['Pulaski'], false, undefined);

	//Pulaski (Orange Line)
	Stations[40960] = new Station(40960, 'Pulaski', ['Org'], ['Pulaski'], false, undefined);

	//Quincy/Wells
	Stations[40040] = new Station(40040, 'Quincy', ['Pink', 'Brn', 'P', 'Org'], ['Quincy and Wells', 'Quincy', 'Wells and Quincy'], false, undefined);

	//Racine
	Stations[40470] = new Station(40470, 'Racine', ['Blue'], ['Racine'], false, undefined);

	//Randolph/Wabash
	Stations[40200] = new Station(40200, 'Randolph and Wabash', ['Pink', 'Brn', 'P', 'G', 'Org'], ['Randolph and Wabash', 'Wabash and Randolph'], false, undefined);

	//Ridgeland
	Stations[40610] = new Station(40610, 'Ridgeland', ['G'], ['Ridgeland'], false, undefined);

	//Rockwell
	Stations[41010] = new Station(41010, 'Rockwell', ['Brn'], ['Rockwell'], false, undefined);

	//Roosevelt
	Stations[41400] = new Station(41400, 'Roosevelt', ['G', 'Org', 'Red'], ['Roosevelt'], false, undefined);

	//Rosemont
	Stations[40820] = new Station(40820, 'Rosemont', ['Blue'], ['Rosemont'], false, undefined);

	//Sedgwick
	Stations[40800] = new Station(40800, 'Sedgwick', ['Brn', 'P'], ['Sedgwick'], false, undefined);

	//Sheridan
	Stations[40080] = new Station(40080, 'Sheridan', ['P', 'Red'], ['Sheridan'], false, undefined);

	//South Boulevard
	Stations[40840] = new Station(40840, 'South Boulevard', ['P'], ['South Boulevard'], false, undefined);

	//Southport
	Stations[40360] = new Station(40360, 'Southport', ['Brn'], ['Southport'], false, undefined);

	//Sox-35th
	Stations[40190] = new Station(40190, '35th Street', ['Red'], ['U S Cellular Field', 'Sox Park', 'Thirty fifth', 'Thirty Fifth Street', '35th'], false, undefined);

	//State/Lake
	Stations[40260] = new Station(40260, 'State and Lake', ['Pink', 'Brn', 'P', 'G', 'Org'], ['State and Lake', 'Lake and State'], false, undefined);

	//Thorndale
	Stations[40880] = new Station(40880, 'Thorndale', ['Red'], ['Thorndale'], false, undefined);

	//UIC-Halsted
	Stations[40350] = new Station(40350, 'UIC Halsted', ['Blue'], ['UIC', 'Halsted'], false, undefined);

	//Washington/Wells
	Stations[40730] = new Station(40730, 'Washington and Wells', ['Pink', 'Brn', 'P', 'Org'], ['Washington and Wells', 'Wells and Washington'], false, undefined);

	//Washington (Blue Line)
	Stations[40370] = new Station(40370, 'Washington', ['Blue'], ['Washington'], false, undefined);

	//Wellington
	Stations[41210] = new Station(41210, 'Wellington', ['Brn', 'P'], ['Wellington'], false, undefined);

	//Western (Brown Line)
	Stations[41480] = new Station(41480, 'Western', ['Brn'], ['Western'], false, undefined);

	//Western (Pink Line)
	Stations[40740] = new Station(40740, 'Western', ['Pink'], ['Western'], false, undefined);

	//Western (Blue Line-Forest Park Branch)
	Stations[40220] = new Station(40220, 'Western', ['Blue'], ['Western'], false, 'Forest Park');

	//Western (Blue Line-O'Hare Branch)
	Stations[40670] = new Station(40670, 'Western', ['Blue'], ['Western'], false, "O'Hare");

	//Western (Orange Line)
	Stations[40310] = new Station(40310, 'Western', ['Org'], ['Western'], false, undefined);

	//Wilson
	Stations[40540] = new Station(40540, 'Wilson', ['P', 'Red'], ['Western'], false, undefined);

	//Merchandise Mart
	Stations[40460] = new Station(40460, 'Merchandise Mart', ['Brn', 'P'], ['Western'], false, undefined);


}


StationLookup.Stations = Stations;
StationLookup.FindStations = function(alias, lineCode) {

	var matchingStations = [];

	if (lineCode) {
		console.log('valid line code - ' + lineCode);
	} else {
		console.log('invalid line code - ' + lineCode);
	}

	for (var key in StationLookup.Stations) {
		if (StationLookup.Stations.hasOwnProperty(key)) {
			var station = StationLookup.Stations[key];
			if (station.hasStationAlias(alias) && (!lineCode || station.hasLine(lineCode))) {
				matchingStations.push(StationLookup.Stations[key]);
			}
		}
	}
	console.log('Alias - ' + JSON.stringify(alias) + ' matching stations - ' + JSON.stringify(matchingStations));
	return matchingStations;
}


function Station(stationId, alexaFriendlyName, stationLines, stationAliases, hasPurpleAndIsInLoop, blueLineSide) {

	this.stationId = stationId;
	this.alexaFriendlyName = alexaFriendlyName;
	this.stationLines = stationLines;
	this.hasPurpleAndIsInLoop = hasPurpleAndIsInLoop;
	this.stationAliases = stationAliases;
	this.blueLineSide = blueLineSide;

	this.process = function(line, destination) {
		if (!this.hasLine(line)) {
			return null;
		}

		switch (line) {
			case "Pink":
				return processPink(destination);
			case "Blue":
				return processBlue(destination);
			case "Brn":
				return processBrown(destination);
			case "P":
				return processPurple(destination, hasPurpleAndIsInLoop);
			case "G":
				return processGreen(destination);
			case "Org":
				return processOrange(destination);
			case "Y":
				return processYellow(destination);
			case "Red":
				return processRed(destination);
		}
	};


	this.hasLine = function(line) {
		var i = this.stationLines.length;
		while (i--) {
			if (this.stationLines[i] === line) {
				return true;
			}
		}
		return false;
	};

	this.hasStationAlias = function(alias) {
		var i = this.stationAliases.length;
		var aliasCaps = alias.toUpperCase();

		while (i--) {
			if (this.stationAliases[i].toString().toUpperCase() === aliasCaps) {
				return true;
			}
		}
		return false;
	}
}


/*
 * Process user input for destination
 */
function processPink(destination) {
	console.log('processPink');
	switch (destination.toUpperCase()) {
		case "LOOP":
		case "IN":
			return 1;
		case "FIFTY FOURTH AND CERMAK":
		case "54TH AND CERMAK":
		case "FIFTY FOURTH":
		case "50 FOURTH":
		case "54TH":
		case "OUT":
			return 5;
	}
}

/*
 * Process user input for destination
 */
function processGreen(destination) {
	console.log('processGreen');
	switch (destination.toUpperCase()) {
		case "HARLEM":
		case "HARLEM AND LAKE":
			return 1;
		case "ASHLAND":
		case "ASHLAND AND SIXTY THIRD":
		case "COTTAGE GROVE":
		case "COTTAGE":
			return 5;
	}
}

/*
 * Process user input for destination
 */
function processYellow(destination) {
	console.log('processYellow');
	switch (destination.toUpperCase()) {
		case "SKOKIE":
		case "DEMPSTER SKOKIE":
		case "DEMPSTER":
			return 1;
		case "HOWARD":
			return 5;
	}
}

/*
 * Process user input for destination
 */
function processBlue(destination) {
	console.log('processBlue');
	switch (destination.toUpperCase()) {
		case "O'HARE":
			return 1;
		case "FOREST PARK":
			return 5;
	}
}

/*
 * Process user input for destination
 */
function processPurple(destination, isLoopStop) {

	console.log('processPurple');
	switch (destination.toUpperCase()) {
		case "LINDEN":
		case "OUT":
			if (isLoopStop) return 5; //This is for a bug in the purple line API.  All loop stops are "LoopBound"
			return 1;
		case "LOOP":
		case "HOWARD":
		case "IN":
			return 5;
	}
}

/*
 * Process user input for destination
 */
function processRed(destination) {
	console.log('processRed - ' + destination);
	switch (destination.toUpperCase()) {
		case "HOWARD":
			return 1;
		case "NINETY FIFTH":
		case "NINETY FIFTH AND DAN RYAN":
		case "95TH AND DAN RYAN":
			return 5;
	}
}

/*
 * Process user input for destination
 */
function processBrown(destination) {
	console.log('processBrown');
	switch (destination.toUpperCase()) {
		case "KIMBALL":
		case "OUT":
			return 1;
		case "LOOP":
		case "IN":
			return 5;
	}
}

/*
 * Process user input for destination
 */
function processOrange(destination) {
	console.log('processOrange');
	switch (destination.toUpperCase()) {
		case "LOOP":
		case "IN":
			return 1;
		case "MIDWAY":
		case "OUT":
			return 5;
	}
}

module.exports = StationLookup;