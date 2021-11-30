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
/*
//////////////////////////////////////////////////////////////////////
// Radar Chart for road condition

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

*/


//////////////////////////////////////////////////////////////////////
// Radar Chart for weekly data

d3.json('/weekly/data').then((response) => {

    console.log(response);

    //FILTERING FOR Dallas  
    let Dallascity = response.filter(item => item.city == "Dallas");

    //FILTERING FOR Los Angeles
    let LAcity = response.filter(item => item.city == 'Los Angeles');

    //FILTERING FOR New York
    let NYcity = response.filter(item => item.city == 'New York');

    //FILTERING FOR San Diego
    let SDcity = response.filter(item => item.city == 'San Diego');

    function find_total(city) {
        let total = 0;
        for (item of city) {
            total += item.accidents_count
        }
        return total;
    }
    let DallasAvg = [];
    let LAAvg = [];
    let NYAvg = [];
    let SDAvg = [];

    for (item of Dallascity) { DallasAvg.push((item.accidents_count / find_total(Dallascity)) * 100); }
    for (item of LAcity) { LAAvg.push((item.accidents_count / find_total(LAcity)) * 100); }
    for (item of NYcity) { NYAvg.push((item.accidents_count / find_total(NYcity)) * 100); }
    for (item of SDcity) { SDAvg.push((item.accidents_count / find_total(SDcity)) * 100); }


    let myChart = document.getElementById('myChart').getContext('2d');

    let radarChart = new Chart(myChart, {
        type: 'radar',
        data: {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
                label: ' Dallas ',
                data: DallasAvg,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            },
            {
                label: 'Los Angeles',
                data: LAAvg,
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'

            },
            {
                label: 'New York',
                data: NYAvg,
                fill: true,
                backgroundColor: 'rgba(60, 179, 113, 0.2)',
                borderColor: 'rgb(60, 179, 113)',
                pointBackgroundColor: 'rgb(60, 179, 113)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(60, 179, 113)'

            },
            {
                label: 'San Diego',
                data: SDAvg,
                fill: true,
                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                borderColor: 'rgb(255, 165, 0)',
                pointBackgroundColor: 'rgb(255, 165, 0)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 165, 0)'

            }]
        },
        options: {
            title: {
                display: true,
                text: "Average Accidents count on Weekdays",
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




