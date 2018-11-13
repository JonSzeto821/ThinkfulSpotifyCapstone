var geocoder;
var map;
var marker;

var codeAddress = (city='Spain') => {
  geocoder = new google.maps.Geocoder();

  let address = document.getElementById('city_country').value || city;
  geocoder.geocode( { 'address': address}, (results, status) => {
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

      google.maps.event.addListener(marker, 'dragstart', () => {
        updateMarkerAddress('Dragging...');
      });

      google.maps.event.addListener(marker, 'drag', () => {
        updateMarkerStatus('Dragging...');
        updateMarkerPosition(marker.getPosition());
      });

      google.maps.event.addListener(marker, 'dragend', () => {
        updateMarkerStatus('Drag ended');
        geocodePosition(marker.getPosition());
          map.panTo(marker.getPosition());
      });

      google.maps.event.addListener(map, 'click', (e) => {
      $('form').submit();
      updateMarkerPosition(e.latLng);
      marker.setPosition(e.latLng);
      geocodePosition(marker.getPosition());
      map.panTo(marker.getPosition());
    });
    }else{
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, responses => {
    if (responses && responses.length > 0) {
      for (let i = 0; i < responses[0].address_components.length; i += 1) {
        let addressObj = responses[0].address_components[i];
        for (let j = 0; j < addressObj.types.length; j += 1) {
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
  document.getElementById('markerStatus').innerHTML = str;
}

function updateMarkerPosition(latLng) {
  document.getElementById('info').innerHTML = [
    latLng.lat(),
    latLng.lng()
  ].join(', ');
}

function updateMarkerAddress(str) {
  $.post("/location", {countryCode: str}, result => {
    document.getElementById('address').innerHTML = str;
    loopThroughPlaylist(result.featurePlaylist.albums.items);
  })
}

function loopThroughPlaylist(data) {
  let songHTML='';
  for(let i = 0; i < data.length; i++) {
    songHTML +=
      `<div class="song-detail">
        <img src="${data[i].images[0].url}" alt="Album Artwork" class="albumArt"></img><br>
        <span class="bold">Artist:</span> ${data[i].artists[0].name}<br>
        <span class="bold">Top Album:</span> ${data[i].name} <br>
        <div data-artist-name='${data[i].artists[0].name}' data-album-id='${data[i].id}' class='album js-play-toggle'><button class="play-toggle button"></button></div>
      </div>`

  }
  $('.results').html(songHTML);
}
