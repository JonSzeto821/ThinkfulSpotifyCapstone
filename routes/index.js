var express = require('express');
var router = express.Router();

var SpotifyWebApi = require('spotify-web-api-node');

// Set necessary parts of the credentials on the constructor
var spotifyApi = new SpotifyWebApi({
	clientId : 'b2594ecbc0be42aea7256e01f3d9d768',
	clientSecret : 'b0fbe63cbce44e31bebc7723c421ff52'
});

// Get an access token and 'save' it using a setter
spotifyApi.clientCredentialsGrant()
.then(function(data) {
	console.log('The access token is ' + data.body['access_token']);
	spotifyApi.setAccessToken(data.body['access_token']);
}, function(err) {
	console.log('Something went wrong!', err);
});



/* GET home page. */
router.post('/artist', function(req, res, next) {
	// Get Elvis' albums
	console.log('Elvis');
	console.log(req.body);
	spotifyApi.searchArtists(req.body.artist)
	.then(function(data) {
		console.log('Artist albums', data.body.artists.items);
		return res.status(200).json({data:data.body.artists.items});
		//res.render('index', { title: 'Soccer',testText: 'Hello there', albums: data.body.artists.items });
	}, function(err) {
		console.error(err);
	});

});

router.get('/', function(req, res, next) {
	// Get Elvis' albums
		res.render('index', { title: 'Discover Top Artists by Country', description: 'Search for a country in input box or drag location marker to a country on map (above)', albums:[] });
	})

router.post('/tracks', function(req, res, next) {
// Get tracks in an album
console.log(req.body);
console.log("penguins");
spotifyApi.searchTracks(`artist:${req.body.artist}`)
  .then(function(data) {
    console.log('Search tracks by "Love" in the artist name', data.body.tracks.items[0]);
    return res.status(200).json({data:data.body.tracks.items});
  }, function(err) {
    console.log('Something went wrong!', err);
  });
});

//Retrieve Featured Playlists
router.post('/location', function(req, res, next) {
	console.log(req.body);
	spotifyApi.getNewReleases({ limit : 5, offset: 1, country: req.body.countryCode, timestamp:'2014-10-23T09:00:00' })
		.then(function(data) {
			console.log(`artists from ${req.body.countryCode}`);
			console.log(data.body);
			//console.log(data.body.playlists.items[0]);
			//console.log(data.body.playlists.items[0].name);
			//console.log(data.body.playlists.items[0].id);
			return res.status(200).json({featurePlaylist:data.body});
		}, function(err) {
			console.log("Something went wrong!", err);
			console.log("There is no music for this country");
	});
});

module.exports = router;
