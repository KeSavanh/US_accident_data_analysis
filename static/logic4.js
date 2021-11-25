//////////////////////////////////////
// DALLAS VS LOS ANGELES WEATHER COMPARISON////

d3.json("/weather/data").then(function (data) {
    console.log(data);
    names = data.map(function (row) {
        return row
    });
    //FILTERING FOR Dallas
    function cityDallas(data1) {
        return (data1.city == 'Dallas');

    }
    let City1 = data.filter(cityDallas);
    console.log(City1);
    //FILTERING FOR Los Angeles
    function cityLA(data1) {
        return (data1.city == 'Los Angeles');
    }
    let City2 = data.filter(cityLA);
    stackbar();

    function stackbar() {
        let trace1 = {
            x: City1.map(row => row.weather),
            y: City1.map(row => row.accidents_count),
            name: "Dallas",
            type: "bar"
        };
        let trace2 = {
            x: City2.map(row => row.weather),
            y: City2.map(row => row.accidents_count),
            name: 'Los Angeles',
            type: "bar"
        }
        // Data trace array
        let traceData = [trace2, trace1];

        // Apply the group barmode to the layout
        let layout1 = {
            barmode: 'stack',
            // title:data.map(row => row.city),
            height: 700,
            width: 700
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot1", traceData, layout1);
    }
});

//////////////////////////////////////////////////
//SEVERITY VS WEATHER COMPARISON//
d3.json("/prcp-wsp/data").then(function (data) {
    //  console.log(data);
    //TRACE  FOR Severity vs Precipitation
    let trace1 = {
        x: data.map(row => row.severity),//row.severity),
        y: data.map(row => row.precipitation),//row.precipitation),
        name: "precipitation",
        //mode: 'markers',
        type: "bar"
    };
    //TRACE  FOR Severity vs Wind Speed
    let trace2 = {
        x: data.map(row => row.severity),
        y: data.map(row => row.wind_speed),
        name: "wind_speed",
        //mode: 'markers',
        type: "bar"
    };
    // Data trace array
    let traceData = [trace2];
    let traceprcp = [trace1];

    // Apply the group barmode to the layout
    let layout1 = {
        // barmode: 'group',
        title: 'Severity vs Precipitation',
        height: 400,
        width: 400
    };
    let layout2 = {
        // barmode: 'group',
        title: 'Severity vs Windspeed',
        height: 400,
        width: 400
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot2", traceData, layout2);
    Plotly.newPlot("plot3", traceprcp, layout1);
});


