var map;

function initialize() {
  var mapOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    alert('Error: The Geolocation service failed.');
  } else {
    alert('Error: Your browser doesn\'t support geolocation.');
  }

  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(60, 105),
      map: map
  	});  
  map.setCenter(marker.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

function startGeo(){
    // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

    var marker = new google.maps.Marker({
      position: pos,
      map: map
    });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
     $("#startRun").hide();
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}