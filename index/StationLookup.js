var Stations = {};

function StationLookup() {

	console.log('Creating Station Lookup...');
	//18th
	Stations[40830] = new Station(40830, ['Pink'], ['Eighteenth', 'Eighteenth Street'], false);

	//35th-Bronzeville-IIT
	Stations[41120] = new Station(41120, ['G'], ['Thirty Fifth','Thirty Fifth and Archer', 'Thirty Fifth Street'], false);

	//35th/Archer
	Stations[40120] = new Station(40120, ['Org'], ['Thirty Fifth', 'Bronzeville', 'IIT', 'Thirty Fifth Street'], false);

	//43rd
	Stations[41270] = new Station(41270, ['G'], ['Fourty Thir,  Fourty Third Street'], false);

	//47th (Green Line)
	Stations[41080] = new Station(41080, ['G'], ['Fourty Seventh', 'Fourty Seventh Street'], false);

	//47th (Red Line)
	Stations[41230] = new Station(41230, ['Red'], ['Fourty Seventh', 'Fourty Seventh Street'], false);

	//51st
	Stations[40130] = new Station(40130, ['G'], ['Fifty First', 'Fifty First Street'], false);

	//54th/Cermak
	Stations[40580] = new Station(40580, ['Pink'], ['Fifty Fourth and Cermak'], false);

	//63rd
	Stations[40910] = new Station(40910, ['Red'], ['Sixty Third', 'Sixty Third Street'], false);

	//69th
	Stations[40990] = new Station(40990, ['Red'], ['Sixty Nineth', 'Sixty Nineth Street'], false);

	//79th
	Stations[40240] = new Station(40240, ['Red'], ['Seventy Nineth', 'Seventy Nineth Street'], false);

	//87th
	Stations[41430] = new Station(41430, ['Red'], ['Eighty Seventh', 'Eighty Seventh Street'], false);

	//95th
	Stations[40450] = new Station(40450, ['Red'], ['Ninety Fifth', 'Ninety Fifth Street'], false);

	//Adams/Wabash
	Stations[40680] = new Station(40680, ['Pink', 'Brn', 'P', 'G', 'Org'], ['Adams and Wabash'], true);

	//Addison (Blue Line)
	Stations[41240] = new Station(41240, ['Blue'], ['Addison'], false);

	//Addison (Brown Line)
	Stations[41440] = new Station(41440, ['Brn'], ['Addison'], false);

	//Addison (Red Line)
	Stations[41420] = new Station(41420, ['P', 'Red'], ['Addison'], false);

	//Argyle
	Stations[41200] = new Station(41200, ['Red'], ['Argyle'], false);

	//Armitage
	Stations[40660] = new Station(40660, ['Brn', 'P'], ['Armitage'], false);

	//Ashland/63rd
	Stations[40290] = new Station(40290, ['G'], ['Ashland and 63rd', 'Ashland and 63rd Street'], false);

	//Ashland (Green, Pink Lines)
	Stations[40170] = new Station(40170, ['Pink', 'G'], ['Ashland'], false);

	//Ashland (Orange Line)
	Stations[41060] = new Station(41060, ['Org'], ['Ashland'], false);

	//Austin (Blue Line)
	Stations[40010] = new Station(40010, ['Blue'], ['Austin'], false);

	//Austin (Green Line)
	Stations[41260] = new Station(41260, ['G'], ['Austin'], false);

	//Belmont (Red, Brown, Purple Lines)
	Stations[41320] = new Station(41320, ['Brn', 'P', 'Red'], ['Belmont'], false);

	//Belmont (Blue Line)
	Stations[40060] = new Station(40060, ['Blue'], ['Belmont'], false);

	//Berwyn
	Stations[40340] = new Station(40340, ['Red'], ['Berwyn'], false);

	//Bryn Mawr
	Stations[41380] = new Station(41380, ['Red'], ['Bryn Mawr'], false);

	//California (Pink Line)
	Stations[40440] = new Station(40440, ['Pink'], ['California'], false);

	//California (Green Line)
	Stations[41360] = new Station(41360, ['G'], ['California'], false);

	//California (Blue Line-O'Hare Branch)
	Stations[40570] = new Station(40570, ['Blue'], ['California'], false);

	//Central Park
	Stations[40780] = new Station(40780, ['Pink'], ['Central Park'], false);

	//Central (Green Line)
	Stations[40280] = new Station(40280, ['G'], ['Central'], false);

	//Central (Purple Line)
	Stations[41250] = new Station(41250, ['P'], ['Central'], false);

	//Cermak-Chinatown
	Stations[41000] = new Station(41000, ['Red'], ['Cermak', 'Chinatown'], false);

	//Cermak-McCormick Place
	Stations[41690] = new Station(41690, ['G'], ['Cermak', 'McCormick Place'], false);

	//Chicago (Blue Line)
	Stations[41410] = new Station(41410, ['Blue'], ['Chicago'], false);

	//Chicago (Brown Line)
	Stations[40710] = new Station(40710, ['Brn', 'P'], ['Chicago'], false);

	//Chicago (Red Line)
	Stations[41450] = new Station(41450, ['Red'], ['Chicago'], false);

	//Cicero (Pink Line)
	Stations[40420] = new Station(40420, ['Pink'], ['Cicero'], false);

	//Cicero (Blue Line-Forest Park Branch)
	Stations[40970] = new Station(40970, ['Blue'], ['Cicero'], false);

	//Cicero (Green Line)
	Stations[40480] = new Station(40480, ['G'], ['Cicero'], false);

	//Clark/Division
	Stations[40630] = new Station(40630, ['Red'], ['Clark and Division'], false);

	//Clark/Lake
	Stations[40380] = new Station(40380, ['Pink', 'Blue', 'Brn', 'P', 'G', 'Org'], ['Clark and Lake'], true);

	//Clinton (Blue Line)
	Stations[40430] = new Station(40430, ['Blue'], ['Clinton'], false);

	//Clinton (Green Line)
	Stations[41160] = new Station(41160, ['Pink', 'G'], ['Clinton'], false);

	//Conservatory
	Stations[41670] = new Station(41670, ['G'], ['Conservatory'], false);

	//Cumberland
	Stations[40230] = new Station(40230, ['Blue'], ['Cumberland'], false);

	//Damen (Brown Line)
	Stations[40090] = new Station(40090, ['Brn'], ['Damen'], false);

	//Damen (Pink Line)
	Stations[40210] = new Station(40210, ['Pink'], ['Damen'], false);

	//Damen (Blue Line-O'Hare Branch)
	Stations[40590] = new Station(40590, ['Blue'], ['Damen'], false);

	//Davis
	Stations[40050] = new Station(40050, ['P'], ['Davis'], false);

	//Dempster
	Stations[40690] = new Station(40690, ['P'], ['Dempster'], false);

	//Dempster-Skokie
	Stations[40140] = new Station(40140, ['Y'], ['Dempster Skokie'], false);

	//Diversey
	Stations[40530] = new Station(40530, ['Brn', 'P'], ['Diversey'], false);

	//Division
	Stations[40320] = new Station(40320, ['Blue'], ['Division'], false);

	//Cottage Grove
	Stations[40720] = new Station(40720, ['G'], ['Cottage Grove'], false);

	//Forest Park
	Stations[40390] = new Station(40390, ['Blue'], ['Forest Park'], false);

	//Foster
	Stations[40520] = new Station(40520, ['P'], ['Foster'], false);

	//Francisco
	Stations[40870] = new Station(40870, ['Brn'], ['Francisco'], false);

	//Fullerton
	Stations[41220] = new Station(41220, ['Brn', 'P', 'Red'], ['Fullerton'], false);

	//Garfield (Green Line)
	Stations[40510] = new Station(40510, ['G'], ['Garfield'], false);

	//Garfield (Red Line)
	Stations[41170] = new Station(41170, ['Red'], ['Garfield'], false);

	//Grand (Blue Line)
	Stations[40490] = new Station(40490, ['Blue'], ['Grand'], false);

	//Grand (Red Line)
	Stations[40330] = new Station(40330, ['Red'], ['Grand'], false);

	//Granville
	Stations[40760] = new Station(40760, ['Red'], ['Granville'], false);

	//Halsted (Green Line)
	Stations[40940] = new Station(40940, ['G'], ['Halsted'], false);

	//Halsted (Orange Line)
	Stations[41130] = new Station(41130, ['Org'], ['Halsted'], false);

	//Harlem (Blue Line-Forest Park Branch)
	Stations[40980] = new Station(40980, ['Blue'], ['Harlem'], false);

	//Harlem (Green Line)
	Stations[40020] = new Station(40020, ['G'], ['Harlem'], false);

	//Harlem (Blue Line-O'Hare Branch)
	Stations[40750] = new Station(40750, ['Blue'], ['Harlem'], false);

	//Harold Washington Library-State/Van Buren
	Stations[40850] = new Station(40850, ['Pink', 'Brn', 'P', 'Org'], ['Harold Washington Library', 'State and Van Buren'], true);

	//Harrison
	Stations[41490] = new Station(41490, ['Red'], ['Harrison'], false);

	//Howard
	Stations[40900] = new Station(40900, ['P', 'Red', 'Y'], ['Howard'], false);

	//Illinois Medical District
	Stations[40810] = new Station(40810, ['Blue'], ['Illinois Medical District'], false);

	//Indiana
	Stations[40300] = new Station(40300, ['G'], ['Indiana'], false);

	//Irving Park (Blue Line)
	Stations[40550] = new Station(40550, ['Blue'], ['Irving Park'], false);

	//Irving Park (Brown Line)
	Stations[41460] = new Station(41460, ['Brn'], ['Irving Park'], false);

	//Jackson (Blue Line)
	Stations[40070] = new Station(40070, ['Blue'], ['Jackson'], false);

	//Jackson (Red Line)
	Stations[40560] = new Station(40560, ['Red'], ['Jackson'], false);

	//Jarvis
	Stations[41190] = new Station(41190, ['Red'], ['Jarvis'], false);

	//Jefferson Park
	Stations[41280] = new Station(41280, ['Blue'], ['Jefferson Park'], false);

	//Kedzie (Brown Line)
	Stations[41180] = new Station(41180, ['Brn'], ['Kedzie'], false);

	//Kedzie (Pink Line)
	Stations[41040] = new Station(41040, ['Pink'], ['Kedzie'], false);

	//Kedzie (Green Line)
	Stations[41070] = new Station(41070, ['G'], ['Kedzie'], false);

	//Kedzie-Homan (Blue Line)
	Stations[40250] = new Station(40250, ['Blue'], ['Kedzie Homan'], false);

	//Kedzie (Orange Line)
	Stations[41150] = new Station(41150, ['Org'], ['Kedzie'], false);

	//Kimball
	Stations[41290] = new Station(41290, ['Brn'], ['Kimball'], false);

	//King Drive
	Stations[41140] = new Station(41140, ['G'], ['King Drive'], false);

	//Kostner
	Stations[40600] = new Station(40600, ['Pink'], ['Kostner'], false);

	//Lake
	Stations[41660] = new Station(41660, ['Red'], ['Lake'], false);

	//Laramie
	Stations[40700] = new Station(40700, ['G'], ['Laramie'], false);

	//LaSalle
	Stations[41340] = new Station(41340, ['Blue'], ['LaSalle'], false);

	//LaSalle/Van Buren
	Stations[40160] = new Station(40160, ['Pink', 'Brn', 'P', 'Org'], ['LaSalle and Van Buren'], true);

	//Lawrence
	Stations[40770] = new Station(40770, ['Red'], ['Lawrence'], false);

	//Linden
	Stations[41050] = new Station(41050, ['P'], ['Linden'], false);

	//Logan Square
	Stations[41020] = new Station(41020, ['Blue'], ['Logan Square'], false);

	//Loyola
	Stations[41300] = new Station(41300, ['Red'], ['Loyola'], false);

	//Main
	Stations[40270] = new Station(40270, ['P'], ['Main'], false);

	//Midway
	Stations[40930] = new Station(40930, ['Org'], ['Midway'], false);

	//Monroe (Blue Line)
	Stations[40790] = new Station(40790, ['Blue'], ['Monroe'], false);

	//Monroe (Red Line)
	Stations[41090] = new Station(41090, ['Red'], ['Monroe'], false);

	//Montrose (Blue Line)
	Stations[41330] = new Station(41330, ['Blue'], ['Montrose'], false);

	//Montrose (Brown Line)
	Stations[41500] = new Station(41500, ['Brn'], ['Montrose'], false);

	//Morgan
	Stations[41510] = new Station(41510, ['Pink', 'G'], ['Morgan'], false);

	//Morse
	Stations[40100] = new Station(40100, ['Red'], ['Morse'], false);

	//North/Clybourn
	Stations[40650] = new Station(40650, ['Red', 'Red'], ['North and Clybourn'], false);

	//Noyes
	Stations[40400] = new Station(40400, ['P'], ['Noyes'], false);

	//Oak Park (Blue Line)
	Stations[40180] = new Station(40180, ['Blue'], ['Oak Park'], false);

	//Oak Park (Green Line)
	Stations[41350] = new Station(41350, ['G'], ['Oak Park'], false);

	//Oakton-Skokie
	Stations[41680] = new Station(41680, ['Y'], ['Oakton Skokie'], false);

	//O'Hare
	Stations[40890] = new Station(40890, ['Pink', 'Blue'], ["O'Hare"], false);

	//Paulina
	Stations[41310] = new Station(41310, ['Brn'], ['Paulina'], false);

	//Polk
	Stations[41030] = new Station(41030, ['Pink'], ['Polk'], false);

	//Pulaski (Pink Line)
	Stations[40150] = new Station(40150, ['Pink'], ['Pulaski'], false);

	//Pulaski (Blue Line-Forest Park Branch)
	Stations[40920] = new Station(40920, ['Blue'], ['Pulaski'], false);

	//Pulaski (Green Line)
	Stations[40030] = new Station(40030, ['G'], ['Pulaski'], false);

	//Pulaski (Orange Line)
	Stations[40960] = new Station(40960, ['Org'], ['Pulaski'], false);

	//Quincy/Wells
	Stations[40040] = new Station(40040, ['Pink', 'Brn', 'P', 'Org'], ['Quincy and Wells'], true);

	//Racine
	Stations[40470] = new Station(40470, ['Blue'], ['Racine'], false);

	//Randolph/Wabash
	Stations[40200] = new Station(40200, ['Pink', 'Brn', 'P', 'G', 'Org'], ['Randolph and Wabash'], true);

	//Ridgeland
	Stations[40610] = new Station(40610, ['G'], ['Ridgeland'], false);

	//Rockwell
	Stations[41010] = new Station(41010, ['Brn'], ['Rockwell'], false);

	//Roosevelt
	Stations[41400] = new Station(41400, ['G', 'Org', 'Red'], ['Roosevelt'], false);

	//Rosemont
	Stations[40820] = new Station(40820, ['Blue'], ['Rosemont'], false);

	//Sedgwick
	Stations[40800] = new Station(40800, ['Brn', 'P'], ['Sedgwick'], false);

	//Sheridan
	Stations[40080] = new Station(40080, ['P', 'Red'], ['Sheridan'], false);

	//South Boulevard
	Stations[40840] = new Station(40840, ['P'], ['South Boulevard'], false);

	//Southport
	Stations[40360] = new Station(40360, ['Brn'], ['Southport'], false);

	//Sox-35th
	Stations[40190] = new Station(40190, ['Red'], ['U S Cellular Field', 'Sox Park', 'Thirty fifth', 'Thirty Fifth Street'], false);

	//State/Lake
	Stations[40260] = new Station(40260, ['Pink', 'Brn', 'P', 'G', 'Org'], ['State and Lake'], true);

	//Thorndale
	Stations[40880] = new Station(40880, ['Red'], ['Thorndale'], false);

	//UIC-Halsted
	Stations[40350] = new Station(40350, ['Blue'], ['UIC', 'Halsted'], false);

	//Washington/Wells
	Stations[40730] = new Station(40730, ['Pink', 'Brn', 'P', 'Org'], ['Washington and Wells'], true);

	//Washington (Blue Line)
	Stations[40370] = new Station(40370, ['Blue'], ['Washington'], false);

	//Wellington
	Stations[41210] = new Station(41210, ['Brn', 'P'], ['Wellington'], false);

	//Western (Brown Line)
	Stations[41480] = new Station(41480, ['Brn'], ['Western'], false);

	//Western (Pink Line)
	Stations[40740] = new Station(40740, ['Pink'], ['Western'], false);

	//Western (Blue Line-Forest Park Branch)
	Stations[40220] = new Station(40220, ['Blue'], ['Western'], false);

	//Western (Blue Line-O'Hare Branch)
	Stations[40670] = new Station(40670, ['Blue'], ['Western'], false);

	//Western (Orange Line)
	Stations[40310] = new Station(40310, ['Org'], ['Western'], false);

	//Wilson
	Stations[40540] = new Station(40540, ['P', 'Red'], ['Western'], false);

	//Merchandise Mart
	Stations[40460] = new Station(40460, ['Brn', 'P'], ['Western'], false);
}


StationLookup.Stations = Stations;



function Station(stationId, stationLines, stationAliases, hasPurpleAndIsInLoop) {

	this.stationId = stationId;
	this.stationLines = stationLines;
	this.hasPurpleAndIsInLoop = hasPurpleAndIsInLoop;
	this.stationAliases = stationAliases;

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
			return 5;	}
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