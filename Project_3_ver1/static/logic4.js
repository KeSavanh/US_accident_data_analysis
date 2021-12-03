d3.selectAll("#selPlotType").on("change", () => {
    if (d3.sellect('#selPlotType').property('value') == 'bar') {
        createBarChart
    } else if (d3.sellect('#selPlotType').property('value') == 'pie') {
        createPieChart
    }
});


function createBarChart() {

    d3.json("/city/data").then(function(data) {

    console.log(data);
    names = data.map(function (row){
     return row.city
   });
   let trace1 = {
     x: data.map(row => row.city),
     y: data.map(row => row.accidents_count),
     marker:{
      color: ['green','blue', 'red', 'orange']
     },
     type: "bar"
   };
     // Data trace array
     let traceData = [trace1];

// Apply the group barmode to the layout
     let layout1 = {
     //title: "Severity based accident data",
     height:400,
     width:400
 };

// Render the plot to the div tag with id "plot"
 Plotly.newPlot("plot7", traceData, layout1);
    });
    };



function createPieChart() {

    d3.json("/city/data").then(function(data) {

        console.log(data);
        names = data.map(function (row){
         return row.city
       });
    ///////PIE CHART
 values=data.map(row => row.accidents_count);
 //console.log(values);
 labels=data.map(row => row.city);
 var trace2=[
             {
                 values:values,
                 labels:labels,
                 type:"pie"
             }
         ]
 var layout2={
             height:400,
             width:400,
             title: ""
         }
 Plotly.newPlot("plot8",trace2,layout2);


  });
}