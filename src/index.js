import { renderGeoMap, colorGeoMap } from './geomap';
// import { renderScatterPlot, colorScatterPlot } from './scatter_plot';
// import { renderBarChart } from './bar_chart';
import { toggleGeoMap } from './toggle_geomap';
import { toggleBarChart } from './toggle_bar_chart';
import { scoreGuesses, closeModal } from './modal.js';

document.addEventListener("DOMContentLoaded", () => {

    // Add event listeners for welcome page: 
    // When user clicks "Explore geographic trends" or "Test your data interpretation chops", 
    // It will render a default view
    const chooseGeoBtn = document.getElementById("choose-geo");
    // debugger
    chooseGeoBtn.addEventListener("click", () => {
        // debugger
        toggleGeoMap("tabasco", "sriracha");
        // debugger
        switchPage("explore-page")();   // need to invoke this callback b/c it was defined to return a function
    });


    // Add event listeners to nav components (switch to appropriate page)
    const aboutBtn = document.getElementById("about");
    aboutBtn.addEventListener("click", switchPage("welcome-page"));

    const exploreBtn = document.getElementById("explore");
    exploreBtn.addEventListener("click", switchPage("explore-page"));

    const guessBtn = document.getElementById("guess");
    guessBtn.addEventListener("click", switchPage("guess-page"));

    function switchPage(idName) {   // needs to be a named fct to get hoisted
        return () => {
            // debugger
            const pages = document.getElementsByClassName("page");
            Array.from(pages).forEach(page => { // pages is an HTMLCollection, not a true array
                if (page.id === idName) {
                    page.className = `${idName} page`;    // remove "hidden" from class name to reveal the page and its contents
                } else {
                    if (!page.className.includes("hidden")) {
                        page.className += " hidden" // hide all other pages
                    }
                }
            });
        };
    };

    // Add event listener for guessing game submit "button"
    const guessSubmit = document.getElementById("guess-submit");
    guessSubmit.addEventListener("click", scoreGuesses);

    // Add event listener to close modal
    const closeModalBtn = document.getElementById("close-modal-btn");
    closeModalBtn.addEventListener("click", closeModal);



    // These two functions display either the "Explore geo trends page" (map & scatter plot) or the guessing game (bar charts)
    // Right now they each only accomodate one set of comparisons (tabasco vs sriracha; beef vs chicken vs turkey)...
    // ...ultimately I want to call these functions when a user selects a different trend (food comparison) from a dropdown menu...
    // ...I'll invoke these with variables in the event listener callbacks
   
    let geoDataset = "assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv";
    renderGeoMap(geoDataset);

    // toggleGeoMap("tabasco", "sriracha");
    toggleGeoMap("bloodyMary", "moscowMule");
    
    toggleBarChart();   // for later: pass in the specific food items like I did with toggleGeoMap
    // debugger
    // maybe set up object with arrays to keep foods in the correct order, then spread them when passing into toggleGeoMap



    // NOTES & QUESTIONS:
    // Why is there a blip when the welcome page first loads and the fonts appear different?
    // Is it because of the time it takes for the map to load behind the scenes?
    // Maybe only render the map in a setTimeout callback (after 1ms)??? Would that give the fonts time to load first?
    
});


// // OTHER DATASETS TO INCORPORATE:
// let seasonalDatasetSpinach = "assets/data/seasonal/spinach.csv";
// let seasonalDatasetKale = "assets/data/seasonal/kale.csv";
// let seasonalDatasetChocolate = "assets/data/seasonal/chocolate.csv";
// let seasonalDatasetVanilla = "assets/data/seasonal/vanilla.csv";
// let seasonalDatasetVegetarian = "assets/data/seasonal/vegetarian.csv";
// let seasonalDatasetVegan = "assets/data/seasonal/vegan.csv";
// renderBarChart(seasonalDatasetSpinach, "spinach");
// renderBarChart(seasonalDatasetKale, "kale");
// renderBarChart(seasonalDatasetChocolate, "chocolate");
// renderBarChart(seasonalDatasetVanilla, "vanilla");
// renderBarChart(seasonalDatasetVegetarian, "vegetarian");
// renderBarChart(seasonalDatasetVegan, "vegan");


// // Something to think about later: do I need to clean up event listeners & timers?
// // Check for closures, memory leak sources?