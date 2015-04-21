var map;

function initialize() {
  var mapOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
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
     $("#stopRun").show();
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h6.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();


/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
    clearTimeout(t);
}
 
}

var h6 = document.getElementsByTagName('h6')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stopRun'),
    seconds = 0, minutes = 0, hours = 0,
    t;