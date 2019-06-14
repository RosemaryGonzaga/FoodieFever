const geoColor = d3.scaleThreshold()
    .domain([0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0])
    .range(["lightgray", "#009392", "#39B185", "#9CCB86", "#E9E29C", "#EEB479", "#E88471", "#CF597E"]); // color scheme 1 (green-red)
    // .range(["lightgray", "#228B3B", "#6CBA7D", "#CDE5D2", "#FCE1A4", "#FABF7B", "#E05C5C", "#AB1866"]); // color scheme 2 (green-magenta)
    // .range(["lightgray", "#3C93C2", "#6CB0D6", "#9EC9E2", "#E1F2E3", "#FEB24C", "#FD8D3C", "#FC4E2A"]); // color scheme 3 (blue-orange)

export const renderGeoMap = (dataset) => {  // renderGeoMap doesn't use dataset directly, but passes it to colorGeoMap()
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

export const colorGeoMap = (dataset, year = "2006") => {

    d3.csv(dataset).then(data => {
        const filteredData = data.filter(datum => datum.year === year);
        let searchFreqByState = {};
        filteredData.forEach(datum => {
            if (datum.sriracha === "0" && datum.tabasco === "0") {
                searchFreqByState[datum.Region] = -0.2;
            } else {
                searchFreqByState[datum.Region] = parseFloat(datum.sriracha);
            }
        });

        d3.selectAll(".states")
            .transition().duration(150) // may get rid of this
            .style("fill", d => {
                let searchFreq = searchFreqByState[d.properties.NAME];
                return geoColor(searchFreq);
            });
    });
}






    // TUTORIAL CODE
    // Global variables to store slider state and "dictionary" (or reference values for input)
    // var inputValue = null;
    // var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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