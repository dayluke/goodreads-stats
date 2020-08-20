// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
function loadPieChart(avgRating) {
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Average rating'],
            datasets: [{
                data: [avgRating, (5 - avgRating).toFixed(2)],
                backgroundColor: ['#f6c23e', '#f8f9fc'],
                hoverBackgroundColor: ['#f4b515', '#f1f3f9'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
                filter: function (tooltipItem, data) {
                    if (data.labels[tooltipItem.index] === undefined) return false;
                    return true;
                }
        },
        legend: {
            display: false
        },
        cutoutPercentage: 80,
        },
    });
}