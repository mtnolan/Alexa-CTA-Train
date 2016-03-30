<body>
	<h1>CTA Alexa App</h1>
	<p>The CTA Alexa app was created for commuters to check the arrivals of trains using the Amazon Echo.</p>
	<h2>Features</h2>
	<ol>
		<li>Introduction</li>
		<li>Setting a home station</li>
		<li>Checking your home station</li>
		<li>Getting train arrivals</li>
	</ol>
	<h2>Setting a Home Station</h2>
	<p>A home station is the station where Alexa will retrieve train arrivals for.  This is typically the CTA train station closest to your home.  After the home station has been set, Alexa will remember your home station for future requests.  A home station <b>must</b> be set before requesting train arrival times.</p>
	<h3>Alexa Commands</h3>
	<ul>
		<li>
			<b>Command</b><br/>
			Alexa, tell CTA to set my home station to <b>[station name]</b>.
			<br/><b>Description</b><br/>
			This sets your home station to the station name provided.  Every time you retrieve train arrivals you will be asked what line you would like to use.
			<br/><b>Example</b><br/> <i>Alexa, tell CTA to set my home station to Clark and Lake</i>
		</li>
		<p/>
		<li>
			<b>Command</b><br/> Alexa, tell CTA to set my home station to <b>[station name]</b> <b>[line]</b> line.
			<b>Description</b><br/> This sets your home station to the station name and line provided.  
			<b>Example</b><br/> <i>Alexa, tell CTA to set my home station to Clark and Lake</i>
		</li>
	</ul>
	<h2>Retrieving your Home Station</h2>
	<p>This command allows the user to retrieve what the currently set home station is for their account.</p>
	<h3>Alexa Commands</h3>
	<ul>
		<li>
			<b>Command</b><br/>
			Alexa, ask CTA what is my home station.
			<br/><b>Description</b><br/>
			This command retrieves your current home station.
			<br/><b>Example</b><br/> <i>Alexa, ask CTA what is my home station.</i>
		</li>
		<p/>
	</ul>
	<h2>Retrieving Train Arrivals</h2>
	<p>This command allows you to query arriving trains at your home station.  You <b>must</b> set your home station prior to using this command.</p>
	<h3>Alexa Commands</h3>
	<ul>
		<li>
			<b>Command</b><br/>
			Alexa, ask CTA when is the next [Endpoint Destination] bound [Line] line train?.
			<br/><b>Description</b><br/>
			This command specifies a line you with to query and a endpoint destination.  It will retrieve any trains arriving at your home station that are destined for your destination.
			<br/><b>Example</b><br/> <i>Alexa, ask CTA when is the next Kimball bound Brown line train?.</i>
			<i>Alexa, ask CTA when is the next outbound Brown line train?.</i>
		</li>
		<li>
			<b>Command</b><br/>
			Alexa, ask CTA when is the next [Endpoint Destination] bound train?.
			<br/><b>Description</b><br/>
			This command specifies just the endpoint destination.  When the user doesn't specify a line, the line set on the homestation will be used.  If there is no line on the home station, the user will be prompted for a line.
			<br/><b>Example</b><br/> <i>Alexa, ask CTA when is the next Kimball bound train?</i>
			<br/><i>Alexa, ask CTA when is the next outbound train?</i>
			<br/><i>Alexa, ask CTA when is the next outbound purple line train?</i>
		</li>
	</ul>

<h2>Appendix</h2>
<h3>Valid destination endpoints</h3>
<ul>
	<li><b>Brown Line</b>
		<ul>
			<li>"Kimball" bound
				<ul>
					<li>Kimball</li>
					<li>Out-bound</li>
					<li>North-bound</li>
				</ul>
			</li>
			<li>"Loop" bound
				<ul>
					<li>Loop</li>
					<li>In-bound</li>
					<li>South-bound</li>
				</ul>
			</li>
		</ul>
	</li>
	<li><b>Red Line</b>
		<ul>
			<li>"Howard" bound
				<ul>
					<li>Howard</li>
					<li>North-bound</li>
				</ul>
			</li>
			<li>"95th/Dan Ryan" bound
				<ul>
					<li>95th</li>
					<li>95th and the Dan Ryan</li>
					<li>South-bound</li>
				</ul>
			</li>
		</ul>
	</li>
	<li><b>Purple Line</b>
		<ul>
			<li>"Linden" bound
				<ul>
					<li>Lindedn</li>
					<li>Out-bound</li>
					<li>North-bound</li>
				</ul>
			</li>
			<li>"Loop" bound
				<ul>
					<li>Loop</li>
					<li>In-bound</li>
					<li>South-bound</li>
				</ul>
			</li>
		</ul>
	</li>
	<li><b>Blue Line</b>
		<ul>
			<li>"O'Hare" bound
				<ul>
					<li>O'Hare</li>
					<li>North-bound</li>
				</ul>
			</li>
			<li>"Forest Park" bound
				<ul>
					<li>Forest Park</li>
					<li>South-bound</li>
				</ul>
			</li>
		</ul>
	</li>
	<li><b>Green Line</b>
		<ul>
			<li>"Harlem" bound
				<ul>
					<li>Harlem</li>
					<li>Harlem and Lake</li>
				</ul>
			</li>
			<li>"Ashland/63rd" bound
				<ul>
					<li>Ashland</li>
					<li>Ashland and 63rd</li>
				</ul>
			</li>
		</ul>
	</li>
	<li><b>Orange Line</b>
		<ul>
			<li>"Loop" bound
				<ul>
					<li>Loop</li>
					<li>In-bound</li>
					<li>North-bound</li>
				</ul>
			</li>
			<li>"Midway" bound
				<ul>
					<li>Midway/li>
					<li>Out-bound</li>
					<li>South-bound</li>
				</ul>
			</li>
		</ul>
	</li>
	<li><b>Pink Line</b>
		<ul>
			<li>"Loop" bound
				<ul>
					<li>Loop</li>
					<li>In-bound</li>
					<li>East-bound</li>
				</ul>
			</li>
			<li>"Midway" bound
				<ul>
					<li>54th and Cermak/li>
					<li>54th/li>
					<li>Out-bound</li>
					<li>West-bound</li>
				</ul>
			</li>
		</ul>
	</li>
	<li><b>Yellow Line</b>
		<ul>
			<li>"Skokie" bound
				<ul>
					<li>Skokie</li>
					<li>Dempster</li>
				</ul>
			</li>
			<li>"Howard" bound
				<ul>
					<li>Howard</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
</body>
