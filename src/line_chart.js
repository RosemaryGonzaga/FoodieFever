export const renderLineChart = dataset => {

    const width = 720;
    const height = 500;
    const padding = 40;

    let svg = d3.select(".line-chart-container").append("svg")
        .attr("width", width)
        .attr("height", height);
    
    d3.csv(dataset).then(data => {

        // Define x & y scales based on dataset
        let xScale = d3.scaleTime()
            .domain([new Date(2004, 0, 1), new Date(2019, 0, 6)])
            .range([padding, width - padding]);
            
        let maxY = 100;
        let yScale = d3.scaleLinear()
            .domain([0, maxY])
            .range([height - padding, padding]);

        // Define axes based on x & y scales
        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        // Render axes onto DOM
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (height - padding) + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ", 0)")
            .call(yAxis);

        // Tag and combine tabasco & sriracha data for scatterplot overlay
        // Note: It didn't work when I tried to append first one column's data (tabasco),
        // ...then another (sriracha) in two separate data joins and enter / append statements.
        // ...Not quite sure why it didn't work...might have to do with the datasets being the
        // ...same size and therefore not registering an enter selection.
        // ...This implementation is a workaround that selects, joins, and appends both datasets at the same time.
        let tabascoData = data.map(datum => {
            let newRow = Object.assign({}, { Month: datum.Month, tabasco: datum.tabasco });
            return newRow;
        });
        let srirachaData = data.map(datum => {
            let newRow = Object.assign({}, { Month: datum.Month, sriracha: datum.sriracha });
            return newRow;
        });
        let taggedCombinedData = tabascoData.concat(srirachaData);

        // Render data as circles on the chart
        svg.selectAll('circle')
            .data(taggedCombinedData)
            .enter()
            .append("circle")
            .attr("cx", (datum) => {
                return xScale(new Date(datum.Month))
            })
            .attr("cy", datum => {
                if (datum.tabasco !== undefined) {
                    return yScale(datum.tabasco)
                } else if (datum.sriracha !== undefined) {
                    return yScale(datum.sriracha)
                }
            })
            .attr("r", "2")
            .attr("fill", datum => {
                if (datum.tabasco !== undefined) {
                    return "green";
                } else if (datum.sriracha !== undefined) {
                    return "orange";
                }
            });
    });
}