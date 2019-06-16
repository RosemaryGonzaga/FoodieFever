import { renderGeoMap, colorGeoMap } from './geomap';
import { renderScatterPlot, colorScatterPlot } from './scatter_plot';
import { renderBarChart } from './bar_chart';

document.addEventListener("DOMContentLoaded", () => {

    // Add event listeners to nav components (switch to appropriate page)
    const aboutBtn = document.getElementById("about");
    aboutBtn.addEventListener("click", switchPage("welcome-page"));

    const exploreBtn = document.getElementById("explore");
    exploreBtn.addEventListener("click", switchPage("explore-page"));

    const guessBtn = document.getElementById("guess");
    guessBtn.addEventListener("click", switchPage("guess-page"));

    function switchPage(idName) {   // needs to be a named fct to get hoisted
        return () => {
            const pages = document.getElementsByClassName("page");
            Array.from(pages).forEach(page => { // pages is an HTMLCollection, not a true array
                if (page.id === idName) {       
                    page.className = "page";    // remove "hidden" from class name to reveal the page and its contents
                } else {
                    if (!page.className.includes("hidden")) {
                        page.className += " hidden" // hide all other pages
                    }
                }
            });
        };
    };

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
        colorScatterPlot(`${year[this.value]}`);
    });


    // This dataset should dynamically change based on the comparison selected
    // (Will prob have a menu allowing users to select food comparison)
    // Refactor later to assign dataset based on the input value
    // ...may need a dictionary or to rename data files to faciliate interpolation
    let geoDataset = "assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv";
    renderGeoMap(geoDataset);
    
    let temporalDataset = "assets/data/sriracha/sriracha_tabasco_timeline_2004_to_present.csv";
    renderScatterPlot(temporalDataset);


    let seasonalDatasetSpinach = "assets/data/seasonal/spinach.csv";
    let seasonalDatasetKale = "assets/data/seasonal/kale.csv";
    let seasonalDatasetQuinoa = "assets/data/seasonal/quinoa.csv";
    let seasonalDatasetChocolate = "assets/data/seasonal/chocolate.csv";
    let seasonalDatasetVanilla = "assets/data/seasonal/vanilla.csv";
    let seasonalDatasetBeef = "assets/data/seasonal/beef.csv";
    let seasonalDatasetChicken = "assets/data/seasonal/chicken.csv";
    let seasonalDatasetTurkey = "assets/data/seasonal/turkey.csv";
    let seasonalDatasetVegetarian = "assets/data/seasonal/vegetarian.csv";
    let seasonalDatasetVegan = "assets/data/seasonal/vegan.csv";

    // renderBarChart(seasonalDatasetSpinach, "spinach");
    // renderBarChart(seasonalDatasetKale, "kale");
    // renderBarChart(seasonalDatasetQuinoa, "quinoa");
    // renderBarChart(seasonalDatasetChocolate, "chocolate");
    // renderBarChart(seasonalDatasetVanilla, "vanilla");
    renderBarChart(seasonalDatasetBeef, "beef");
    renderBarChart(seasonalDatasetChicken, "chicken");
    renderBarChart(seasonalDatasetTurkey, "turkey");
    // renderBarChart(seasonalDatasetVegetarian, "vegetarian");
    // renderBarChart(seasonalDatasetVegan, "vegan");
});

// Something to think about later: do I need to clean up event listeners & timers?
// Check for closures, memory leak sources?