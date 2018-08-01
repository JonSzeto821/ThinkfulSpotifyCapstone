var geocoder;
var map;
var marker;

var codeAddress = function (city='Spain') {
    geocoder = new google.maps.Geocoder();
  
  var address = document.getElementById('city_country').value || city;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map = new google.maps.Map(document.getElementById('mapCanvas'), {
        zoom: 6,
        streetViewControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          mapTypeIds:[google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP] 
        },
        center: results[0].geometry.location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      map.setCenter(results[0].geometry.location);
      marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        draggable: true,
        title: 'My Title'
      });
      updateMarkerPosition(results[0].geometry.location);
      geocodePosition(results[0].geometry.location);
        
      // Add dragging event listeners.
  google.maps.event.addListener(marker, 'dragstart', function() {
    updateMarkerAddress('Dragging...');
  });
      
  google.maps.event.addListener(marker, 'drag', function() {
    updateMarkerStatus('Dragging...');
    updateMarkerPosition(marker.getPosition());
  });
  
  google.maps.event.addListener(marker, 'dragend', function() {
    updateMarkerStatus('Drag ended');
    geocodePosition(marker.getPosition());
      map.panTo(marker.getPosition()); 
  });
  
  google.maps.event.addListener(map, 'click', function(e) {
   $('form').submit();
   updateMarkerPosition(e.latLng);
    marker.setPosition(e.latLng);
    geocodePosition(marker.getPosition());
  map.panTo(marker.getPosition()); 

  }); 
  
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      //updateMarkerAddress(responses[0].formatted_address);

  for (var i = 0; i < responses[0].address_components.length; i += 1) {
    var addressObj = responses[0].address_components[i];
    for (var j = 0; j < addressObj.types.length; j += 1) {
      if (addressObj.types[j] === 'country') {
        updateMarkerAddress(addressObj.short_name);
      }
    }
  }
    } else {
      updateMarkerAddress('Cannot determine address at this location.');
    }
  });
}

function updateMarkerStatus(str) {
  // console.log(str);
  document.getElementById('markerStatus').innerHTML = str;
}

function updateMarkerPosition(latLng) {
  document.getElementById('info').innerHTML = [
    latLng.lat(),
    latLng.lng()
  ].join(', ');
}

function updateMarkerAddress(str) {
  // console.log(str);
  $.post("/location", {countryCode: str}, function(result){
    document.getElementById('address').innerHTML = str;
    console.log(result);
    loopThroughPlaylist(result.featurePlaylist.albums.items);
    //console.log(result.featurePlaylist.albums.items[0].href);
    //let audioObject = new Audio(result.featurePlaylist.albums.items[0].href); //create a new audio object using the data returned from Spotify.com
    //audioObject.play(); //play the song!!!
  })
}

function loopThroughPlaylist(data) {
  let songHTML='';
  for(let i = 0; i < data.length; i++) {
    //console.log(data[i].uri);
    songHTML += 
    //try to make the button toggle between 'play' and 'pause' (play with the button tags)
      `<div class="song-detail">
        <img src="${data[i].images[0].url}" alt="Album Artwork" class="albumArt"></img><br>  
        <span class="bold">Artist:</span> ${data[i].artists[0].name}<br>
        <span class="bold">Top Album:</span> ${data[i].name} <br>
        <div data-artist-name='${data[i].artists[0].name}' data-album-id='${data[i].id}' class='album js-play-toggle'><button class="play-toggle button"></button></div>
      </div>`

  }
  $('.results').html(songHTML);
}
