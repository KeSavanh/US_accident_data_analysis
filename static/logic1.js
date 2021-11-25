// adding cities in the dropdown menu

let cities = ['Los Angeles', 'Dallas', 'New York', 'San Diego']

d3.select("#selCity").selectAll('option')
    .data(cities)
    .enter()
    .append('option')
    .text((d) => { return d; })
    .attr("value", function (d) { return d; });

//calling selectCity function when selecting city from dropdown menu

d3.select("#selCity").on("change", () => {
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

d3.select("#selYear").on("change", () => {
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
    // let cityData = data.filter(item => item.city == selectedCity && item.year == selectedYear);
    // console.log(cityData);

    // Define arrays to hold the created city and state markers.
    var accidentMarkers = [];

    // Loop through locations, and create the accident markers.
    for (var i = 0; i < data.length; i++) {
        accidentMarkers.push(L.marker([data[i].lat, data[i].lng]).bindPopup(`<h4>Accident_ID: ${data[i].accident_id}</h4> <hr> <h5>Location:${data[i].street}</h5> <br> <h5>Severity:${data[i].severity}</h5> <br><h5>State: ${data[i].state}</h5>`)
        )
    };

    accidentsLayer = L.layerGroup(accidentMarkers);

    createMap(accidentsLayer, [data[0].lat, data[0].lng])

}

var myMap;
function createMap(accidentsLayer, cityCenter) {
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    if (myMap) {
        myMap.remove();
    }


    // Creating the map object
    // Define a map object.
    myMap = L.map("map", {
        center: cityCenter,
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





// A function to determine the marker size based on the population
function markerSize(severity) {
    return severity * 50;
};

document.addEventListener("DOMContentLoaded", function (e) {
    fetchAccidentData();
});
