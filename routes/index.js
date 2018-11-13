var express = require('express');
var router = express.Router();

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
	clientId : 'b2594ecbc0be42aea7256e01f3d9d768',
	clientSecret : 'b0fbe63cbce44e31bebc7723c421ff52'
});

spotifyApi.clientCredentialsGrant()
	.then(data => {
		spotifyApi.setAccessToken(data.body['access_token']);
	}, err => {
		console.log(err);
	});

router.post('/artist', (req, res, next) => {
	spotifyApi.searchArtists(req.body.artist)
		.then(data => {
			return res.status(200).json({data:data.body.artists.items});
		}, err => {
			console.log(err);
		});

});

router.get('/', (req, res, next) => {
		res.render('index',
			{
				title: 'Discover Top Artists by Country',
				description: 'Search for a country in input box or drag location marker to a country on map (above)',
				albums:[]
			});
	})

router.post('/tracks', (req, res, next) => {
	spotifyApi.searchTracks(`artist:${req.body.artist}`)
	  .then(data => {
	    return res.status(200).json({data:data.body.tracks.items});
	  }, err => {
			console.log(err);
	  });
});

router.post('/location', (req, res, next) => {
	spotifyApi.getNewReleases({ limit : 5, offset: 1, country: req.body.countryCode, timestamp:'2014-10-23T09:00:00' })
		.then(data => {
			return res.status(200).json({featurePlaylist:data.body});
		}, err => {
			console.log(err);
	});
});

module.exports = router;
