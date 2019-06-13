document.addEventListener("DOMContentLoaded", () => {
    // alert('hello!!!');
    // console.log('this should print in the console!')
    // debugger

    const width = 720,
        height = 500;

    const projection = d3.geoAlbersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);

    let svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    let color = d3.scaleThreshold()
        .domain([0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0])
        .range(["lightgray", "#009392", "#39B185", "#9CCB86", "#E9E29C", "#EEB479", "#E88471", "#CF597E"]);
        // .domain([0.02, 0.04, 0.06, 0.08, 0.10])
        // .range(["#F0F0F0", "#b2d8d8", "#66b2b2", "#008080", "#006666", "#004c4c"]);

    d3.json("assets/data/cb_2018_us_state_5m.json").then(us => {

        // Note: I should prob refactor the below line later to interpolate the food comparison into the filepath
        // d3.csv("assets/data/sriracha_tabasco_timeline_2004_to_present.csv").then(hotsauceTimelineData => {
        // d3.csv("assets/data/sriracha/sriracha_tabasco_geomap_2006.csv").then(hotsauceGeoData2006 => {
        d3.csv("assets/data/sriracha/sriracha_vs_tabasco_geo_trended.csv").then(data => {
            // console.log(us);
            // console.log(us.objects.cb_2018_us_state_5m);
            // console.log(topojson.feature(us, us.objects.cb_2018_us_state_5m));
            // console.log(data);
            // console.log(data[0]);
            // console.log(data[data.length - 1]);
            // console.log(getSrirachaSearchFreqByState(data, "2013"));
            // console.log(data);
            // console.log(filteredData);
            // console.log(srirachaSearchFreqByState);

            const filteredData = data.filter(datum => datum.year === "2006"); // the year is hardcoded right now --> need to use a year variable that will get passed in from outside
            let srirachaSearchFreqByState = {};
            filteredData.forEach(datum => {
                if (datum.sriracha === "0" && datum.tabasco === "0") {
                    srirachaSearchFreqByState[datum.Region] = -0.2; // or should it be 0.5?
                } else {
                    srirachaSearchFreqByState[datum.Region] = parseFloat(datum.sriracha);
                }
            });

            svg.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.cb_2018_us_state_5m).features)
                .enter()
                .append("path")
                .attr("d", path)
                // .style("fill", "#1a6b1a");  // ultimately, we want to fill the color dynamically
                .style("fill", d => {
                    let searchFreq = srirachaSearchFreqByState[d.properties.NAME];
                    // console.log(d);
                    // console.log(d.properties.NAME);
                    return color(searchFreq);
                    // return "purple";
                });

        });
    });


    // IMPORTANT NOTE: RIGHT NOW, THIS IS CODE I WROTE FOR A TUTORIAL, AS PROOF OF CONCEPT
    // NOT MY OWN PROJECT CODE (but I didn't just copy / paste)
    // Tutorial source: http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/

    // TUTORIAL CODE
    // d3.json("assets/data/us.json").then(us => {
    //     d3.tsv("assets/data/us_unemployment_2008.tsv").then(unemployment => {   // load real Google trends data here
    //         console.log(us.objects.states);
    //         console.log(unemployment);

    //         let rateById = {};  // empty object to hold dataset
    //         unemployment.forEach(d => {
    //             rateById[d.id] = d.rate;    // populate object with each county's rate (retrieve and set at a key of each county's id)
    //         });
    //         // console.log(rateById);

    //         svg.append("g")
    //             .attr("class", "states")
    //             .selectAll("path")
    //             .data(topojson.feature(us, us.objects.states).features) // Bind TopoJSON data elements
    //             .enter().append("path")
    //             .attr("d", path)
    //             // .style("fill", d => {
    //             //     let rateValue = rateById[d.id]; // get unemployment rate for the given data point (match by id)
    //             //     return color(rateValue);    // pass unemployment rate into color function (defined below) to get the correct fill color
    //             // });
    //             .style("fill", "#008080");
    //     });

    //     let color = d3.scaleThreshold()
    //         .domain([0.02, 0.04, 0.06, 0.08, 0.10])
    //         .range(["#F0F0F0", "#b2d8d8", "#66b2b2", "#008080", "#006666", "#004c4c"]);
    //         // .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);  // different color palette
    // });
});