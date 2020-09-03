// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Time Chart
function loadTimeChart(bookList) {
    Chart.Line('myTimeChart', {
        data: {
            datasets: [{
                label: "Pages",
                data: getTimeData(bookList),
                lineTension: 0.5,
                backgroundColor: "rgba(54, 185, 204, 0.05)",
                borderColor: "rgba(54, 185, 204, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(54, 185, 204, 1)",
                pointBorderColor: "rgba(54, 185, 204, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(54, 185, 204, 1)",
                pointHoverBorderColor: "rgba(54, 185, 204, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2
            }]
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 15
                    }
                }],
                yAxes:[{
                    gridLines: {
                        drawBorder: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 7
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });
}

function getTimeData(books) {
    var data = [];
    // data.push({
    //     x: moment(books[0].dateFinished).subtract(5, 'days'),
    //     y: 0
    // });
    
    for (var i = 0; i < books.length; i++) {
        var bookData = {
            x : moment(books[i].dateFinished).format("DD MMM YYYY"),
            y : getCumulativePages(books, i)
        };
        data.push(bookData);
    }

    console.log(JSON.stringify(data));
    return data;
}

function getCumulativePages(books, index) {
    var totalCurrPages = 0;
    for (var i = index; i >= 0; i--) {
        totalCurrPages += books[i].pages;
    }
    return totalCurrPages;
}