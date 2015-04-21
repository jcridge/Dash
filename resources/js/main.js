$(document).ready(function(){
    document.addEventListener("deviceready", applicationReady, false);
    $('.modal-trigger').leanModal();
    $('.button-collapse').sideNav({
        menuWidth: 200, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }); 
    $('ul.tabs').tabs();   
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });      
});

function applicationReady(){
    if (navigator.network.connection.type == Connection.NONE) {
        $("#testNetwork").text('No Internet Access');
    }
    if (navigator.network.connection.type == Connection.WIFI) {
        $("#testNetwork").text('WiFi Access');
    }
    if (navigator.network.connection.type == Connection.CELL_2G) {
        $("#testNetwork").text('2G Internet Access');
    }
    if (navigator.network.connection.type == Connection.CELL_3G) {
        $("#testNetwork").text('3G Internet Access');
    }
    if (navigator.network.connection.type == Connection.CELL_4G) {
        $("#testNetwork").text('4G Internet Access');
    }
    if (navigator.network.connection.type == Connection.UNKNOWN) {
        $("#testNetwork").text('Unknown Internet Access');
    }

    $("#deviceProperties").text('Your handset is a ' + device.model + ' running OS ' + device.platform);

    if (navigator.connection.type == 0) {
        $('#networkInfo').text("Offline");
    } else if (navigator.connection.type == 'none') {
        $('#networkInfo').text("Offline");
    } else {
        $('#networkInfo').text("Online");
    }
}