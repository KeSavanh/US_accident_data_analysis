

/////////////////////////////////////////////
////  Section One  /////////////////////////
////////////////////////////////////////////
 //////////////////
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
        // title: data.map(row => row.city),
        height: 400,
        width: 400,
        title: "Total Accident Counts in Four Cities",
        xaxis: {title: {text: " City"}, automargin: true},
        yaxis: {title: {text: " Accident Count"}, automargin: true}
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot-sect-1-1", traceData, layout1);
});


//MONTHWISE ANALYSIS FOR CITIES ////
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
            mode: 'lines',
            line: {
                color: 'red',
                width: 3
            }
        };
        ///TRACE FOR LOS ANGELES
        let trace2 = {
            x: LAcity.map(row => row.year_month),
            y: LAcity.map(row => row.accidents_count),
            name: 'Los Angeles',
            mode: 'lines',
            line: {
                color: 'blue',
                width: 3
            }
        }
        ///TRACE FOR NEW YORK
        let trace3 = {
            x: NYcity.map(row => row.year_month),
            y: NYcity.map(row => row.accidents_count),
            name: 'New York',
            mode: 'lines',
            line: {
                color: 'green',
                width: 3
            }
        }
        ///TRACE FOR SAN DIEGO
        let trace4 = {
            x: SDcity.map(row => row.year_month),
            y: SDcity.map(row => row.accidents_count),
            name: 'San Diego',
            mode: 'lines',
            line: {
                color: 'orange',
                width: 3
            }
        }
        // Data trace array
        let traceData = [trace2, trace1, trace3, trace4];

        // Apply the group barmode to the layout
        let layout1 = {
            title: 'Monthly Varation of Total Accident Counts from 2019 to 2020',
            height: 500,
            width: 1000,
            xaxis: {title: {text: ' Month'},
                     automargin: true,
                     linecolor: 'black',
                    linewidth: 1,
                    mirror: true },
            yaxis: {title: {text: ' Accident Count'},
                     automargin: true,
                     linecolor: 'black',
                     linewidth: 1,
                     mirror: true }

        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot-sect-1-2", traceData, layout1);
    }
});



/////////////////////////////////////////////
////  Section Two  /////////////////////////
////////////////////////////////////////////

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
            fill: 'tonexty',
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
            fill: 'tonexty',
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
            fill: 'tonexty',
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
            fill: 'tonexty',
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
            title: 'Accidents Percentage Variation Hourly',
            xaxis: { title: 'hours', 
                    linecolor: 'black',
                    linewidth: 1,
                    mirror: true },
            yaxis: { title: 'Accident Counts Percentage' ,
                    linecolor: 'black',
                    linewidth: 1,
                    mirror: true},
            height: 500,
            width: 1000

        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot-sect-2-1", traceData, layout1);
    }
});

/////////////////////////////////////////////
////  Section Two-1  myChart////////////////
////////////////////////////////////////////
///////////////////////////////////////////
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
                fontSize: 20
            },
            legend: {
                position: "right",
                labels: {
                    fontColor: "black"
                },
                layout: {
                    padding: {
                        left: 2,
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



/////////////////////////////////////////////
////  Section Three  ///////////////////////
////////////////////////////////////////////

// TRAFFIC CONDITION COMPARISON//

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
        title: 'Total Accident counts Vs. Traffic Conditions',
        xaxis: {title: {text: 'Traffic Conditions', standoff: 40}, 
                automargin: true,
                linecolor: 'black',
                linewidth: 1,
                mirror: true},

        yaxis: {title: 'Accident Count',  automargin: true,
                linecolor: 'black',
                linewidth: 1,
                mirror: true},
        height: 600,
        width: 1000,
        
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot-sect-3-1", traceData, layout1);
}); 


/////////////////////////////////////////////
////  Section Three-2  /////////////////////
////////////////////////////////////////////

//////////////////////////////////////
// DALLAS VS LOS ANGELES WEATHER COMPARISON////

d3.json("/weather/data").then(function (data) {
    console.log(data);
    names = data.map(function (row) {
        return row
    });

    //FILTERING FOR Dallas
    let City1 = data.filter(item => item.city == 'Dallas');
    //FILTERING FOR Los Angeles
    let City2 = data.filter(item => item.city == 'Los Angeles');
    //FILTERING FOR Los Angeles
    let City3 = data.filter(item => item.city == 'New York');
    //FILTERING FOR Los Angeles
    let City4 = data.filter(item => item.city == 'San Diego');

    stackbar();

    function stackbar() {
        let trace1 = {
            x: City1.map(row => row.accidents_count),
            y: City1.map(row => row.weather),
            name: "Dallas",
            type: "bar",
            orientation :'h',
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'descending'
              }]  
        };
        let trace2 = {
            x: City2.map(row => row.accidents_count),
            y: City2.map(row => row.weather),
            name: 'Los Angeles',
            type: "bar",
            orientation :'h',
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'descending'
              }] 
        };
        let trace3 = {
            x: City3.map(row => row.accidents_count),
            y: City3.map(row => row.weather),
            name: "New York",
            type: "bar",
            orientation :'h',
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'descending'
              }]  
        };
        let trace4 = {
            x: City4.map(row => row.accidents_count),
            y: City4.map(row => row.weather),
            name: "San Diego",
            type: "bar",
            orientation :'h',
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'descending'
              }]
        };
        // Data trace array
        let traceData = [trace2, trace1, trace3, trace4];

        // Apply the group barmode to the layout
        let layout1 = {
            barmode: 'stack',
            // title:data.map(row => row.city),
            height: 500,
            width: 1000,
            title: 'Total Accident counts Vs. Weather Conditions',
            xaxis: {title: 'Accident Count',
                    linecolor: 'black',
                    linewidth: 1,
                    mirror: true},
            yaxis: {title: {text:'Weather Condition', standoff: 40}, 
                    automargin: true,
                    linecolor: 'black',
                    linewidth: 1,
                    mirror: true}
            
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot-sect-3-2", traceData, layout1);
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
        mode: 'markers',
        type: "scatter"
    };
    //TRACE  FOR Severity vs Wind Speed
    let trace2 = {
        x: data.map(row => row.severity),
        y: data.map(row => row.wind_speed),
        name: "wind_speed",
        mode: 'markers',
        type: "scatter"
    };
    // Data trace array
    let traceData = [trace2];
    let traceprcp = [trace1];

    // Apply the group barmode to the layout
    let layout1 = {
        // barmode: 'group',
        title: 'Severity vs Precipitation',
        height: 400,
        width: 400,
        xaxis: {title: {text: "Severity"}, automargin: true},
        yaxis: {title: {text: " Precipitation (in)"}, automargin: true}
    };
    let layout2 = {
        // barmode: 'group',
        title: 'Severity vs Windspeed',
        height: 400,
        width: 400,
        xaxis: {title: {text: "Severity"}, automargin: true},
        yaxis: {title: {text: " Wind Speed (mi)"}, automargin: true}
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot-sect-4-2-1", traceData, layout2);
    Plotly.newPlot("plot-sect-4-2", traceprcp, layout1);
});






 //////
 ///// animation bar chart
 initAnimation();
 function initAnimation(){
          //Animation chart
     // set the dimensions and margins of the graph
     var margin = {top: 10, right: 30, bottom: 90, left:90},
     width = 460 - margin.left - margin.right,
     height = 450 - margin.top - margin.bottom;
 
     // append the svg object to the body of the page
     var svg = d3.select("#my_dataviz")
     .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform",
           "translate(" + margin.left + "," + margin.top + ")");
 
     // Parse the Data
     d3.json("/severity/data").then(function(data) {
     console.log(data);
     // X axis
     var x = d3.scaleBand()
     .range([ 0, width ])
     .domain(data.map(function(d) { return d.severity; }))
     .padding(0.2);
     svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x))
     .selectAll("text")
     .attr("transform", "translate(-10,0)rotate(-45)")
     .style("text-anchor", "end");
 
     // Add Y axis
     var y = d3.scaleLinear()
     .domain([0, 13000])
     .range([ height, 0]);
     svg.append("g")
     .call(d3.axisLeft(y));
 
     // Bars
     svg.selectAll("mybar")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d) { return x(d.severity); })
     .attr("width", x.bandwidth())
     .attr("fill", "#69b3a2")
     // no bar at the beginning thus:
     .attr("height", function(d) { return height - y(0); }) // always equal to 0
     .attr("y", function(d) { return y(0); })
 
     // Animation
     svg.selectAll("rect")
     .transition()
     .duration(800)
     .attr("y", function(d) { return y(d.accidents_count); })
     .attr("height", function(d) { return height - y(d.accidents_count); })
     .delay(function(d,i){console.log(i) ; return(i*100)})
 
   });
 }





