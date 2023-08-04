// Store our API endpoint as queryUrl.
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Create the initial map showing the U.S.
let myMap = L.map("map", {
    center: [39.232, -106.0000],
    zoom: 5
});

//Create the base layer
let baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Create baseMaps object
let baseMaps = {Street: baseLayer};

//Create overlayMaps object
let overlayMaps = {};

//Create a style object
let markerStyle = {
    radius: 15,
    color: 'black',
    fillColor: '#006837',
    //fillOpacity: 0.75,
    weight: 0.5

};

// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
    console.log(data.features);
    let features = data.features;
    

    let earthquakeMarkers = [];

    let radiusArray = [];
    let depthArray = [];
    let latlngArray = [];

    //createFeatures(data.features);
    for (let i=0;i<features.length;i++) {
        
        radiusArray.push(data.features[i].properties.mag);
        depthArray.push(features[i].geometry.coordinates[2]);
        latlngArray.push([features[i].geometry.coordinates[0],features[i].geometry.coordinates[1]])
        

        
    }
    console.log(radiusArray);
    console.log(depthArray);
    console.log(latlngArray);
    
    //For different colors of markers:
    for (let j=0;j<depthArray.length;j++) {
        let depth = depthArray[j];
        if (depthArray[j]<20) {
            return '#ffffcc';
        }
        else if (depthArray[j]<50) {
            return '#c7e9b4';
        }
        else if (depthArray[j]<100) {
            return '#7fcdbb';
        }
        else if (depthArray[j]<200) {
            return '#41b6c4';
        }
        else if (depthArray[j]<300) {
            return '#2c7fb8';
        }
        else {
            return '#253494';
        }
    }

    L.geoJson(data, {pointToLayer: function(feature,latlng){
        return new L.circleMarker(latlng, markerStyle);
    }}).bindPopup(`<h1></h1> <hr><h3></h3>`).addTo(myMap);

});


//Set up the legend
//let legend = L.control({position: "bottomright"});
//legend.addTo(myMap);

// Create a baseMaps object
//let baseMaps = {
    //Street:
    //Topography:
//};



// Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
//L.control.layers().addTo(myMap);