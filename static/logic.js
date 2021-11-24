/////////////////////////////////////////////////////////////////
//CITY VS ACCIDENT COUNT //index2.html
d3.json("../querydata/sample2.json").then(function(data) {

    //console.log(data);
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
 Plotly.newPlot("plot1", traceData, layout1);
 
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
             width:400
         }
 Plotly.newPlot("pie1",trace2,layout2);


  });
 //////////////////////////////////////////////////
//SEVERITY VS ACCIDENT COUNT//index3.html
d3.json("../querydata/sample3.json").then(function(data) {

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
     //title: "Severity based accident data",
     height:400,
     width:400
    };
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", traceData, layout1);
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
    var layout2={
                height:400,
                width:400
            }
    Plotly.newPlot("pie",trace2,layout2);
});
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
    d3.json("../querydata/sample3.json").then(function(data) {
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

////////////////////////////////////////////
//GROUP CHART FOR CITIES VS 2019 and 2020////index4.html
d3.json("../querydata/sample4.json").then(function(data) {
  console.log(data);
  names = data.map(function (row){
   return row
 });
 //FILTERING FOR YEAR 2019
 function yearfilter19(data1){
   return (data1.year == 2019);
    
 }
 let year2019 = data.filter(yearfilter19);
//   console.log(year2019);
//FILTERING FOR YEAR 2020
  function yearfilter20(data1){
    return data1.year == 2020;
  }
  let year2020 = data.filter(yearfilter20);
 let trace1 = {
   x: year2019.map(row => row.city),
   y: year2019.map(row => row.accidents_count),
   name:"2019",
   type: "bar"
 };
 let trace2={
  x: year2020.map(row => row.city),
  y: year2020.map(row => row.accidents_count),
  name:2020,
  type: "bar"
 }
   // Data trace array
   let traceData = [trace1,trace2];
 
// Apply the group barmode to the layout
   let layout1 = {
    barmode: 'group',
   title:data.map(row => row.city),
   height:400,
   width:400
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot4", traceData, layout1);
});


//////////////////////////////////////
// DALLAS VS LOS ANGELES WEATHER COMPARISON////index5.html

d3.json("../querydata/sample5.json").then(function(data) {
  console.log(data);
  names = data.map(function (row){
   return row
 });
 //FILTERING FOR Dallas
 function cityDallas(data1){
   return (data1.city == 'Dallas');
    
 }
 let City1 = data.filter(cityDallas);
console.log(City1);
//FILTERING FOR Los Angeles
  function cityLA(data1){
    return (data1.city == 'Los Angeles');
  }
  let City2 = data.filter(cityLA);
  stackbar();
  
  function stackbar(){
    let trace1 = {
      x: City1.map(row => row.weather),
      y: City1.map(row => row.accidents_count),
      name:"Dallas",
      type: "bar"
    };
    let trace2={
     x: City2.map(row => row.weather),
     y: City2.map(row => row.accidents_count),
     name:'Los Angeles',
     type: "bar"
    }
      // Data trace array
      let traceData = [trace2,trace1];
    
 // Apply the group barmode to the layout
      let layout1 = {
       barmode: 'stack',
     // title:data.map(row => row.city),
      height:700,
      width:700
  };
 
 // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot5", traceData, layout1);
  }
});

//////////////////////////////////////////////////
//TRAFFIC CONDITION COMPARISON//index6.html
d3.json("../querydata/sample6.json").then(function(data) {
  console.log(data);
   //FILTERING FOR YEAR 2019
 function yearfilter19(data1){
  return (data1.year == 2019);
   
}
let year2019 = data.filter(yearfilter19);
  //console.log(year2019);
//FILTERING FOR YEAR 2020
 function yearfilter20(data1){
   return data1.year == 2020;
 }
 let year2020 = data.filter(yearfilter20);

 //TRACE  FOR Bump_accidents
 let trace1 = {
  x: year2019.map(row => row.cause),
  y: year2019.map(row => row.no),
  name:"2019",
  type: "bar"
};
let trace2={
  x: year2020.map(row => row.cause),
  y: year2020.map(row => row.no),
  name:2020,
  type: "bar"
}
  // Data trace array
  let traceData = [trace1,trace2]//,trace3,trace4];

// Apply the group barmode to the layout
  let layout1 = {
   barmode: 'group',
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot6", traceData, layout1);
});


/////////////////////////////////////////////
//MONTHWISE ANALYSIS FOR CITIES ////index7.html
d3.json("../querydata/sample7.json").then(function(data) {
  console.log(data);
  //FILTERING FOR Dallas
 function City1(data1){
  return (data1.city == 'Dallas');
   
}
let  Dallascity= data.filter(City1);

//FILTERING FOR Los Angeles
 function City2(data1){
   return (data1.city == 'Los Angeles');
 }
 let  LAcity = data.filter(City2);

 //FILTERING FOR New York
 function City3(data1){
  return (data1.city == 'New York');
}
let  NYcity = data.filter(City3);

 //FILTERING FOR San Diego
 function City4(data1){
  return (data1.city == 'San Diego');
}
let  SDcity = data.filter(City4);  
 
Lineplot();
    
   function Lineplot(){
      ///TRACE FOR DALLAS
      let trace1 = {
        x: Dallascity.map(row => row.year_month),
        y: Dallascity.map(row => row.accidents_count),
        name:"Dallas",
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'red',
          width: 3
        }
      };
      ///TRACE FOR LOS ANGELES
      let trace2={
        x: LAcity.map(row => row.year_month),
        y: LAcity.map(row => row.accidents_count),
        name:'Los Angeles',
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'blue',
          width: 3
        }
      }
      ///TRACE FOR NEW YORK
      let trace3={
        x: NYcity.map(row => row.year_month),
        y: NYcity.map(row => row.accidents_count),
        name:'New York',
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'green',
          width: 3
        }
      }
      ///TRACE FOR SAN DIEGO
      let trace4={
        x: SDcity.map(row => row.year_month),
        y: SDcity.map(row => row.accidents_count),
        name:'San Diego',
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'orange',
          width: 3
        }
      }
        // Data trace array
        let traceData = [trace2,trace1,trace3,trace4];
      
   // Apply the group barmode to the layout
        let layout1 = {
        height:500,
        width:700
    };
   
   // Render the plot to the div tag with id "plot"
    Plotly.newPlot("line7", traceData, layout1);
    }
});

//////////////////////////////////////////////////
//SEVERITY VS WEATHER COMPARISON//index8.html
d3.json("../querydata/sample8.json").then(function(data) {
  //  console.log(data);
  //TRACE  FOR Severity vs Precipitation
  let trace1 = {
    x: data.map(row =>row.severity),//row.severity),
    y: data.map(row =>row.precipitation),//row.precipitation),
    name:"precipitation",
    //mode: 'markers',
    type: "bar"
  };
  //TRACE  FOR Severity vs Wind Speed
  let trace2={
    x: data.map(row => row.severity),
    y: data.map(row => row.wind_speed),
    name:"wind_speed",
    //mode: 'markers',
    type: "bar"
  };
  // Data trace array
  let traceData = [trace2];
  let traceprcp=[trace1];

// Apply the group barmode to the layout
  let layout1 = {
  // barmode: 'group',
  title:'Severity vs Precipitation',
  height:400,
  width:400
  };
  let layout2 = {
    // barmode: 'group',
    title:'Severity vs Windspeed',
    height:400,
    width:400
    };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot8", traceData, layout2);
  Plotly.newPlot("plot8prcp", traceprcp, layout1);
});


/////////////////////////////////////////////
//HOURLY ANALYSIS FOR CITIES////index9.html
d3.json("../querydata/sample9.json").then(function(data) {
  console.log(data);
  //FILTERING FOR Dallas
 function City1(data1){
  return (data1.city == 'Dallas');   
}
let  Dallascity= data.filter(City1);

//FILTERING FOR Los Angeles
 function City2(data1){
   return (data1.city == 'Los Angeles');
 }
 let  LAcity = data.filter(City2);

 //FILTERING FOR New York
 function City3(data1){
  return (data1.city == 'New York');
}
let  NYcity = data.filter(City3);

 //FILTERING FOR San Diego
 function City4(data1){
  return (data1.city == 'San Diego');
}
let  SDcity = data.filter(City4);  
 
Lineplot();
    
   function Lineplot(){
      ///TRACE FOR DALLAS
      let trace1 = {
        x: Dallascity.map(row => row.hour),
        y: Dallascity.map(row => row.accidents_count),
        name:"Dallas",
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'red',
          width: 3
        }
      };
      ///TRACE FOR LOS ANGELES
      let trace2={
        x: LAcity.map(row => row.hour),
        y: LAcity.map(row => row.accidents_count),
        name:'Los Angeles',
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'blue',
          width: 3
        }
      }
      ///TRACE FOR NEW YORK
      let trace3={
        x: NYcity.map(row => row.hour),
        y: NYcity.map(row => row.accidents_count),
        name:'New York',
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'green',
          width: 3
        }
      }
      ///TRACE FOR SAN DIEGO
      let trace4={
        x: SDcity.map(row => row.hour),
        y: SDcity.map(row => row.accidents_count),
        name:'San Diego',
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'orange',
          width: 3
        }
      }
        // Data trace array
        let traceData = [trace2,trace1,trace3,trace4];
      
   // Apply the group barmode to the layout
        let layout1 = {
        height:500,
        width:700
    };
   
   // Render the plot to the div tag with id "plot"
    Plotly.newPlot("line9", traceData, layout1);
    }
});



/////////////////////////////////////////////
//WEEKLY ANALYSIS FOR CITIES////index10.html
d3.json("../querydata/sample10.json").then(function(data) {
  //console.log(data);
   //FILTERING FOR Dallas
 function City1(data1){
  return (data1.city == 'Dallas');   
}
let  Dallascity= data.filter(City1);

//FILTERING FOR Los Angeles
 function City2(data1){
   return (data1.city == 'Los Angeles');
 }
 let  LAcity = data.filter(City2);

 //FILTERING FOR New York
 function City3(data1){
  return (data1.city == 'New York');
}
let  NYcity = data.filter(City3);

 //FILTERING FOR San Diego
 function City4(data1){
  return (data1.city == 'San Diego');
}
let  SDcity = data.filter(City4);  
 
Lineplot();
    
   function Lineplot(){
      ///TRACE FOR DALLAS
      let trace1 = {
        x: Dallascity.map(row => row.weekday),
        y: Dallascity.map(row => row.accidents_count),
        name:"Dallas",
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'red',
          width: 3
        }
      };
      ///TRACE FOR LOS ANGELES
      let trace2={
        x: LAcity.map(row => row.weekday),
        y: LAcity.map(row => row.accidents_count),
        name:'Los Angeles',
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'blue',
          width: 3
        }
      }
      ///TRACE FOR NEW YORK
      let trace3={
        x: NYcity.map(row => row.weekday),
        y: NYcity.map(row => row.accidents_count),
        name:'New York',
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'green',
          width: 3
        }
      }
      ///TRACE FOR SAN DIEGO
      let trace4={
        x: SDcity.map(row => row.weekday),
        y: SDcity.map(row => row.accidents_count),
        name:'San Diego',
        type: "scatter",
        mode: 'lines',
        line: {
          color: 'orange',
          width: 3
        }
      }
        // Data trace array
        let traceData = [trace2,trace1,trace3,trace4];
      
   // Apply the group barmode to the layout
        let layout1 = {
          xaxis: {
            tickvals:['0', '1', '2','3','4','5','6'],
            ticktext : ['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday'],
            tickangle: 45
          },
        height:500,
        width:700
    };
   
   // Render the plot to the div tag with id "plot"
    Plotly.newPlot("line10", traceData, layout1);
    }
});