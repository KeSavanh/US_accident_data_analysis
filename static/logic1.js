// adding cities in the dropdown menu

let cities = ['Los Angeles', 'Dallas', 'New York', 'San Diego']

d3.select("#selCity").selectAll('option')
    .data(cities)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });

// adding years in the dropdown menu
let years = [2019, 2020]

d3.select("#selYear").selectAll('option')
    .data(years)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });


//calling selectCity function when selecting city from dropdown menu

d3.select("#selCity").selectAll("option").on("change", () => {
    selectCity(d3.select(this).text)

});

function selectCity(selectedCity) {

    console.log(selectedCity)

    const url = '/year/data'

    d3.json(url).then(function (data) {
        console.log(data);

    })

    d3.select("#selYear").selectAll("option").on("change", () => {
        var selectedYear = d3.select(this).text
    });

    console.log(selectedYear)

}






/*

// Define arrays to hold the created city and state markers.
var accidentMarkers = [];
// Loop through locations, and create the city and state markers.
for (var i = 0; i < cityData.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    accidentMarkers.push(L.marker([data[i].lat, data[i].lng]))
};

accidentsLayer = L.layerGroup(accidentMarkers);

createMap(accidentsLayer)
*/


/*

function createMap(accidentsLayer) {
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    // Creating the map object
    // Define a map object.
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, accidentsLayer]
    });

    // Create a baseMaps object.
    var baseMaps = {
        "Street Map": street,
        "Accident Map": accidentsLayer
    };

    // Create an overlay object.
    var overlayMaps = {
        "Accident Map": accidentsLayer
    };
    // Pass our map layers to our layer control.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

};
*/




// A function to determine the marker size based on the population
// function markerSize(severity) {
//     return severity * 50;
// };


