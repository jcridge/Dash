// bar chart data
var barData = {
    labels : ["January","February","March","April","May","June"],
    datasets : [
        {
            fillColor : "#48A497",
            strokeColor : "#48A4D1",
            data : [0.5,1.02,1.7,9.1,30.1,60.4]
        }
    ]
}

var baroptions = {
    scaleShowGridLines : false,
    showTooltips: false
}

var runchart = document.getElementById("runChart").getContext("2d");
new Chart(runchart).Bar(barData, baroptions);    