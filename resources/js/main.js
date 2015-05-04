$(document).ready(function(){
    document.addEventListener("deviceready", applicationReady, false);
    document.addEventListener("resume", applicationResumed, false);
    $('.modal-trigger').leanModal();
    $('.button-collapse').sideNav({
        menuWidth: 200, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }); 
    $('select').material_select();
    $('ul.tabs').tabs();   
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $('#loginRunner').click(function(){
        loginUser();
    });
    $('#registerRunner').click(function(){
        registerUser();
    });
    $('#stopRun').hide();
    $('#startRun').click(function(){
        $('#startRun').hide();
        $('#stopRun').show();
        startGeo();
    });   
    $('#stopRun').click(function(){
        //startGeo();
        clearTimeout(t);
        $('#startRun').show();
        $('#stopRun').hide();
    });       
});

function applicationResumed () {
    navigator.notification.alert(
        'Dash has been resumed.',
        dismissAlert,
        'Dash',
        'OK'
    );
}

function dismissAlert(){

}

function applicationReady(){
    window.addEventListener("batterystatus", onBatteryStatus, false);
    window.addEventListener("batterylow", onBatteryLow, false);
    window.addEventListener("batterycritical", onBatteryCritical, false);

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
        $('.runConnection').text("None");
    } else if (navigator.connection.type == 'none') {
        $('#networkInfo').text("Offline");
        $('.runConnection').text("None");
    } else {
        $('#networkInfo').text("Online");
        $('.runConnection').text("Good");
    }
}

function vibrate() {
    navigator.notification.vibrate(2000);
}

function onBatteryStatus(info){
    $("#batteryProperties").text("Your battery is at level" + info.level);
}

function onBatteryLow(info){
    navigator.notification.vibrate(2000);
    navigator.notification.beep(1);
    alert("Your battery level is " + info.level + "%. Grab a charger!");
}

function onBatteryCritical(info){
    navigator.notification.vibrate(2000);
    navigator.notification.beep(3);
    alert("Your battery level is at a critical level of " + info.level);
}