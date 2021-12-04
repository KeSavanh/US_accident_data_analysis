let plotlyConfig = {
    responsive: true
};

//WEEKLY ANALYSIS FOR CITIES////
d3.json("/weekly/data").then(function (data) {
    console.log(data);
    //FILTERING FOR Dallas
    function City1(data1) {
        return (data1.city == 'Dallas');
    }
    let Dallascity = data.filter(City1);

    //FILTERING FOR Los Angeles
    function City2(data1) {
        return (data1.city == 'Los Angeles');
    }
    let LAcity = data.filter(City2);

    //FILTERING FOR New York
    function City3(data1) {
        return (data1.city == 'New York');
    }
    let NYcity = data.filter(City3);

    //FILTERING FOR San Diego
    function City4(data1) {
        return (data1.city == 'San Diego');
    }
    let SDcity = data.filter(City4);

    function find_total(city) {
        let total = 0;
        for (item of city) {
            total += item.accidents_count
        }
        return total;
    }


    Lineplot();


    function Lineplot() {
        ///TRACE FOR DALLAS
        let trace1 = {
            x: Dallascity.map(row => row.weekday),
            y: Dallascity.map(row => ((row.accidents_count) / find_total(Dallascity)) * 100),
            name: "Dallas",
            type: "scatter",
            mode: 'lines',
            line: {
                color: '#990099',
                width: 3
            }
        };
        ///TRACE FOR LOS ANGELES
        let trace2 = {
            x: LAcity.map(row => row.weekday),
            y: LAcity.map(row => ((row.accidents_count) / find_total(LAcity)) * 100),
            name: 'Los Angeles',
            type: "scatter",
            mode: 'lines',
            line: {
                color: '#6b62c7',
                width: 3
            }
        }
        ///TRACE FOR NEW YORK
        let trace3 = {
            x: NYcity.map(row => row.weekday),
            y: NYcity.map(row => ((row.accidents_count) / find_total(NYcity)) * 100),
            name: 'New York',
            type: "scatter",
            mode: 'lines',
            line: {
                color: '#129488',
                width: 3
            }
        }
        ///TRACE FOR SAN DIEGO
        let trace4 = {
            x: SDcity.map(row => row.weekday),
            y: SDcity.map(row => ((row.accidents_count) / find_total(SDcity)) * 100),
            name: 'San Diego',
            type: "scatter",
            mode: 'lines',
            line: {
                color: '#FF6600',
                width: 3
            }
        }
        // Data trace array
        let traceData = [trace2, trace1, trace3, trace4];

        // Apply the group barmode to the layout
        let layout1 = {
            xaxis: {
                tickvals: ['0', '1', '2', '3', '4', '5', '6'],
                ticktext: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                tickangle: 45,
                linecolor: 'black',
                linewidth: 2,
                mirror: true
            },
            yaxis: {
                title: 'accident_counts_percentage',
                linecolor: 'black',
                linewidth: 2,
                mirror: true
            },
            title: 'accidents_percentage variation on weekdays',
            height: 400,
            width: 500

        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot1", traceData, layout1, plotlyConfig);
    }
});

/////////////////////////////////////////////

//HOURLY ANALYSIS FOR CITIES////
d3.json("/hourly/data").then(function (data) {
    console.log(data);
    //FILTERING FOR Dallas
    function City1(data1) {
        return (data1.city == 'Dallas');
    }
    let Dallascity = data.filter(City1);

    //FILTERING FOR Los Angeles
    function City2(data1) {
        return (data1.city == 'Los Angeles');
    }
    let LAcity = data.filter(City2);

    //FILTERING FOR New York
    function City3(data1) {
        return (data1.city == 'New York');
    }
    let NYcity = data.filter(City3);

    //FILTERING FOR San Diego
    function City4(data1) {
        return (data1.city == 'San Diego');
    }
    let SDcity = data.filter(City4);

    function find_total(city) {
        let total = 0;
        for (item of city) {
            total += item.accidents_count
        }
        return total;
    }

    Lineplot();

    function Lineplot() {
        ///TRACE FOR DALLAS
        let trace1 = {
            x: Dallascity.map(row => row.hour),
            y: Dallascity.map(row => ((row.accidents_count) / find_total(Dallascity)) * 100),
            name: "Dallas",
            type: "scatter",
            mode: 'lines',
            line: {
                color: '#990099',
                width: 3
            }
        };
        ///TRACE FOR LOS ANGELES
        let trace2 = {
            x: LAcity.map(row => row.hour),
            y: LAcity.map(row => ((row.accidents_count) / find_total(LAcity)) * 100),
            name: 'Los Angeles',
            type: "scatter",
            mode: 'lines',
            line: {
                color: '#6b62c7',
                width: 3
            }
        }
        ///TRACE FOR NEW YORK
        let trace3 = {
            x: NYcity.map(row => row.hour),
            y: NYcity.map(row => ((row.accidents_count) / find_total(NYcity)) * 100),
            name: 'New York',
            type: "scatter",
            mode: 'lines',
            line: {
                color: '#129488',
                width: 3
            }
        }
        ///TRACE FOR SAN DIEGO
        let trace4 = {
            x: SDcity.map(row => row.hour),
            y: SDcity.map(row => ((row.accidents_count) / find_total(SDcity)) * 100),
            name: 'San Diego',
            type: "scatter",
            mode: 'lines',
            line: {
                color: '#FF6600',
                width: 3
            }
        }
        // Data trace array
        let traceData = [trace2, trace1, trace3, trace4];

        // Apply the group barmode to the layout
        let layout1 = {
            title: 'accidents_percentage variation hourly',
            xaxis: {
                title: 'hours',
                linecolor: 'black',
                linewidth: 2,
                mirror: true
            },
            yaxis: {
                title: 'accident_counts_percentage',
                linecolor: 'black',
                linewidth: 2,
                mirror: true
            },
            height: 400,
            width: 500
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot2", traceData, layout1, plotlyConfig);
    }
});


