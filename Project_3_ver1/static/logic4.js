/////////////////////////////////////////////
////  Section Four-1     /////////////////////
////////////////////////////////////////////

/////////////////////////////////////////////////
/// Severity pie & bar


d3.selectAll("#selPlotType").on("change", () => {
    if (d3.select('#selPlotType').property('value') == 'bar') {
        createBarChart()
    } else if (d3.select('#selPlotType').property('value') == 'pie') {
        createPieChart()
    }
});

function createBarChart() {

    d3.json("/severity/data").then(function(data) {

        // console.log(data);
         names = data.map(function (row){
          return row.severity
        });
        let trace1 = {
          x: data.map(row => row.severity),
          y: data.map(row => row.accidents_count),
          marker:{
           color: ['red','blue', 'orange', 'red']
          },
          type: "bar"
        };
          // Data trace array
          let traceData = [trace1];
     
     // Apply the group barmode to the layout
          let layout1 = {
          title: "Severity based accident data",
          height:400,
          width:400,
          xaxis: {title: {text: "Severity"}, automargin: true,
                linecolor: 'black',
                linewidth: 1,
                mirror: true},
            yaxis: {title: {text: " Accident Count"}, automargin: true,
                linecolor: 'black',
                linewidth: 1,
                mirror: true}
         };
         // Render the plot to the div tag with id "plot"
         Plotly.newPlot("plot-sect-4-1", traceData, layout1);
        });
}      

function createPieChart() {

    d3.json("/severity/data").then(function(data) {

    ///////PIE CHART
 //Pie chart
 values=data.map(row => row.accidents_count);
 //console.log(values);
 labels=["Severity 1","Severity 2","Severity 3","Severity 4"];//data.map(row => row.Severity);
 //console.log(labels);
 
 
 var trace2=[
             {
                 values:values,
                 labels:labels,
                 type:"pie"
             }
         ]
 var layout2={title: "Severity based accident data",
            height:400,
            width:400,
            xaxis: {title: {text: "Severity"}, automargin: true,
                    linecolor: 'black',
                    linewidth: 1,
                    mirror: true},
            yaxis: {title: {text: " Accident Count"}, automargin: true,
                    linecolor: 'black',
                    linewidth: 1,
                    mirror: true}
         }
 Plotly.newPlot("plot-sect-4-1",trace2,layout2);


  });
}