// adding cities in the dropdown menu

let cities = ['Los Angeles', 'Dallas', 'New York', 'San Diego']

d3.select("#selCity").selectAll('option')
    .data(cities)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });

//calling selectCity function when selecting city from dropdown menu

d3.selectAll("#selCity").on("change", () => {
    fetchAccidentData();
});

// adding years to dropdown
let years = [2019, 2020]

d3.select("#selYear").selectAll('option')
    .data(years)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });

d3.selectAll("#selYear").on("change", () => {
    fetchAccidentData();
});


function fetchAccidentData() {
    var selectedCity = d3.select("#selCity").property("value");
    console.log("Selected City = " + selectedCity);
    var selectedYear = d3.select("#selYear").property("value");
    console.log("Selected Year = " + selectedYear);

    const url = '/year/data?year=' + selectedYear + '&city=' + selectedCity
    d3.json(url).then(data => handleYearResponse(data));
}

function handleYearResponse(data) {
    console.log(data);

    // Define arrays to hold the created city and state markers.
    var accidentMarkers = [];

    // Loop through locations, and create the accident markers.
    for (var i = 0; i < data.length; i++) {
        accidentMarkers.push(L.circle([data[i].lat, data[i].lng], {
            color: 'black',
            fillColor: chooseColor(data[i].severity),
            fillOpacity: 0.5,
            weight: 0.5,
            radius: markerSize(data[i].severity)
        }).bindPopup(`<h4>Accident_ID: ${data[i].accident_id}</h4> <hr> <h5>Location:${data[i].street}</h5> <br> <h5>Severity:${data[i].severity}</h5> <br><h5>State: ${data[i].state}</h5>`)
        )
    };

    var accidentsLayer = new L.layerGroup(accidentMarkers);

    var heatArray = [];

    for (var i = 0; i < data.length; i++) {
        heatArray.push([data[i].lat, data[i].lng]);
    };


    var heat = L.heatLayer(heatArray, {
        radius: 25,
        blur: 15,
        minOpacity: 0.15,
        gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
    });


    createMap(accidentsLayer, [data[0].lat, data[0].lng], heat)

}

var myMap;

function createMap(accidentsLayer, cityCenter, heat) {
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    var topo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    });

    //clearing map before creating new map
    if (myMap) {
        myMap.remove();
    }


    // Creating the map object
    // Define a map object.
    myMap = L.map("map", {
        center: cityCenter,
        zoom: 10,
        layers: [street, topo, accidentsLayer]
    });



    // Create a baseMaps object.
    var baseMaps = {
        "Street Map": street,
        "Topology Map": topo
    };

    // Create an overlay object.
    var overlayMaps = {
        "Accident Map": accidentsLayer,
        "Heat Map": heat

    };
    // Pass our map layers to our layer control.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);


    // legend map

    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend');

        div.innerHTML += "<h4>Severity</h4>";
        div.innerHTML += '<i style="background: green"></i><span>1</span><br>';
        div.innerHTML += '<i style="background: orange"></i><span>2</span><br>';
        div.innerHTML += '<i style="background: red"></i><span>3</span><br>';
        div.innerHTML += '<i style="background: purple"></i><span>4</span><br>';

        return div;

    };

    legend.addTo(myMap);


};


// A function to determine the marker size based on the population
function markerSize(severity) {
    return severity * 80;
};

function chooseColor(severity) {
    if (severity == 1) { return 'green' }
    else if (severity == 2) { return 'orange' }
    else if (severity == 3) { return 'red' }
    else if (severity == 4) { return 'purple' }
}

document.addEventListener("DOMContentLoaded", function (e) {
    fetchAccidentData();
});

