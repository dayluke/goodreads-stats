// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Area Chart Example
function loadRadarChart(genreList) {
    var genreDict = {};
    genreList.forEach(genre => {
        if (genreDict[genre]) genreDict[genre] = genreDict[genre] + 1;
        else genreDict[genre] = 1;
    });

    // Solution for sorting dictionary's by their value: https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
    var items = Object.keys(genreDict).map((key) => { return [key, genreDict[key]] });
    items.sort((first, second) => { return second[1] - first[1] });
    items = items.slice(0, 5);
    
    // Other ideas for progress/charts?
    // cumulative pages
    // currently reading percentage read

    Chart.Radar('myRadarChart', {
        data: {
            labels: getRadarData(items, 'label'),
            datasets: [{
                data: getRadarData(items, 'data'),
                backgroundColor: 'rgba(28, 200, 138, 0.05)',
                borderColor: 'rgba(28, 200, 138, 1)',
                pointHoverBackgroundColor: 'rgba(28, 200, 138, 1)',
                pointHoverBorderColor: 'rgba(28, 200, 138, 1)',
            }],
        },
        options: {
            maintainAspectRatio: false,
            scale: {
                ticks: {
                    maxTicksLimit: 5,
                    suggestedMin: 0,
                    suggestedMax: Math.round(getRadarData(items, 'data')[0] / 5) * 5
                }
            },
            tooltips: {
                enabled: false
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });
}

function getRadarData(genres, desiredData) {
    var data = [];
    genres.forEach(genre => {
        if (desiredData == 'label') data.push(genre[0].toUpperCase());
        else if (desiredData == 'data') data.push(genre[1]);
    });
    return data;
}