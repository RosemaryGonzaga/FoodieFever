export const renderBarChart = (dataset, food) => {

    const width = 650;
    // const height = 350;
    let height = 300;
    if (["beef", "chicken", "turkey"].includes(food)) {
        height = 210;
    } 
    // else {
    //     height = 350;
    // }

    const padding = 20;

    let svg = d3.select(".bar-chart-container").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.csv(dataset).then(data => {

        // Define x & y scales based on dataset
        let xScale = d3.scaleLinear()   // should I use scaleBand?
            .domain([0, 12])
            .range([padding*2, width - padding*2]);
        let xScaleLabels = d3.scaleLinear()   // should I use scaleBand?
            .domain([0, 11])
            .range([padding*2 + 24, width - padding*2 - 24]);
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
            .attr("transform", "translate(" + padding*2 + ", 0)")
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

        let nestedData = {};
        for (let yr = 2006; yr < 2019; yr++) {
            nestedData[`${yr}`] = filterData(data, `${yr}`);
        }
        
        svg.selectAll("rect")
            .data(nestedData["2006"])
            .enter()
            .append("rect")
            .attr("class", `${food}`)
            .attr("x", datum => {
                let [_, datumMonth] = datum.Month.split("-");
                return xScale(parseInt(datumMonth) - 1) + 6;    // Adding 6 to center bar graphs for now, but need a better way (also need to offset labels)
            })
            .attr("width", "36")
            .attr("height", "0")
            .attr("y", height - padding)
            .attr("fill", "red")
            .transition()   // note: transition needs to precede any attributes that are to transition (should also BE preceded by initial values)
            .duration(1000) // hard-coded for now
            .attr("height", datum => height - padding - yScale(datum[food]))
            .attr("y", datum => {
                return yScale(datum[food]);
            });
            // .attr("fill", "orange") // temporary blink of color to highlight the change
            // .transition()
            // .duration(500)
            // .attr("fill", "red");


        // update data
        const updateBars = (newDataset, delay) => {
            let duration = 700;
            d3.selectAll(`.${food}`)    // select by "rect" or class
                .data(newDataset)
                .transition()
                .delay(delay)
                .duration(duration)
                .attr("height", datum => height - padding - yScale(datum[food]))
                .attr("y", datum => {
                    return yScale(datum[food]);
                })
                // .attr("fill", "orange") // temporary blink of color to highlight the change
                // .transition()
                // .duration(500)
                // .attr("fill", "red");
        }

        // temporary animation
        let delay = 1;
        for (let yr = 2007; yr < 2019; yr++) {
            updateBars(nestedData[yr], delay * 700);
            delay += 1;
        }
    });
}



// // exit data
        // svg.selectAll(".spinach")    // or select by rect
        //     .transition()
        //     .delay(4000)
        //     .duration(1000)
        //     .attr("fill", "blue")
        //     .attr('height', 0)
        //     .attr('y', height - padding)
        //     .remove();