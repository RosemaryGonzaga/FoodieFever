import { renderGeoMap, colorGeoMap } from './geomap';
import { renderScatterPlot, colorScatterPlot, removeScatterPlot } from './scatter_plot';

export const toggleGeoMap = (food1, food2) => {

    // Update page title and labels with the relevant foods
    // NEXT STEPS: NOW I NEED TO BE ABLE TO HANDLE 2-WORD "FOODS" (like "bloody mary" and "moscow mule")
    const food1Upcase = food1.slice(0, 1).toUpperCase() + food1.slice(1,food1.length);
    const food2Upcase = food2.slice(0, 1).toUpperCase() + food2.slice(1,food2.length);
    const title = document.getElementById("explore-title");
    title.textContent = `${food1Upcase} vs. ${food2Upcase}`;
    document.getElementById("color-scale-label1").textContent = food1;
    document.getElementById("color-scale-label2").textContent = food2;
    document.getElementById("slider-note-label").textContent = `${food1} and ${food2}`;


    // Dataset dictionary
    const datasets = {
        geo: {
            sriracha: "assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv",
            moscowMule: "assets/data/moscow_mule/moscowmule_vs_bloodymary_geo_trended.csv",
        },
        temporal: {
            sriracha: "assets/data/sriracha/sriracha_tabasco_timeline_2006_to_present.csv",
            moscowMule: "assets/data/moscow_mule/moscowmule_bloodymary_timeline_2006_to_present.csv",
        },
    };

    // This dataset should dynamically change based on the comparison selected
    // (Will prob have a menu allowing users to select food comparison)
    // Refactor later to assign dataset based on the input value
    // ...may need a dictionary or to rename data files to faciliate interpolation
    // let geoDataset = "assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv";
    let geoDataset = datasets.geo[food2];
    // renderGeoMap(geoDataset);
    colorGeoMap(geoDataset, "2006");

    // Remove any scatter plot that was rendered before
    removeScatterPlot();

    // let temporalDataset = "assets/data/sriracha/sriracha_tabasco_timeline_2006_to_present.csv";
    let temporalDataset = datasets.temporal[food2];
    renderScatterPlot(temporalDataset);


    // Years for time slider
    const year = [
        "2006", "2007", "2008",
        "2009", "2010", "2011",
        "2012", "2013", "2014",
        "2015", "2016", "2017",
        "2018", "2019"
    ];

    d3.select("#timeslide").on("input", function () {
        document.getElementById("range").innerHTML = year[this.value];
        colorGeoMap(geoDataset, `${year[this.value]}`);
        // colorScatterPlot(`${year[this.value]}`);
        // colorScatterPlot(`${year[this.value]}`, "tabasco", "sriracha"); // tabasco and sriracha are hard-coded for now
        colorScatterPlot(`${year[this.value]}`, food1, food2); // replace tabasco and sriracha with vars
    });
}