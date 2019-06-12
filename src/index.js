document.addEventListener("DOMContentLoaded", () => {
    // IMPORTANT NOTE: RIGHT NOW, THIS IS CODE I WROTE FOR A TUTORIAL, AS PROOF OF CONCEPT
    // NOT MY OWN PROJECT CODE (but I didn't just copy / paste)
    // Tutorial source: http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/

    // alert('hello!!!');
    // console.log('this should print in the console!')
    // debugger

    const width = 720,
        height = 500;

    // console.log(width);
    // console.log(height);

    const projection = d3.geoAlbersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);

    let svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    // VERSION 5 SYNTAX: PROMISES
    d3.json("assets/data/us.json").then(us => {
        // debugger
        d3.tsv("assets/data/us_unemployment_2008.tsv").then(unemployment => {

            let rateById = {};  // empty object to hold dataset
            unemployment.forEach(d => {
                rateById[d.id] = d.rate;    // populate object with each county's rate (retrieve and set at a key of each county's id)
            });
            // console.log(rateById);

            svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features) // Bind TopoJSON data elements
                .enter().append("path")
                .attr("d", path)
                .style("fill", d => {
                    let rateValue = rateById[d.id]; // get unemployment rate for the given data point (match by id)
                    return color(rateValue);    // pass unemployment rate into color function (defined below) to get the correct fill color
                });
            // .style("stroke", "black");

            svg.append('path')
                .datum(topojson.mesh(us, us.objects.states, (a, b) => {
                    // console.log(us.objects.states);
                    return a.id !== b.id;
                }))
                .attr("class", "states")
                // .attr("fill", "none")   // inline styling --> right now application.css is dictating the style
                // .attr("stroke", "white")  // inline styling --> right now application.css is dictating the style
                .attr("d", path);
        });

        let color = d3.scaleThreshold()
            .domain([0.02, 0.04, 0.06, 0.08, 0.10])
            .range(["#F0F0F0", "#b2d8d8", "#66b2b2", "#008080", "#006666", "#004c4c"]);
            // .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);  // different color palette
    });
});