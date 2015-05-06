var barData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"],
    datasets: [{
        fillColor: "#4fc3f7",
        strokeColor: "#4fc3f7",
        data: [0.5, 1.02, 1.7, 9.1, 30.1, 25.4, 21.1]
    }]
}
var baroptions = {
    scaleShowGridLines: false,
    showTooltips: false
}
var runchart = document.getElementById("runChart").getContext("2d");
new Chart(runchart).Bar(barData, baroptions);