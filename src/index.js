// import { renderGeoMap, colorGeoMap } from './geomap';
// import { renderScatterPlot, colorScatterPlot } from './scatter_plot';
import { renderBarChart } from './bar_chart';
import { toggleGeoMap } from './toggle_geomap';
import { scoreGuesses, closeModal } from './modal.js';

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
                    // page.className = "page";    // remove "hidden" from class name to reveal the page and its contents
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




    // NOTE TO SELF: This file is getting long... maybe factor out event listeners and then import them?
    // Also, why is there a blip when the page first loads and the fonts appear different?
    // Is it because of the time it takes for the map to load behind the scenes?
    // Maybe only render the map in a setTimeout callback (after 1ms)???


    // maybe set up object with arrays to keep foods in the correct order, then spread them when passing into toggleGeoMap
    toggleGeoMap("tabasco", "sriracha"); 



    // Data and event listeners for bar graphs (need to add more food comparisons)
    let seasonalDatasetBeef = "assets/data/seasonal/beef.csv";
    let seasonalDatasetChicken = "assets/data/seasonal/chicken.csv";
    let seasonalDatasetTurkey = "assets/data/seasonal/turkey.csv";
    
    // NOTE: setBeefCB closes over beefCallback
    // It's then passed into the renderBarChart function
    // That function invokes setBeefCB, assigning beefCallback to a function...
    // ...that will animate the beef bar chart specifically
    // The same setup applies for the other foods shown...
    // That way, the event listener below can invoke all three animation functions...
    // ...at the same time
    let beefCallback;
    const setBeefCB = fct => {
        // debugger
        beefCallback = fct;
        // debugger
    }
    renderBarChart(seasonalDatasetBeef, "beef", "#482677", setBeefCB);          // fill-color: purple
    
    let chickenCallback;
    const setChickenCB = fct => { chickenCallback = fct; }
    renderBarChart(seasonalDatasetChicken, "chicken", "#1f968b", setChickenCB); // fill-color: teal
    
    let turkeyCallback;
    const setTurkeyCB = fct => { turkeyCallback = fct; }
    renderBarChart(seasonalDatasetTurkey, "turkey", "#dbe318", setTurkeyCB);    // fill-color: yellow
    
    // Recursive callback to update year in setTimeout
    // This seems like a brittle solution; is there a better way?
    // NOTE: the timing still isn't quite in sync with the bar animation...
    const updateYear = year => {
        return () => {
            // debugger
            if (year >= 2019) return;
            let barChartYear = document.getElementById("bar-chart-year");
            barChartYear.textContent = year;
            // debugger
            let delay = 700;
            setTimeout(updateYear(year + 1), delay);
        }
    }

    // debugger
    d3.select("#play-bar-chart-animation-btn").on("click", () => {
        let playBtn = document.getElementById("play-bar-chart-animation-btn");
        playBtn.setAttribute("disabled", "true");
        setTimeout(() => playBtn.removeAttribute("disabled"), 8735);    // hard-coded the delay - how to make it more dynamic?
        setTimeout(updateYear(2006), 325);  // the delay here is also hard-coded and may depend on external factors...
        beefCallback();
        chickenCallback();
        turkeyCallback();
    });
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