Meteor.startup( () => {
	// BrowserPolicy.content.allowInlineScripts()
	// BrowserPolicy.content.allowInlineStyles()
	// BrowserPolicy.content.allowFrameOrigin( '*' );
	// BrowserPolicy.framing.restrictToOrigin( '*' );

	BrowserPolicy.framing.disallow();
	BrowserPolicy.content.disallowInlineScripts();
	BrowserPolicy.content.disallowEval();
	BrowserPolicy.content.allowInlineStyles();
	BrowserPolicy.content.allowFontDataUrl();

	var trusted = [
	  '*.fonts.googleapis.com/css?family=Press+Start+2P',
	  '*.fonts.googleapis.com/css?family=Bungee'
	];

	_.each(trusted, function(origin) {
	  origin = "https://" + origin;
	  BrowserPolicy.content.allowOriginForAll(origin);
	});
});
