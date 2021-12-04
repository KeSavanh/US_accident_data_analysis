
//////////////////////////////////////
// accident counts comparison in different weather in 4 cities////

d3.json("/weather/data").then(function (data) {
    console.log(data);

    let yValues=data.filter
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




