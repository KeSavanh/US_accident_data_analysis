function populateState() {
    d3.json("/us_traffic_data").then((data) => {
        console.log(data)
        vehicleData = data;
        let state_codes = [];

        for (row of data) { state_codes.push(row.state_code) }

        d3.select("#selState").selectAll('option')
            .data(state_codes)
            .enter()
            .append('option')
            .text((d) => { return d; })
            .attr("value", function (d) { return d; });

        fetchVehicleData(data);

        d3.select("#selState").on("change", () => {
            fetchVehicleData(data)
        });

    });

}

function fetchVehicleData(data) {
    let selectedState = d3.select("#selState").property("value");

    let statedata = data.filter(item => item.state_code == selectedState)
    console.log(statedata);


    let statedata_2019 = statedata.filter(item => item.year == 19).map(item => item.vehicle_count)
    let statedata_2020 = statedata.filter(item => item.year == 20).map(item => item.vehicle_count)

    let myChart = document.getElementById('trafficPlot').getContext('2d');

    let timeChart = new Chart(myChart, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: ' 2019 ',
                data: statedata_2019,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132,0.2)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            },
            {
                label: '2020',
                data: statedata_2020,
                fill: true,
                backgroundColor: 'rgb(54, 162, 235,0.2)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1

            }]
        },
        options: {
            title: {
                display: true,
                text: "US States Traffic Data",
                fontSize: 25
            },
            legend: {
                position: "right",
                labels: {
                    fontColor: "black"
                },
                layout: {
                    padding: {
                        left: 0,
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
    })
}

document.addEventListener("DOMContentLoaded", function (e) {
    populateState();
});
