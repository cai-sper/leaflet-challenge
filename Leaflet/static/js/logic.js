
// Link to the GeoJSON data
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Get our GeoJSON data using d3
d3.json(link).then(function (data) {

    // Once we get a response, send the data.features object to the createFeatures function. 
    createFeatures(data);
  });

// Function to determine marker size by magnitude
function markerSize(magnitude) {
  return magnitude * 15000;
};

// Function to determine marker color by depth
function markerColor(depth) {
  if (depth < 10) return "#FB8CAB";
  else if (depth < 30) return "#E65C9C";
  else if (depth < 50) return "#CF268A";
  else if (depth < 70) return "#AF1281";
  else if (depth < 90) return "#6B0772";
  else return "#360167";
}

function createFeatures(earthquakeData) {

  // Create a GeoJSON layer with the earthquake data and customize each feature
  let earthquakes = L.geoJSON(earthquakeData, {

    // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "<h3>Location: " + feature.properties.place + "</h3>" +
        "<h3>Date: " + new Date(feature.properties.time).toLocaleString() + "</h3>" +
        "<h3>Magnitude: " + feature.properties.mag + "</h3>" +
        "<h3>Depth: " + feature.geometry.coordinates[2] + "</h3>",
      );
    },

    // Point to the layer used to alter markers
    pointToLayer: function(feature, latlng) {
      
      // Apply marker size and color functions and define other features of the markers
      let markers = {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.5,
        color: 'black',
        weight: 0.5
      }
      return L.circle(latlng, markers);
    }
  });

  // Send our earthquakes layer to the createMap function
  createMap(earthquakes);
} 

function createMap(earthquakes) {

  // Create the tile layers

  let satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

  // Create a baseMaps object
  let baseMaps = {
    "Street": street,
    "Satellite": satellite
  };    
     
  // Create an overlay object to hold our overlay
  let overlayMaps = {
      Earthquakes: earthquakes
  };

    // Create our map, giving it the outdoors and earthquakes layers to display on load
  let map = L.map("map", {
    center: [39.73, -101.4],
    zoom: 4,
    layers: [street, earthquakes] // DEFAULT STATE 
  });

  // Create a layer control, and pass it our baseMaps and overlayMaps, then add it to the map
  L.control.layers(baseMaps, overlayMaps, {
      collapsed: true  
  }).addTo(map);

  //legend - from https://leafletjs.com/examples/choropleth/
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'), // create a div with a class "info"
      grades = [-10, 10, 30, 50, 70, 90];

      //This will give a title to the
      div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"

    // loop through our depth intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };

  // Adding the legend to the map
  legend.addTo(map);
};