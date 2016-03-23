var Stations = {};
function StationLookup() {

	console.log('Creating Station Lookup...');
	//18th
	Stations[40830] = new Station(40830, false, ['Pink'], false);

	//35th-Bronzeville-IIT
	Stations[41120] = new Station(41120, false, ['G'], false);

	//35th/Archer
	Stations[40120] = new Station(40120, false, ['Org'], false);

	//43rd
	Stations[41270] = new Station(41270, false, ['G'], false);

	//47th (Green Line)
	Stations[41080] = new Station(41080, false, ['G'], false);

	//47th (Red Line)
	Stations[41230] = new Station(41230, false, ['Red'], false);

	//51st
	Stations[40130] = new Station(40130, false, ['G'], false);

	//54th/Cermak
	Stations[40580] = new Station(40580, false, [], false);

	//63rd
	Stations[40910] = new Station(40910, false, ['Red'], false);

	//69th
	Stations[40990] = new Station(40990, false, ['Red'], false);

	//79th
	Stations[40240] = new Station(40240, false, ['Red'], false);

	//87th
	Stations[41430] = new Station(41430, false, ['Red'], false);

	//95th
	Stations[40450] = new Station(40450, false, ['Red'], false);

	//Adams/Wabash
	Stations[40680] = new Station(40680, true, ['Pink', 'Brn', 'P', 'G', 'Org'], false);

	//Addison (Blue Line)
	Stations[41240] = new Station(41240, false, ['Blue'], false);

	//Addison (Brown Line)
	Stations[41440] = new Station(41440, false, ['Brn'], false);

	//Addison (Red Line)
	Stations[41420] = new Station(41420, false, ['P', 'Red'], false);

	//Argyle
	Stations[41200] = new Station(41200, false, ['Red'], false);

	//Armitage
	Stations[40660] = new Station(40660, false, ['Brn', 'P'], false);

	//Ashland/63rd
	Stations[40290] = new Station(40290, false, ['G'], false);

	//Ashland (Green, Pink Lines)
	Stations[40170] = new Station(40170, false, ['Pink', 'G'], false);

	//Ashland (Orange Line)
	Stations[41060] = new Station(41060, false, ['Org'], false);

	//Austin (Blue Line)
	Stations[40010] = new Station(40010, false, ['Blue'], false);

	//Austin (Green Line)
	Stations[41260] = new Station(41260, false, ['G'], false);

	//Belmont (Red, Brown, Purple Lines)
	Stations[41320] = new Station(41320, false, ['Brn', 'P', 'Red'], false);

	//Belmont (Blue Line)
	Stations[40060] = new Station(40060, false, ['Blue'], false);

	//Berwyn
	Stations[40340] = new Station(40340, false, ['Red'], false);

	//Bryn Mawr
	Stations[41380] = new Station(41380, false, ['Red'], false);

	//California (Pink Line)
	Stations[40440] = new Station(40440, false, ['Pink'], false);

	//California (Green Line)
	Stations[41360] = new Station(41360, false, ['G'], false);

	//California (Blue Line-O'Hare Branch)
	Stations[40570] = new Station(40570, false, ['Blue'], false);

	//Central Park
	Stations[40780] = new Station(40780, false, ['Pink'], false);

	//Central (Green Line)
	Stations[40280] = new Station(40280, false, ['G'], false);

	//Central (Purple Line)
	Stations[41250] = new Station(41250, false, ['P'], false);

	//Cermak-Chinatown
	Stations[41000] = new Station(41000, false, ['Red'], false);

	//Cermak-McCormick Place
	Stations[41690] = new Station(41690, false, ['G'], false);

	//Chicago (Blue Line)
	Stations[41410] = new Station(41410, false, ['Blue'], false);

	//Chicago (Brown Line)
	Stations[40710] = new Station(40710, false, ['Brn', 'P'], false);

	//Chicago (Red Line)
	Stations[41450] = new Station(41450, false, ['Red'], false);

	//Cicero (Pink Line)
	Stations[40420] = new Station(40420, false, ['Pink'], false);

	//Cicero (Blue Line-Forest Park Branch)
	Stations[40970] = new Station(40970, false, ['Blue'], false);

	//Cicero (Green Line)
	Stations[40480] = new Station(40480, false, ['G'], false);

	//Clark/Division
	Stations[40630] = new Station(40630, false, ['Red'], false);

	//Clark/Lake
	Stations[40380] = new Station(40380, true, ['Pink', 'Blue', 'Brn', 'P', 'G', 'Org'], false);

	//Clinton (Blue Line)
	Stations[40430] = new Station(40430, false, ['Blue'], false);

	//Clinton (Green Line)
	Stations[41160] = new Station(41160, false, ['Pink', 'G'], false);

	//Conservatory
	Stations[41670] = new Station(41670, false, ['G'], false);

	//Cumberland
	Stations[40230] = new Station(40230, false, ['Blue'], false);

	//Damen (Brown Line)
	Stations[40090] = new Station(40090, false, ['Brn'], false);

	//Damen (Pink Line)
	Stations[40210] = new Station(40210, false, ['Pink'], false);

	//Damen (Blue Line-O'Hare Branch)
	Stations[40590] = new Station(40590, false, ['Blue'], false);

	//Davis
	Stations[40050] = new Station(40050, false, ['P'], false);

	//Dempster
	Stations[40690] = new Station(40690, false, ['P'], false);

	//Dempster-Skokie
	Stations[40140] = new Station(40140, false, ['Y'], false);

	//Diversey
	Stations[40530] = new Station(40530, false, ['Brn', 'P'], false);

	//Division
	Stations[40320] = new Station(40320, false, ['Blue'], false);

	//Cottage Grove
	Stations[40720] = new Station(40720, false, ['G'], false);

	//Forest Park
	Stations[40390] = new Station(40390, false, ['Blue'], false);

	//Foster
	Stations[40520] = new Station(40520, false, ['P'], false);

	//Francisco
	Stations[40870] = new Station(40870, false, ['Brn'], false);

	//Fullerton
	Stations[41220] = new Station(41220, false, ['Brn', 'P', 'Red'], false);

	//Garfield (Green Line)
	Stations[40510] = new Station(40510, false, ['G'], false);

	//Garfield (Red Line)
	Stations[41170] = new Station(41170, false, ['Red'], false);

	//Grand (Blue Line)
	Stations[40490] = new Station(40490, false, ['Blue'], false);

	//Grand (Red Line)
	Stations[40330] = new Station(40330, false, ['Red'], false);

	//Granville
	Stations[40760] = new Station(40760, false, ['Red'], false);

	//Halsted (Green Line)
	Stations[40940] = new Station(40940, false, ['G'], false);

	//Halsted (Orange Line)
	Stations[41130] = new Station(41130, false, ['Org'], false);

	//Harlem (Blue Line-Forest Park Branch)
	Stations[40980] = new Station(40980, false, ['Blue'], false);

	//Harlem (Green Line)
	Stations[40020] = new Station(40020, false, ['G'], false);

	//Harlem (Blue Line-O'Hare Branch)
	Stations[40750] = new Station(40750, false, ['Blue'], false);

	//Harold Washington Library-State/Van Buren
	Stations[40850] = new Station(40850, true, ['Pink', 'Brn', 'P', 'Org'], false);

	//Harrison
	Stations[41490] = new Station(41490, false, ['Red'], false);

	//Howard
	Stations[40900] = new Station(40900, false, ['P', 'Red', 'Y'], false);

	//Illinois Medical District
	Stations[40810] = new Station(40810, false, ['Blue'], false);

	//Indiana
	Stations[40300] = new Station(40300, false, ['G'], false);

	//Irving Park (Blue Line)
	Stations[40550] = new Station(40550, false, ['Blue'], false);

	//Irving Park (Brown Line)
	Stations[41460] = new Station(41460, false, ['Brn'], false);

	//Jackson (Blue Line)
	Stations[40070] = new Station(40070, false, ['Blue'], false);

	//Jackson (Red Line)
	Stations[40560] = new Station(40560, false, ['Red'], false);

	//Jarvis
	Stations[41190] = new Station(41190, false, ['Red'], false);

	//Jefferson Park
	Stations[41280] = new Station(41280, false, ['Blue'], false);

	//Kedzie (Brown Line)
	Stations[41180] = new Station(41180, false, ['Brn'], false);

	//Kedzie (Pink Line)
	Stations[41040] = new Station(41040, false, ['Pink'], false);

	//Kedzie (Green Line)
	Stations[41070] = new Station(41070, false, ['G'], false);

	//Kedzie-Homan (Blue Line)
	Stations[40250] = new Station(40250, false, ['Blue'], false);

	//Kedzie (Orange Line)
	Stations[41150] = new Station(41150, false, ['Org'], false);

	//Kimball
	Stations[41290] = new Station(41290, false, ['Brn'], false);

	//King Drive
	Stations[41140] = new Station(41140, false, ['G'], false);

	//Kostner
	Stations[40600] = new Station(40600, false, ['Pink'], false);

	//Lake
	Stations[41660] = new Station(41660, false, ['Red'], false);

	//Laramie
	Stations[40700] = new Station(40700, false, ['G'], false);

	//LaSalle
	Stations[41340] = new Station(41340, false, ['Blue'], false);

	//LaSalle/Van Buren
	Stations[40160] = new Station(40160, true, ['Pink', 'Brn', 'P', 'Org'], false);

	//Lawrence
	Stations[40770] = new Station(40770, false, ['Red'], false);

	//Linden
	Stations[41050] = new Station(41050, false, ['P'], false);

	//Logan Square
	Stations[41020] = new Station(41020, false, ['Blue'], false);

	//Loyola
	Stations[41300] = new Station(41300, false, ['Red'], false);

	//Main
	Stations[40270] = new Station(40270, false, ['P'], false);

	//Midway
	Stations[40930] = new Station(40930, false, ['Org'], false);

	//Monroe (Blue Line)
	Stations[40790] = new Station(40790, false, ['Blue'], false);

	//Monroe (Red Line)
	Stations[41090] = new Station(41090, false, ['Red'], false);

	//Montrose (Blue Line)
	Stations[41330] = new Station(41330, false, ['Blue'], false);

	//Montrose (Brown Line)
	Stations[41500] = new Station(41500, false, ['Brn'], false);

	//Morgan
	Stations[41510] = new Station(41510, false, ['Pink', 'G'], false);

	//Morse
	Stations[40100] = new Station(40100, false, ['Red'], false);

	//North/Clybourn
	Stations[40650] = new Station(40650, false, ['Red', 'Red'], false);

	//Noyes
	Stations[40400] = new Station(40400, false, ['P'], false);

	//Oak Park (Blue Line)
	Stations[40180] = new Station(40180, false, ['Blue'], false);

	//Oak Park (Green Line)
	Stations[41350] = new Station(41350, false, ['G'], false);

	//Oakton-Skokie
	Stations[41680] = new Station(41680, false, ['Y'], false);

	//O'Hare
	Stations[40890] = new Station(40890, false, ['Pink', 'Blue'], false);

	//Paulina
	Stations[41310] = new Station(41310, false, ['Brn'], false);

	//Polk
	Stations[41030] = new Station(41030, false, ['Pink'], false);

	//Pulaski (Pink Line)
	Stations[40150] = new Station(40150, false, ['Pink'], false);

	//Pulaski (Blue Line-Forest Park Branch)
	Stations[40920] = new Station(40920, false, ['Blue'], false);

	//Pulaski (Green Line)
	Stations[40030] = new Station(40030, false, ['G'], false);

	//Pulaski (Orange Line)
	Stations[40960] = new Station(40960, false, ['Org'], false);

	//Quincy/Wells
	Stations[40040] = new Station(40040, true, ['Pink', 'Brn', 'P', 'Org'], false);

	//Racine
	Stations[40470] = new Station(40470, false, ['Blue'], false);

	//Randolph/Wabash
	Stations[40200] = new Station(40200, true, ['Pink', 'Brn', 'P', 'G', 'Org'], false);

	//Ridgeland
	Stations[40610] = new Station(40610, false, ['G'], false);

	//Rockwell
	Stations[41010] = new Station(41010, false, ['Brn'], false);

	//Roosevelt
	Stations[41400] = new Station(41400, false, ['G', 'Org', 'Red'], false);

	//Rosemont
	Stations[40820] = new Station(40820, false, ['Blue'], false);

	//Sedgwick
	Stations[40800] = new Station(40800, false, ['Brn', 'P'], false);

	//Sheridan
	Stations[40080] = new Station(40080, false, ['P', 'Red'], false);

	//South Boulevard
	Stations[40840] = new Station(40840, false, ['P'], false);

	//Southport
	Stations[40360] = new Station(40360, false, ['Brn'], false);

	//Sox-35th
	Stations[40190] = new Station(40190, false, ['Red'], false);

	//State/Lake
	Stations[40260] = new Station(40260, true, ['Pink', 'Brn', 'P', 'G', 'Org'], false);

	//Thorndale
	Stations[40880] = new Station(40880, false, ['Red'], false);

	//UIC-Halsted
	Stations[40350] = new Station(40350, false, ['Blue'], false);

	//Washington/Wells
	Stations[40730] = new Station(40730, true, ['Pink', 'Brn', 'P', 'Org'], false);

	//Washington (Blue Line)
	Stations[40370] = new Station(40370, false, ['Blue'], false);

	//Wellington
	Stations[41210] = new Station(41210, false, ['Brn', 'P'], false);

	//Western (Brown Line)
	Stations[41480] = new Station(41480, false, ['Brn'], false);

	//Western (Pink Line)
	Stations[40740] = new Station(40740, false, ['Pink'], false);

	//Western (Blue Line-Forest Park Branch)
	Stations[40220] = new Station(40220, false, ['Blue'], false);

	//Western (Blue Line-O'Hare Branch)
	Stations[40670] = new Station(40670, false, ['Blue'], false);

	//Western (Orange Line)
	Stations[40310] = new Station(40310, false, ['Org'], false);

	//Wilson
	Stations[40540] = new Station(40540, false, ['P', 'Red'], false);

	//Merchandise Mart
	Stations[40460] = new Station(40460, false, ['Brn', 'P'], false);
}


StationLookup.Stations = Stations;



function Station(stationId, stationName, stationLines, hasPurpleAndIsInLoop) {

	this.stationId = stationId;
	this.stationName = stationName;
	this.stationLines = stationLines;
	this.hasPurpleAndIsInLoop = hasPurpleAndIsInLoop;

	this.process = function() {

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

module.exports = StationLookup;