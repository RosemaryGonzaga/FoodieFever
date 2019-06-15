export const renderBarChart = dataset => {

    const width = 650;
    const height = 400;
    const padding = 40;

    let svg = d3.select(".bar-chart-container").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.csv(dataset).then(data => {

        // Define x & y scales based on dataset
        let xScale = d3.scaleLinear()   // should I use scaleBand?
            .domain([0, 12])
            .range([padding, width - padding]);
        let xScaleLabels = d3.scaleLinear()   // should I use scaleBand?
            .domain([0, 11])
            .range([padding + 24, width - padding - 24]);
        let yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - padding, padding]);

        // Define axes based on x & y scales
        const months = [
            "Jan", "Feb", "Mar", "Apr", 
            "May", "Jun", "Jul", "Aug", 
            "Sep", "Oct", "Nov", "Dec"
        ];
        let xAxis = d3.axisBottom(xScale)
                    .tickFormat("");
        let xAxisLabels = d3.axisBottom(xScaleLabels)
                    // .tickSize(0)
                    .tickFormat(d => months[d]);
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

        // Render x-axis label separately (for centering); might need a better solution
        svg.append("g")
            .attr("class", "axis-labels")
            .attr("transform", "translate(0," + (height - padding) + ")")
            .call(xAxisLabels);
        svg.selectAll(".axis-labels")
            .selectAll(".tick")
            .selectAll("line")
            .attr("stroke", "transparent");

        // Render data as bars on the chart
        const filterData = (data, year) => {
            return data.filter(datum => {
                let [datumYr] = datum.Month.split("-");
                return datumYr === year;  // hardcoded for now
            });
        };
        const data2006 = filterData(data, "2006")
        const data2012 = filterData(data, "2012")

        // let bars = svg.selectAll("rect").data(data2006);
        // bars.enter()

        svg.selectAll("rect")
            .data(data2006)
            .enter()
            .append("rect")
            .attr("class", "chocolate-bars")
            .attr("x", datum => {
                let [_, datumMonth] = datum.Month.split("-");
                return xScale(parseInt(datumMonth) - 1) + 6;    // Adding 6 to center bar graphs for now, but need a better way (also need to offset labels)
            })
            .attr("y", datum => {
                return height - padding - datum.chocolate;
            })
            .attr("width", "36")
            // .attr("width", xScale.bandwidth())
            .attr("height", "0")
            .attr("fill", "red")
            .transition()   // note: transition needs to precede any attributes that are to transition (should also BE preceded by initial values)
            .duration(750) // hard-coded for now
            // .ease(d3.easeLinear)
            .attr("height", datum => datum.chocolate)
            .attr("fill", "orange") // temporary blink of color to highlight the change
            .transition()
            .duration(500)
            .attr("fill", "red");

        // update data
        let chocolateBars = d3.selectAll(".chocolate-bars")    // or select by rect
        // chocolateBars
        svg.selectAll("rect")
            .data(data2006)
            .transition()
            .delay(2000)
            .duration(1000)
            .attr("fill", "green")
            .attr('height', datum => datum.chocolate)
            .attr('y', datum => height - padding - datum.chocolate);

        // exit data
        svg.selectAll(".chocolate-bars")    // or select by rect
            .transition()
            .delay(4000)
            .duration(1000)
            .attr("fill", "blue")
            .attr('height', 0)
            .attr('y', height - padding)
            .remove();
    });

}