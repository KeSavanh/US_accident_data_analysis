/*
//////////////////////////////////////////////////
//TRAFFIC CONDITION COMPARISON//
d3.json("/roadcondition/data").then(function (data) {
    console.log(data);
    //FILTERING FOR YEAR 2019
    function yearfilter19(data1) {
        return (data1.year == 2019);

    }
    let year2019 = data.filter(yearfilter19);
    //console.log(year2019);
    //FILTERING FOR YEAR 2020
    function yearfilter20(data1) {
        return data1.year == 2020;
    }
    let year2020 = data.filter(yearfilter20);

    //TRACE  FOR Bump_accidents
    let trace1 = {
        x: year2019.map(row => row.cause),
        y: year2019.map(row => row.no),
        name: "2019",
        type: "bar"
    };
    let trace2 = {
        x: year2020.map(row => row.cause),
        y: year2020.map(row => row.no),
        name: 2020,
        type: "bar"
    }
    // Data trace array
    let traceData = [trace1, trace2]//,trace3,trace4];

    // Apply the group barmode to the layout
    let layout1 = {
        barmode: 'group',
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot1", traceData, layout1);
});
*/


d3.json('/roadcondition/data').then((data) => {

    console.log(data);


    let causes = [];
    for (row of data) { if (row.year == 2020) { causes.push(row.cause); } }
    console.log(causes);

    let accidents_count = [];
    for (row of data) { if (row.year == 2020) { accidents_count.push(row.no); } }
    console.log(accidents_count);

    let myChart = document.getElementById('myChart').getContext('2d');

    let radarChart = new Chart(myChart, {
        type: 'radar',
        data: {
            labels: causes,
            datasets: [{
                label: 'Accident counts',
                data: accidents_count,
                backgroundColor: 'red',
                borderwidth: 1,
                borderColor: "grey",
                hoverBorderWidth: 3,
                hoverBorderColor: "black"
            }]
        },
        options: {
            title: {
                display: true,
                text: "Accidents count for different road condition",
                fontSize: 25
            },
            legend: {
                position: "right",
                labels: {
                    fontColor: "black"
                },
                layout: {
                    padding: {
                        left: 0,
                        top: 0,
                        bottom: 0,
                        right: 0
                    }

                },
                tooltips: {
                    enabled: true
                }

            }
        }
    });


})






