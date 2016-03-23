var Stations = {};

function StationLookup() {

	console.log('Creating Station Lookup...');
	//18th
	Stations[40830] = new Station(40830, "18th", ['Pink'], [''], false);

	//35th-Bronzeville-IIT
	Stations[41120] = new Station(41120, "35th-Bronzeville-IIT", ['G'], false);

	//35th/Archer
	Stations[40120] = new Station(40120, "35th/Archer", ['Org'], false);

	//43rd
	Stations[41270] = new Station(41270, "43rd", ['G'], false);

	//47th (Green Line)
	Stations[41080] = new Station(41080, "47th (Green Line)", ['G'], false);

	//47th (Red Line)
	Stations[41230] = new Station(41230, "47th (Red Line)", ['Red'], false);

	//51st
	Stations[40130] = new Station(40130, "51st", ['G'], false);

	//54th/Cermak
	Stations[40580] = new Station(40580, "54th/Cermak", [], false);

	//63rd
	Stations[40910] = new Station(40910, "63rd", ['Red'], false);

	//69th
	Stations[40990] = new Station(40990, "69th", ['Red'], false);

	//79th
	Stations[40240] = new Station(40240, "79th", ['Red'], false);

	//87th
	Stations[41430] = new Station(41430, "87th", ['Red'], false);

	//95th
	Stations[40450] = new Station(40450, "95th", ['Red'], false);

	//Adams/Wabash
	Stations[40680] = new Station(40680, "Adams/Wabash", ['Pink', 'Brn', 'P', 'G', 'Org'], false);

	//Addison (Blue Line)
	Stations[41240] = new Station(41240, "Addison (Blue Line)", ['Blue'], false);

	//Addison (Brown Line)
	Stations[41440] = new Station(41440, "Addison (Brown Line)", ['Brn'], false);

	//Addison (Red Line)
	Stations[41420] = new Station(41420, "Addison (Red Line)", ['P', 'Red'], false);

	//Argyle
	Stations[41200] = new Station(41200, "Argyle", ['Red'], false);

	//Armitage
	Stations[40660] = new Station(40660, "Armitage", ['Brn', 'P'], false);

	//Ashland/63rd
	Stations[40290] = new Station(40290, "Ashland/63rd", ['G'], false);

	//Ashland (Green, Pink Lines)
	Stations[40170] = new Station(40170, "Ashland (Green, Pink Lines)", ['Pink', 'G'], false);

	//Ashland (Orange Line)
	Stations[41060] = new Station(41060, "Ashland (Orange Line)", ['Org'], false);

	//Austin (Blue Line)
	Stations[40010] = new Station(40010, "Austin (Blue Line)", ['Blue'], false);

	//Austin (Green Line)
	Stations[41260] = new Station(41260, "Austin (Green Line)", ['G'], false);

	//Belmont (Red, Brown, Purple Lines)
	Stations[41320] = new Station(41320, "Belmont (Red, Brown, Purple Lines)", ['Brn', 'P', 'Red'], false);

	//Belmont (Blue Line)
	Stations[40060] = new Station(40060, "Belmont (Blue Line)", ['Blue'], false);

	//Berwyn
	Stations[40340] = new Station(40340, "Berwyn", ['Red'], false);

	//Bryn Mawr
	Stations[41380] = new Station(41380, "Bryn Mawr", ['Red'], false);

	//California (Pink Line)
	Stations[40440] = new Station(40440, "California (Pink Line)", ['Pink'], false);

	//California (Green Line)
	Stations[41360] = new Station(41360, "California (Green Line)", ['G'], false);

	//California (Blue Line-O'Hare Branch)
	Stations[40570] = new Station(40570, "California (Blue Line-O'Hare Branch)", ['Blue'], false);

	//Central Park
	Stations[40780] = new Station(40780, "Central Park", ['Pink'], false);

	//Central (Green Line)
	Stations[40280] = new Station(40280, "Central (Green Line)", ['G'], false);

	//Central (Purple Line)
	Stations[41250] = new Station(41250, "Central (Purple Line)", ['P'], false);

	//Cermak-Chinatown
	Stations[41000] = new Station(41000, "Cermak-Chinatown", ['Red'], false);

	//Cermak-McCormick Place
	Stations[41690] = new Station(41690, "Cermak-McCormick Place", ['G'], false);

	//Chicago (Blue Line)
	Stations[41410] = new Station(41410, "Chicago (Blue Line)", ['Blue'], false);

	//Chicago (Brown Line)
	Stations[40710] = new Station(40710, "Chicago (Brown Line)", ['Brn', 'P'], false);

	//Chicago (Red Line)
	Stations[41450] = new Station(41450, "Chicago (Red Line)", ['Red'], false);

	//Cicero (Pink Line)
	Stations[40420] = new Station(40420, "Cicero (Pink Line)", ['Pink'], false);

	//Cicero (Blue Line-Forest Park Branch)
	Stations[40970] = new Station(40970, "Cicero (Blue Line-Forest Park Branch)", ['Blue'], false);

	//Cicero (Green Line)
	Stations[40480] = new Station(40480, "Cicero (Green Line)", ['G'], false);

	//Clark/Division
	Stations[40630] = new Station(40630, "Clark/Division", ['Red'], false);

	//Clark/Lake
	Stations[40380] = new Station(40380, "Clark/Lake", ['Pink', 'Blue', 'Brn', 'P', 'G', 'Org'], false);

	//Clinton (Blue Line)
	Stations[40430] = new Station(40430, "Clinton (Blue Line)", ['Blue'], false);

	//Clinton (Green Line)
	Stations[41160] = new Station(41160, "Clinton (Green Line)", ['Pink', 'G'], false);

	//Conservatory
	Stations[41670] = new Station(41670, "Conservatory", ['G'], false);

	//Cumberland
	Stations[40230] = new Station(40230, "Cumberland", ['Blue'], false);

	//Damen (Brown Line)
	Stations[40090] = new Station(40090, "Damen (Brown Line)", ['Brn'], false);

	//Damen (Pink Line)
	Stations[40210] = new Station(40210, "Damen (Pink Line)", ['Pink'], false);

	//Damen (Blue Line-O'Hare Branch)
	Stations[40590] = new Station(40590, "Damen (Blue Line-O'Hare Branch)", ['Blue'], false);

	//Davis
	Stations[40050] = new Station(40050, "Davis", ['P'], false);

	//Dempster
	Stations[40690] = new Station(40690, "Dempster", ['P'], false);

	//Dempster-Skokie
	Stations[40140] = new Station(40140, "Dempster-Skokie", ['Y'], false);

	//Diversey
	Stations[40530] = new Station(40530, "Diversey", ['Brn', 'P'], false);

	//Division
	Stations[40320] = new Station(40320, "Division", ['Blue'], false);

	//Cottage Grove
	Stations[40720] = new Station(40720, "Cottage Grove", ['G'], false);

	//Forest Park
	Stations[40390] = new Station(40390, "Forest Park", ['Blue'], false);

	//Foster
	Stations[40520] = new Station(40520, "Foster", ['P'], false);

	//Francisco
	Stations[40870] = new Station(40870, "Francisco", ['Brn'], false);

	//Fullerton
	Stations[41220] = new Station(41220, "Fullerton", ['Brn', 'P', 'Red'], false);

	//Garfield (Green Line)
	Stations[40510] = new Station(40510, "Garfield (Green Line)", ['G'], false);

	//Garfield (Red Line)
	Stations[41170] = new Station(41170, "Garfield (Red Line)", ['Red'], false);

	//Grand (Blue Line)
	Stations[40490] = new Station(40490, "Grand (Blue Line)", ['Blue'], false);

	//Grand (Red Line)
	Stations[40330] = new Station(40330, "Grand (Red Line)", ['Red'], false);

	//Granville
	Stations[40760] = new Station(40760, "Granville", ['Red'], false);

	//Halsted (Green Line)
	Stations[40940] = new Station(40940, "Halsted (Green Line)", ['G'], false);

	//Halsted (Orange Line)
	Stations[41130] = new Station(41130, "Halsted (Orange Line)", ['Org'], false);

	//Harlem (Blue Line-Forest Park Branch)
	Stations[40980] = new Station(40980, "Harlem (Blue Line-Forest Park Branch)", ['Blue'], false);

	//Harlem (Green Line)
	Stations[40020] = new Station(40020, "Harlem (Green Line)", ['G'], false);

	//Harlem (Blue Line-O'Hare Branch)
	Stations[40750] = new Station(40750, "Harlem (Blue Line-O'Hare Branch)", ['Blue'], false);

	//Harold Washington Library-State/Van Buren
	Stations[40850] = new Station(40850, "Harold Washington Library-State/Van Buren", ['Pink', 'Brn', 'P', 'Org'], false);

	//Harrison
	Stations[41490] = new Station(41490, "Harrison", ['Red'], false);

	//Howard
	Stations[40900] = new Station(40900, "Howard", ['P', 'Red', 'Y'], false);

	//Illinois Medical District
	Stations[40810] = new Station(40810, "Illinois Medical District", ['Blue'], false);

	//Indiana
	Stations[40300] = new Station(40300, "Indiana", ['G'], false);

	//Irving Park (Blue Line)
	Stations[40550] = new Station(40550, "Irving Park (Blue Line)", ['Blue'], false);

	//Irving Park (Brown Line)
	Stations[41460] = new Station(41460, "Irving Park (Brown Line)", ['Brn'], false);

	//Jackson (Blue Line)
	Stations[40070] = new Station(40070, "Jackson (Blue Line)", ['Blue'], false);

	//Jackson (Red Line)
	Stations[40560] = new Station(40560, "Jackson (Red Line)", ['Red'], false);

	//Jarvis
	Stations[41190] = new Station(41190, "Jarvis", ['Red'], false);

	//Jefferson Park
	Stations[41280] = new Station(41280, "Jefferson Park", ['Blue'], false);

	//Kedzie (Brown Line)
	Stations[41180] = new Station(41180, "Kedzie (Brown Line)", ['Brn'], false);

	//Kedzie (Pink Line)
	Stations[41040] = new Station(41040, "Kedzie (Pink Line)", ['Pink'], false);

	//Kedzie (Green Line)
	Stations[41070] = new Station(41070, "Kedzie (Green Line)", ['G'], false);

	//Kedzie-Homan (Blue Line)
	Stations[40250] = new Station(40250, "Kedzie-Homan (Blue Line)", ['Blue'], false);

	//Kedzie (Orange Line)
	Stations[41150] = new Station(41150, "Kedzie (Orange Line)", ['Org'], false);

	//Kimball
	Stations[41290] = new Station(41290, "Kimball", ['Brn'], false);

	//King Drive
	Stations[41140] = new Station(41140, "King Drive", ['G'], false);

	//Kostner
	Stations[40600] = new Station(40600, "Kostner", ['Pink'], false);

	//Lake
	Stations[41660] = new Station(41660, "Lake", ['Red'], false);

	//Laramie
	Stations[40700] = new Station(40700, "Laramie", ['G'], false);

	//LaSalle
	Stations[41340] = new Station(41340, "LaSalle", ['Blue'], false);

	//LaSalle/Van Buren
	Stations[40160] = new Station(40160, "LaSalle/Van Buren", ['Pink', 'Brn', 'P', 'Org'], false);

	//Lawrence
	Stations[40770] = new Station(40770, "Lawrence", ['Red'], false);

	//Linden
	Stations[41050] = new Station(41050, "Linden", ['P'], false);

	//Logan Square
	Stations[41020] = new Station(41020, "Logan Square", ['Blue'], false);

	//Loyola
	Stations[41300] = new Station(41300, "Loyola", ['Red'], false);

	//Main
	Stations[40270] = new Station(40270, "Main", ['P'], false);

	//Midway
	Stations[40930] = new Station(40930, "Midway", ['Org'], false);

	//Monroe (Blue Line)
	Stations[40790] = new Station(40790, "Monroe (Blue Line)", ['Blue'], false);

	//Monroe (Red Line)
	Stations[41090] = new Station(41090, "Monroe (Red Line)", ['Red'], false);

	//Montrose (Blue Line)
	Stations[41330] = new Station(41330, "Montrose (Blue Line)", ['Blue'], false);

	//Montrose (Brown Line)
	Stations[41500] = new Station(41500, "Montrose (Brown Line)", ['Brn'], false);

	//Morgan
	Stations[41510] = new Station(41510, "Morgan", ['Pink', 'G'], false);

	//Morse
	Stations[40100] = new Station(40100, "Morse", ['Red'], false);

	//North/Clybourn
	Stations[40650] = new Station(40650, "North/Clybourn", ['Red', 'Red'], false);

	//Noyes
	Stations[40400] = new Station(40400, "Noyes", ['P'], false);

	//Oak Park (Blue Line)
	Stations[40180] = new Station(40180, "Oak Park (Blue Line)", ['Blue'], false);

	//Oak Park (Green Line)
	Stations[41350] = new Station(41350, "Oak Park (Green Line)", ['G'], false);

	//Oakton-Skokie
	Stations[41680] = new Station(41680, "Oakton-Skokie", ['Y'], false);

	//O'Hare
	Stations[40890] = new Station(40890, "O'Hare", ['Pink', 'Blue'], false);

	//Paulina
	Stations[41310] = new Station(41310, "Paulina", ['Brn'], false);

	//Polk
	Stations[41030] = new Station(41030, "Polk", ['Pink'], false);

	//Pulaski (Pink Line)
	Stations[40150] = new Station(40150, "Pulaski (Pink Line)", ['Pink'], false);

	//Pulaski (Blue Line-Forest Park Branch)
	Stations[40920] = new Station(40920, "Pulaski (Blue Line-Forest Park Branch)", ['Blue'], false);

	//Pulaski (Green Line)
	Stations[40030] = new Station(40030, "Pulaski (Green Line)", ['G'], false);

	//Pulaski (Orange Line)
	Stations[40960] = new Station(40960, "Pulaski (Orange Line)", ['Org'], false);

	//Quincy/Wells
	Stations[40040] = new Station(40040, "Quincy/Wells", ['Pink', 'Brn', 'P', 'Org'], false);

	//Racine
	Stations[40470] = new Station(40470, "Racine", ['Blue'], false);

	//Randolph/Wabash
	Stations[40200] = new Station(40200, "Randolph/Wabash", ['Pink', 'Brn', 'P', 'G', 'Org'], false);

	//Ridgeland
	Stations[40610] = new Station(40610, "Ridgeland", ['G'], false);

	//Rockwell
	Stations[41010] = new Station(41010, "Rockwell", ['Brn'], false);

	//Roosevelt
	Stations[41400] = new Station(41400, "Roosevelt", ['G', 'Org', 'Red'], false);

	//Rosemont
	Stations[40820] = new Station(40820, "Rosemont", ['Blue'], false);

	//Sedgwick
	Stations[40800] = new Station(40800, "Sedgwick", ['Brn', 'P'], false);

	//Sheridan
	Stations[40080] = new Station(40080, "Sheridan", ['P', 'Red'], false);

	//South Boulevard
	Stations[40840] = new Station(40840, "South Boulevard", ['P'], false);

	//Southport
	Stations[40360] = new Station(40360, "Southport", ['Brn'], false);

	//Sox-35th
	Stations[40190] = new Station(40190, "Sox-35th", ['Red'], false);

	//State/Lake
	Stations[40260] = new Station(40260, "State/Lake", ['Pink', 'Brn', 'P', 'G', 'Org'], false);

	//Thorndale
	Stations[40880] = new Station(40880, "Thorndale", ['Red'], false);

	//UIC-Halsted
	Stations[40350] = new Station(40350, "UIC-Halsted", ['Blue'], false);

	//Washington/Wells
	Stations[40730] = new Station(40730, "Washington/Wells", ['Pink', 'Brn', 'P', 'Org'], false);

	//Washington (Blue Line)
	Stations[40370] = new Station(40370, "Washington (Blue Line)", ['Blue'], false);

	//Wellington
	Stations[41210] = new Station(41210, "Wellington", ['Brn', 'P'], false);

	//Western (Brown Line)
	Stations[41480] = new Station(41480, "Western (Brown Line)", ['Brn'], false);

	//Western (Pink Line)
	Stations[40740] = new Station(40740, "Western (Pink Line)", ['Pink'], false);

	//Western (Blue Line-Forest Park Branch)
	Stations[40220] = new Station(40220, "Western (Blue Line-Forest Park Branch)", ['Blue'], false);

	//Western (Blue Line-O'Hare Branch)
	Stations[40670] = new Station(40670, "Western (Blue Line-O'Hare Branch)", ['Blue'], false);

	//Western (Orange Line)
	Stations[40310] = new Station(40310, "Western (Orange Line)", ['Org'], false);

	//Wilson
	Stations[40540] = new Station(40540, "Wilson", ['P', 'Red'], false);

	//Merchandise Mart
	Stations[40460] = new Station(40460, "Merchandise Mart", ['Brn', 'P'], false);
}


StationLookup.Stations = Stations;



function Station(stationId, stationName, stationLines, stationAliases, hasPurpleAndIsInLoop) {

	this.stationId = stationId;
	this.stationName = stationName;
	this.stationLines = stationLines;
	this.hasPurpleAndIsInLoop = hasPurpleAndIsInLoop;
	this.stationAliases = stationAliases;

	this.process = function(line) {
		if (!hasLine(line)) {
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
			if (this.stationLines[i] === obj) {
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
        default:
            return null;
    }
}

/*
 * Process user input for destination
 */
function processGreen(destination) {
    switch (destination.toUpperCase()) {
        case "HARLEM":
        case "HARLEM AND LAKE":
            return 1;
        case "ASHLAND":
        case "ASHLAND AND SIXTY THIRD":
        case "COTTAGE GROVE":
        case "COTTAGE":
            return 5;
        default:
            return null;
    }
}

/*
 * Process user input for destination
 */
function processYellow(destination) {
    switch (destination.toUpperCase()) {
        case "SKOKIE":
        case "DEMPSTER SKOKIE":
        case "DEMPSTER":
            return 1;
        case "HOWARD":
            return 5;
        default:
            return null;
    }
}

/*
 * Process user input for destination
 */
function processBlue(destination) {
    switch (destination.toUpperCase()) {
        case "O'HARE":
            return 1;
        case "FOREST PARK":
            return 5;
        default:
            return null;
    }
}

/*
 * Process user input for destination
 */
function processPurple(destination, isLoopStop) {

    switch (destination.toUpperCase()) {
        case "LINDEN":
        case "OUT":
            if (isLoopStop) return 5; //This is for a bug in the purple line API.  All loop stops are "LoopBound"
            return 1;
        case "LOOP":
        case "HOWARD":
        case "IN":
            return 5;
        default:
            return null;
    }
}

/*
 * Process user input for destination
 */
function processRed(destination) {
    switch (destination.toUpperCase()) {
        case "HOWARD":
            return 1;
        case "NINETY FIFTH":
        case "NINETY FIFTH AND DAN RYAN":
            return 5;
        default:
            return null;
    }
}

/*
 * Process user input for destination
 */
function processBrown(destination) {
    switch (destination.toUpperCase()) {
        case "KIMBALL":
        case "OUT":
            return 1;
        case "LOOP":
        case "IN":
            return 5;
        default:
            return null;
    }
}

/*
 * Process user input for destination
 */
function processOrange(destination) {
    switch (destination.toUpperCase()) {
        case "LOOP":
        case "IN":
            return 1;
        case "MIDWAY":
        case "OUT":
            return 5;
        default:
            return null;
    }
}

module.exports = StationLookup;