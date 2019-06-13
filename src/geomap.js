const geoColor = d3.scaleThreshold()
    .domain([0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0])
    .range(["lightgray", "#009392", "#39B185", "#9CCB86", "#E9E29C", "#EEB479", "#E88471", "#CF597E"]); // color scheme 1 (green-red)
    // .range(["lightgray", "#228B3B", "#6CBA7D", "#CDE5D2", "#FCE1A4", "#FABF7B", "#E05C5C", "#AB1866"]); // color scheme 2 (green-magenta)
    // .range(["lightgray", "#3C93C2", "#6CB0D6", "#9EC9E2", "#E1F2E3", "#FEB24C", "#FD8D3C", "#FC4E2A"]); // color scheme 3 (blue-orange)


export const renderGeoMap = (year = "2006") => { // later, this should take in a dataset too
    const width = 720;
    const height = 500;

    const projection = d3.geoAlbersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);

    let svg = d3.select(".geomap-container").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("assets/data/cb_2018_us_state_5m.json").then(us => {

        // Note: I should prob refactor the below line later to interpolate the food comparison into the filepath
        d3.csv("assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv").then(data => {

            const filteredData = data.filter(datum => datum.year === year); // refactored to match a variable year, which should come in as a string
            let searchFreqByState = {};
            filteredData.forEach(datum => {
                if (datum.sriracha === "0" && datum.tabasco === "0") {
                    searchFreqByState[datum.Region] = -0.2;
                } else {
                    searchFreqByState[datum.Region] = parseFloat(datum.sriracha);
                }
            });

            svg.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.cb_2018_us_state_5m).features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", d => {
                    let searchFreq = searchFreqByState[d.properties.NAME];
                    return geoColor(searchFreq);
                });

        });
    });
}

// export const updateGeoMap = (year) => {

// };









    // TUTORIAL CODE
    // Global variables to store slider state and "dictionary" (or reference values for input)
    // var inputValue = null;
    // var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // // Dimensions of visualization (svg)
    // let width = 700;
    // let height = 580;

    // // Create SVG canvas (add svg to DOM)
    // let svg = d3.select('body')
    //     .append('svg')
    //     .attr('width', width)
    //     .attr('height', height);

    // // MAP *****************************************************************

    // // RODENT DATA *****************************************************************
    // let rodents = svg.append('g')
    // rodents.selectAll('path')
    //     .data(rodents_json.features)    // how does d3's .features method know to extract the coordinates?
    //     .enter()
    //     .append('path')
    //     .attr('fill', initialDate)
    //     .attr('stroke', '#999')
    //     .attr('d', geoPath)    // position the dots based on the geoPath function?
    //     .attr('class', 'incident') // add class to each data point (dot) so it can be styled with css (defined in head)
    //     // .on('mouseover', d => {      // NOTE: using a fat arrow function yields this error: this.setAttribute is not a function (b/c it binds this?)
    //     //     d3.select('h2').text(d.properties.LOCATION_STREET_NAME);
    //     //     d3.select(this).attr('class', 'incident hover');
    //     // })
    //     // .on('mouseout', d => {
    //     //     d3.select('h2').text('');
    //     //     d3.select(this).attr('class', 'incident');
    //     // });
    //     // EVENT LISTENERS FOR INTERACTIVITY (HOVER)
    //     .on('mouseover', function (d) {
    //         d3.select('h2').text(d.properties.LOCATION_STREET_NAME);
    //         d3.select(this).attr('class', 'incident hover');
    //     })
    //     .on('mouseout', function (d) {
    //         d3.select('h2').text('');
    //         d3.select(this).attr('class', 'incident');
    //     });


    // // EVENT LISTNERS FOR INTERACTIVITY (TIME SLIDER) ******************************************
    // // Each event listener takes in a callback that's subsequently defined below

    // // When input range changes, update value
    // d3.select('#timeslide').on('input', function () {     // TEST: will a big arrow function break this? YES (value is undefined)
    //     update(+this.value);    // what is the '+' for??? code seems to function well without it...
    // });

    // // Update the fill of each SVG element of class "incident" with value
    // function update(value) {    // TEST: will a big arrow function break this? maybe b/c of hoisting and/or context binding?
    //     document.getElementById('range').innerHTML = month[value];   // set the month by indexing into month array at an index of the range's value
    //     inputValue = month[value];  // update global var
    //     d3.selectAll('.incident')
    //         .attr('fill', dateMatch);   // yet to define dateMatch, a fct that will check the inputValue for a match w/ data and return a color if there's a match
    // }

    // // Function to return a color for data point (based on color match status)
    // function dateMatch(data, value) {   // why do we need to take in a value parameter if it never gets used? Code works ok without it
    //     let d = new Date(data.properties.OPEN_DT);  // create a JS Date object using the data
    //     let m = month[d.getMonth()];    // get month using Date method
    //     if (inputValue === m) {     // check for match against input value
    //         this.parentElement.appendChild(this);   // help with layering??? (so it draws last and is on top?)
    //         return 'red';
    //     } else {
    //         return '#999';
    //     };
    // }

    // // Set the initial state (when map loads, initial state is set to January)
    // function initialDate(data, i) {
    //     let d = new Date(data.properties.OPEN_DT);
    //     let m = month[d.getMonth()];
    //     if (m === "January") {
    //         this.parentElement.appendChild(this);
    //         return 'red';
    //     } else {
    //         return '#999';
    //     };
    // }