// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Area Chart Example
function loadAreaChart(bookList) {
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
    type: 'line',
        data: {
            // labels: getAreaLabels(bookList),
            datasets: [{
                label: "Pages",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: getAreaData(bookList)
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
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
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 7,
                        // padding: 10
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
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
                callbacks: {
                    title: (tooltipItem, data) => {
                        // console.log(data);
                        return bookList[tooltipItem[0].index].title;
                        // return data.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index].x
                    },
                    label: (tooltipItem, data) => {
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].y;
                        return "Pages: " + (value == 0 ? 'N/A' : value);
                    }
                }
            }
        }
    });
}

function getAreaLabels(books) {
    var data = [];
    books.forEach(book => {
        data.push(book.title);
    });
    return data;
}

function getAreaData(books) {
    var data = [];
    books.forEach(book => {
        var bookData = {
            x: moment(book.dateFinished),
            y: book.pages
        };
        data.push(bookData);
    });
    return data;
}