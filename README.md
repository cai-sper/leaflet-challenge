# Earthquake Data Visualization

## Overview

This project showcases an interactive web visualization of earthquake data collected by the United States Geological Survey (USGS). It leverages Leaflet, JavaScript, and CSS to create an informative and visually appealing representation of earthquake occurrences, allowing users to explore seismic activity worldwide.

## Getting Started

To explore the interactive earthquake map, visit the deployed GitHub Pages site:

[Earthquake Data Visualization](https://cai-sper.github.io/leaflet-challenge/)

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Visualization](#visualization)
  - [Marker Size and Colour](#marker-size-and-colour)
  - [Pop-up Information](#pop-up-information)

## Visualization

### Marker Size and Colour

Markers on the map represent earthquake events. The size of each marker corresponds to the magnitude of the earthquake, making it easy to distinguish between stronger and weaker tremors. This sizing is achieved through CSS classes in the [style.css](/Leaflet/static/css/style.css) file, providing a visual legend for reference.

Additionally, the colour of the markers indicates the depth of each earthquake. The colour scheme is defined in the same CSS code, allowing users to understand the depth range of each event. For specific details on marker size and colour, refer to the CSS code in [style.css](/Leaflet/static/css/style.css).

### Pop-up Information

Click on any marker to view detailed information about the earthquake, including:

- Location
- Date and time
- Magnitude
- Depth
