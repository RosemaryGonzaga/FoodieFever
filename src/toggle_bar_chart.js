import { renderBarChart } from './bar_chart';

// For later: need to rig this to take in the foods and render the appropriate data & titles / labels
// Like what I did for toggleGeoMap
// export const toggleBarChart = (food1, food2[, food3]) => {
export const toggleBarChart = () => {
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
}