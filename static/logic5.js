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

