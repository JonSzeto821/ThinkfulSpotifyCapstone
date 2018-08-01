var express = require('express');
var router = express.Router();

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
	clientId : 'b2594ecbc0be42aea7256e01f3d9d768',
	clientSecret : 'b0fbe63cbce44e31bebc7723c421ff52'
});

spotifyApi.clientCredentialsGrant()
.then(function(data) {
	spotifyApi.setAccessToken(data.body['access_token']);
}, function(err) {

});

router.post('/artist', function(req, res, next) {
	spotifyApi.searchArtists(req.body.artist)
	.then(function(data) {
		return res.status(200).json({data:data.body.artists.items});
	}, function(err) {

	});

});

router.get('/', function(req, res, next) {
		res.render('index', 
			{ 
				title: 'Discover Top Artists by Country', 
				description: 'Search for a country in input box or drag location marker to a country on map (above)', 
				albums:[] 
			});
	})

router.post('/tracks', function(req, res, next) {
	spotifyApi.searchTracks(`artist:${req.body.artist}`)
	  .then(function(data) {
	    return res.status(200).json({data:data.body.tracks.items});
	  }, function(err) {

	  });
});

router.post('/location', function(req, res, next) {
	spotifyApi.getNewReleases({ limit : 5, offset: 1, country: req.body.countryCode, timestamp:'2014-10-23T09:00:00' })
		.then(function(data) {
			return res.status(200).json({featurePlaylist:data.body});
		}, function(err) {

	});
});

module.exports = router;