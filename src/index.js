import { renderGeoMap } from './geomap';

document.addEventListener("DOMContentLoaded", () => {

    // global vars for storing input values of slider
    var inputValue = null;
    var year = [
        "2006", "2007", "2008", 
        "2009", "2010", "2011", 
        "2012", "2013", "2014", 
        "2015", "2016", "2017", 
        "2018", "2019"
    ];

    d3.select("#timeslide").on("input", function() {
        document.getElementById("range").innerHTML = year[this.value];
        // d3.select("svg").remove();  // this takes too long to re-render
        renderGeoMap(`${year[this.value]}`);
    });
    renderGeoMap(`2006`);
});