//GROUP CHART FOR CITIES VS 2019 and 2020////city.html

d3.json("/city/data").then(data => {
    console.log(data);
    names = data.map(function (row) {
        return row
    });

    //FILTERING FOR YEAR 2019
    function yearfilter19(data1) {
        return (data1.year == 2019);

    }
    let year2019 = data.filter(yearfilter19);
    //   console.log(year2019);
    //FILTERING FOR YEAR 2020
    function yearfilter20(data1) {
        return data1.year == 2020;
    }
    let year2020 = data.filter(yearfilter20);
    let trace1 = {
        x: year2019.map(row => row.city),
        y: year2019.map(row => row.accidents_count),
        name: "2019",
        type: "bar"
    };
    let trace2 = {
        x: year2020.map(row => row.city),
        y: year2020.map(row => row.accidents_count),
        name: 2020,
        type: "bar"
    }
    // Data trace array
    let traceData = [trace1, trace2];

    // Apply the group barmode to the layout
    let layout1 = {
        barmode: 'group',
        title: data.map(row => row.city),
        height: 400,
        width: 400
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot1", traceData, layout1);
});



/////////////////////////////////////////////
//MONTHWISE ANALYSIS FOR CITIES ////index7.html
d3.json("/monthly/data").then(function (data) {
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

    Lineplot();

    function Lineplot() {
        ///TRACE FOR DALLAS
        let trace1 = {
            x: Dallascity.map(row => row.year_month),
            y: Dallascity.map(row => row.accidents_count),
            name: "Dallas",
            fill: 'tozeroy',
            type: 'scatter'
        };
        ///TRACE FOR LOS ANGELES
        let trace2 = {
            x: LAcity.map(row => row.year_month),
            y: LAcity.map(row => row.accidents_count),
            name: 'Los Angeles',
            fill: 'tonexty',
            type: 'scatter'
        }
        ///TRACE FOR NEW YORK
        let trace3 = {
            x: NYcity.map(row => row.year_month),
            y: NYcity.map(row => row.accidents_count),
            name: 'New York',
            fill: 'tonexty',
            type: 'scatter'
        }
        ///TRACE FOR SAN DIEGO
        let trace4 = {
            x: SDcity.map(row => row.year_month),
            y: SDcity.map(row => row.accidents_count),
            name: 'San Diego',
            fill: 'tonexty',
            type: 'scatter'
        }
        // Data trace array
        let traceData = [trace2, trace1, trace3, trace4];

        // Apply the group barmode to the layout
        let layout1 = {
            height: 500,
            width: 700
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot2", traceData, layout1);
    }
});