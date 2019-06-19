export const renderScatterPlot = dataset => {

    const width = 680;
    const height = 400;
    const padding = 80;

    let svg = d3.select(".scatter-plot-container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "scatter-plot-svg"); // added this so I can select it and remove it later
    
    d3.csv(dataset).then(data => {
        let [_, food1, food2] = data.columns;   // new code - factoring out some hard-coded values
        // debugger
        // Define x & y scales based on dataset
        let xScale = d3.scaleTime()
            .domain([new Date(2006, 0, 1), new Date(2019, 0, 6)])
            .range([padding, width - padding]);
        let yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - (padding / 2), padding / 2]);

        // Define axes based on x & y scales
        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        // Render axes onto DOM
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (height - (padding / 2)) + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ", 0)")
            .call(yAxis);
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (padding / 2) + "," + (height / 2) + ")rotate(-90)")
            .text("Normalized search volume (% of highest value)")
            .style("font-size", "12px")
            .style("margin-bottom", "35px");
        svg.append("text")
            .attr("text-anchor", "middle")
            // .attr("transform", "translate(" + width / 2 + "," + (height-(padding/4)) + ")")
            .attr("transform", "translate(" + width / 2 + "," + height + ")")
            .text("Year")
            .style("font-size", "12px");

        // Tag and combine tabasco & sriracha data for scatterplot overlay
        // Note: It didn't work when I tried to append first one column's data (tabasco),
        // ...then another (sriracha) in two separate data joins and enter / append statements.
        // ...Not quite sure why it didn't work...might have to do with the datasets being the
        // ...same size and therefore not registering an enter selection.
        // ...This implementation is a workaround that selects, joins, and appends both datasets at the same time.
        // POTENTIAL REFACTOR LATER: PASS IN VARIABLES (instead of "tabasco", "sriracha")
        let food1Data = data.map(datum => {   // food1 = tabasco
            // debugger
            // let newRow = Object.assign({}, { Month: datum.Month, tabasco: datum.tabasco });     // food1 = tabasco
            let newRow = Object.assign({}, { Month: datum.Month, [food1]: datum[food1] });     // food1 = tabasco
            return newRow;
        });
        let food2Data = data.map(datum => {  // food2 = sriracha
            let newRow = Object.assign({}, { Month: datum.Month, [food2]: datum[food2] });   // food2 = sriracha
            return newRow;
        });
        let taggedCombinedData = food1Data.concat(food2Data);  // food1 = tabasco, food2 = sriracha

        // Render data as circles on the chart
        svg.selectAll("circle")
            .data(taggedCombinedData)
            .enter()
            .append("circle")
            // .attr("class", "dots")
            .attr("cx", (datum) => {
                return xScale(new Date(datum.Month))
            })
            .attr("cy", datum => {
                // if (datum.tabasco !== undefined) {          // food1 = tabasco
                //     return yScale(datum.tabasco)            // food1 = tabasco
                // } else if (datum.sriracha !== undefined) {  // food2 = sriracha
                //     return yScale(datum.sriracha)           // food2 = sriracha
                // }
                if (datum[food1] !== undefined) {          // food1 = tabasco
                    return yScale(datum[food1])            // food1 = tabasco
                } else if (datum[food2] !== undefined) {  // food2 = sriracha
                    return yScale(datum[food2])           // food2 = sriracha
                }
            })
            .attr("r", "5")
            .attr("fill", datum => {
                // if (datum.tabasco !== undefined) {          // food1 = tabasco
                //     return "#9CCB86";   // light green
                // } else if (datum.sriracha !== undefined) {  // food2 = sriracha
                //     return "#EEB479";   // orange
                // }
                if (datum[food1] !== undefined) {          // food1 = tabasco
                    return "#9CCB86";   // light green
                } else if (datum[food2] !== undefined) {  // food2 = sriracha
                    return "#EEB479";   // orange
                }
            });
        // colorScatterPlot();
        colorScatterPlot("2006", food1, food2);
    });
}

export const colorScatterPlot = (year = "2006", food1, food2) => {
    const selectFillColor = datum => {
        // let [_, food1, food2] = Object.keys(datum);
        // debugger
        // let datumYr = datum.Month.split("-")[0];
        let [datumYr] = datum.Month.split("-"); // try out some JS array destructuring
        if (datumYr === year) {
            // if (datum.tabasco !== undefined) {          // food1 = tabasco
            //     return "#009392";   // dark green
            // } else if (datum.sriracha !== undefined) {  // food2 = sriracha
            //     return "#CF597E";   // red
            // }
            // debugger
            if (datum[food1] !== undefined) {          // food1 = tabasco
                return "#009392";   // dark green
            } else if (datum[food2] !== undefined) {  // food2 = sriracha
                return "#CF597E";   // red
            }
        } else {
            if (datum[food1] !== undefined) {          // food1 = tabasco
                return "#9CCB86";   // light green
            } else if (datum[food2] !== undefined) {  // food2 = sriracha
                return "#EEB479";   // orange
            }
        }
    };

    d3.selectAll("circle")
        // .transition().duration(150) // may get rid of this; must be in sync with geomap
        .style("fill", selectFillColor);
}

export const removeScatterPlot = () => {
    // debugger
    d3.selectAll(".scatter-plot-svg").remove();
};