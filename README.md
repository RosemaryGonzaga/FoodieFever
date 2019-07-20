# Foodie Fever
### A visualization of select food trends from the past decade

[Live site](http://www.rosemarygonzaga.com/FoodieFever/#)

![FoodieFever](https://github.com/RosemaryGonzaga/FoodieFever/tree/master/assets/images/foodie_fever.png)

## Background and Overview
Google Trends provides a wealth of data ripe for analysis. This project aims to leverage that data to chart the course of various food trends of the past decade or so, as gauged by internet search volume.

## Functionality and MVP Features
Users are able to:
- Visualize long-term geographic trends
    - View a chorepleth (geographic heat map) of regional differences (by state in the U.S.) in relative search volume for select food comparsions.
    - View a scatter plot overlaying the timecourses of search popularity for each food item in the comparison. The percentages in this graph are normalized to the highest search volume across all years represented in the timecourse.
    - Interact with a slider element to view different temporal snapshots of the each food's popularity by state. This allows users to visualize the propagation of interest across geographic regions over the course of the food's rise and fall in popularity.
    <!-- - Select from a menu of different food comparisons to view a variety of trends. -->
- Experiment with seasonal trends through a built-in mini-game
    - View bar charts that depict seasonal fluctuations in search volume. The static view charts month-to-month changes for a given year.
    - Press play to animate the bar charts, introducing another dimension (year-over-year changes) to the visualization.
    - Test their data interpretation skills with a drag-and-drop mini game.

Future enhancements:
- Add hover effects so users can see state-specific data as they explore the choropleth.
- Store additional food comparisons locally.
- Add feature allowing users to type in any food trends they'd like to explore. This send a request to the Google Trends API.
<!-- - Add a pie chart, sunburst, or treemap visualization showing the breakdown of related searches for a particular food item (e.g., bacon ice cream, bacon donuts, bacon vodka...)
- Add data captions to highlight interesting patterns, stories, or tidbits
- Add more food / drink items to the analysis (moscow mule, kombucha, froyo, poke bowls...) -->

## Architecture and Technologies
* Vanilla JavaScript to manipulate data and toggle between different views
* D3.js for data-to-DOM binding and data-based DOM manipulation
* HTML, CSS, SVG for markup and styling of data visuals
* Webpack to bundle files

## Data & APIs
Data are exported as CSV files and stored locally from Google Trends, with a focus on internet searches within the United States: https://trends.google.com/trends/?geo=US

<!-- I'll slice the data by region (state) and timeframe. Temporal resolution may vary based on the steepness of each food item's rise and / or fall in popularity. -->


## Feature Spotlight: Interactive and dynamic choropleth (geographic heat map)

![Interactive Choropleth](https://github.com/RosemaryGonzaga/FoodieFever/tree/master/assets/images/geo_trends.gif)

My first challenge in implementing this feature arose when I initially tested the time slider element, and found that the data would take too long to re-render every time the time slider's input changed. This issue noticeably affected user experience, as the page would go blank for a few seconds while re-rendering the map.

After realizing that the issue stemmed from trying to accomplish too much in my render function, I refactored the code in keeping with the 'Separation of Concerns' principle. Now, separate functions handle rendering geographic boundary data (the map itself) and rendering search volume data (the state-specific color-coding).

```
// Only render the geographic boundary data once
// (The data are static and are costly to render.)
export const renderGeoMap = dataset => {
    const width = 680;
    const height = 420;

    const projection = d3.geoAlbersUsa()
        .scale(900)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);

    let svg = d3.select(".geomap-container").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("assets/data/cb_2018_us_state_5m.json").then(us => {
        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.cb_2018_us_state_5m).features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "states")
            .style("fill", "lightgray");
        colorGeoMap(dataset);
    });
}
```

```
// In contrast to geographic boundary data, the color data 
// will change dynamically (controlled by the time slider),
// so this function will be invoked multiple times.
export const colorGeoMap = (dataset, year = "2006") => {

    d3.csv(dataset).then(data => {
        const filteredData = data.filter(datum => datum.year === year);
        let [_, food1, food2, __] = data.columns;
        let searchFreqByState = {};
        filteredData.forEach(datum => {
            if (datum[food1] === "0" && datum[food2] === "0") {
                searchFreqByState[datum.Region] = -0.2;
            } else {
                searchFreqByState[datum.Region] = parseFloat(datum[food2]);
            }
        });

        d3.selectAll(".states")
            .style("fill", d => {
                let searchFreq = searchFreqByState[d.properties.NAME];
                return geoColor(searchFreq);
            });
    });
}
```

```
// Install an event listener on the timeslider.
// The event listener invokes functions that update the
// colors in the choropleth (U.S. map) and scatter plot.

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
    colorScatterPlot(`${year[this.value]}`, food1, food2);
});
```

## Feature Spotlight: Drag-and-drop guessing game

![Interactive Choropleth](https://github.com/RosemaryGonzaga/FoodieFever/tree/master/assets/images/geo_trends.gif)

I wanted users to take a more active role in thinking about what different data patterns mean, and what stories they might tell. To that end, I used HTML5's drag-and-drop API to incorporate some gamification into my visualization.

```
<script>
    function dragStartHandler(e) {
        e.dataTransfer.setData("text/plain", e.target.innerHTML);
        e.dataTransfer.dropEffect = "move";
    }

    function dragoverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }

    function dropHandler(e) {
        e.preventDefault();
        let data = e.dataTransfer.getData("text/plain");
        e.target.innerHTML = data;
    }
</script>
```

```
<div class="drag-and-drop">
    <div class="drop-elements">
        <div class="drop-boxes" ondrop="dropHandler(event);" ondragover="dragoverHandler(event);" id="beef">?</div>
        <div class="drop-boxes" ondrop="dropHandler(event);" ondragover="dragoverHandler(event);" id="chicken">?</div>
        <div class="drop-boxes" ondrop="dropHandler(event);" ondragover="dragoverHandler(event);" id="turkey">?</div>
    </div>
    <div class="drag-elements">
        <div class="drag-boxes" draggable="true" ondragstart=dragStartHandler(event);>turkey</div>
        <div class="drag-boxes" draggable="true" ondragstart=dragStartHandler(event);>chicken</div>
        <div class="drag-boxes" draggable="true" ondragstart=dragStartHandler(event);>beef</div>
    </div>
</div>
```


## Feature Spotlight: Animated bar charts

![D3 animations](https://github.com/RosemaryGonzaga/FoodieFever/tree/master/assets/images/bar_chart_animation.gif)

The bar charts that form part of the guessing game provide a static representation various foods' seasonality (as measured by monthly relative search volume). In order to make the visualization more dynamic and incorporate another dimension into the temporal analysis, I used D3 animations to make year-by-year updates to the data in each bar graph.

<!-- ```
let beefCallback;  // declare callback to be invoked in event listener
const setBeefCB = fct => { beefCallback = fct };  // higher-order function closes over the callback
renderBarChart(seasonalDatasetBeef, "beef", "#482677", setBeefCB);  // pass higher-order function into the render function

let chickenCallback;
const setChickenCB = fct => { chickenCallback = fct };
renderBarChart(seasonalDatasetChicken, "chicken", "#1f968b", setChickenCB);

let turkeyCallback;
const setTurkeyCB = fct => { turkeyCallback = fct };
renderBarChart(seasonalDatasetTurkey, "turkey", "#dbe318", setTurkeyCB);


// Recursive callback that updates the year displayed in the animation
const updateYear = year => {
    return () => {
        if (year >= 2019) return;
        let barChartYear = document.getElementById("bar-chart-year");
        barChartYear.textContent = year;
        let delay = 700;
        setTimeout(updateYear(year + 1), delay);
    }
}
```

```
// Use D3 to install event listener on the "play" button, to start the animation.
// The event listener synchronizes animation of three bar charts (each existing in its
// own lexical context) and the rendering of the corresponding year.
d3.select("#play-bar-chart-animation-btn").on("click", () => {
    // Disable the play button, but re-enable it after animation finishes
    let playBtn = document.getElementById("play-bar-chart-animation-btn");
    playBtn.setAttribute("disabled", "true");
    setTimeout(() => playBtn.removeAttribute("disabled"), 8735);

    // Animate the year
    setTimeout(updateYear(2006), 325);

    // Animate the separate bar charts
    beefCallback();
    chickenCallback();
    turkeyCallback();
});
``` -->

<!-- ## Feature Spotlight: Simulating multiple pages with a single-page

In order to simulate the perception of navigability and multiple pages without React.js, I leaned on basic JavaScript and CSS.

```
// Add event listeners to nav components (switch to appropriate page)
const aboutBtn = document.getElementById("about");
aboutBtn.addEventListener("click", switchPage("welcome-page"));

const exploreBtn = document.getElementById("explore");
exploreBtn.addEventListener("click", switchPage("explore-page"));

const guessBtn = document.getElementById("guess");
guessBtn.addEventListener("click", switchPage("guess-page"));


// Define event listener (needs to be a named function to get hoisted)
function switchPage(idName) {
    return () => {
        const pages = document.getElementsByClassName("page");
        Array.from(pages).forEach(page => { // pages is an HTMLCollection, not a true array
            if (page.id === idName) {
                page.className = `${idName} page`;    // reveal the page and its contents
            } else {
                if (!page.className.includes("hidden")) {
                    page.className += " hidden" // hide all other pages
                }
            }
        });
    };
};
```

--- -->

<!-- ### Implementation Timeline
Monday
- [ ] Basic D3 tutorials
- [ ] View visualization samples and select a graph type(s)
- [ ] Select a topic and data source(s)
- [ ] Complete proposal

Tuesday
- [ ] D3 tutorials: choropleths
- [ ] Download data for local storage
- [ ] Format data (CSV, JSON)

Wednesday
- [ ] Get familiar with D3 documentation
- [ ] Learn to read data in D3
- [ ] Start manipulating data: create line chart overlay

Thursday
- [ ] Create one choropleth, anchored by a single food item and a single timeframe
- [ ] Create temporal snapshot choropleths for the same food item 
- [ ] Create a slidebar to allow users to interact with the choropleths (to filter by timeframe)

Friday
- [ ] Build out static choropleths for the remaining select food items
- [ ] Create menu allowing user to filter by food item and visualization type
- [ ] Style visualizations with CSS

Saturday
- [ ] Continue styling
- [ ] Deploy site to live URL
- [ ] Work on enhancements / bonuses: temporal snapshot choropleths for other select food items

Sunday
- [ ] Enhancement / bonus: play button for time lapse effect
- [ ] Enhancement / bonus: pie chart, sunburst, or treemap to visualize related searches for a single food item
- [ ] Style enhancements
- [ ] Deploy enhancements -->