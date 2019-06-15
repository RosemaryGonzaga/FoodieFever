import { renderGeoMap, colorGeoMap } from './geomap';
import { renderScatterPlot, colorScatterPlot } from './scatter_plot';
import { renderBarChart } from './bar_chart';

document.addEventListener("DOMContentLoaded", () => {

    // Years for time slider
    const year = [
        "2006", "2007", "2008", 
        "2009", "2010", "2011", 
        "2012", "2013", "2014", 
        "2015", "2016", "2017", 
        "2018", "2019"
    ];

    // This dataset should dynamically change based on the comparison selected
    // (Will prob have a menu allowing users to select food comparison)
    // Refactor later to assign dataset based on the input value
    // ...may need a dictionary or to rename data files to faciliate interpolation
    let geoDataset = "assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv";

    d3.select("#timeslide").on("input", function() {
        document.getElementById("range").innerHTML = year[this.value];
        colorGeoMap(geoDataset, `${year[this.value]}`);
        colorScatterPlot(`${year[this.value]}`);
    });

    renderGeoMap(geoDataset);
    
    let temporalDataset = "assets/data/sriracha/sriracha_tabasco_timeline_2004_to_present.csv";
    renderScatterPlot(temporalDataset);

    let seasonalDataset = "assets/data/seasonal/chocolate.csv";
    renderBarChart(seasonalDataset);
});

// Something to think about later: do I need to clean up event listeners & timers?
// Check for closures, memory leak sources?