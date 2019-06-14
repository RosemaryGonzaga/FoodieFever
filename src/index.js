import { renderGeoMap, colorGeoMap } from './geomap';

document.addEventListener("DOMContentLoaded", () => {

    // Years for time slider
    const year = [
        "2006", "2007", "2008", 
        "2009", "2010", "2011", 
        "2012", "2013", "2014", 
        "2015", "2016", "2017", 
        "2018", "2019"
    ];

    d3.select("#timeslide").on("input", function() {
        document.getElementById("range").innerHTML = year[this.value];
        colorGeoMap(`${year[this.value]}`);
    });

    renderGeoMap();
    
    // Something to think about later: do I need to clean up event listeners & timers?
    // Check for closures, memory leak sources?
});