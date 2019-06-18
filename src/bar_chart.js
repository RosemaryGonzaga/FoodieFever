export const renderBarChart = (dataset, food, fillColor, setFoodCB) => {

    const width = 650;
    // const height = 350;
    let height = 300;
    if (["beef", "chicken", "turkey"].includes(food)) {
        height = 180;
    } 

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
            .attr("fill", fillColor)
            .transition()   // note: transition needs to precede any attributes that are to transition (should also BE preceded by initial values)
            .duration(320) // hard-coded for now...need to coordinate w/ updateYear function
            .attr("height", datum => height - padding - yScale(datum[food]))
            .attr("y", datum => {
                return yScale(datum[food]);
            });


        // update data
        const updateBars = (newDataset, delay) => {
            let duration = 600; // need to coordinate w/ updateYear function
            d3.selectAll(`.${food}`)    // select by "rect" or class
                .data(newDataset)
                .transition()
                .delay(delay)
                .duration(duration)
                .attr("height", datum => height - padding - yScale(datum[food]))
                .attr("y", datum => {
                    return yScale(datum[food]);
                })
        }

        // This function closes over the nested data for the food that is the subject of this chart rendering
        // This function will then get passed back out to index.js by setFoodCB...
        // ...where it will be invoked along with other callbacks for other foods...
        // ...in the event handler for the play button.
        function animateBars() { // try returning a callback that closes over the nestedData
            let delay = 0;
            for (let yr = 2006; yr < 2019; yr++) {
                updateBars(nestedData[yr], delay * 700);    // need to coordinate delay amount with the updateYear function
                delay += 1;
            }
        }

        // setFoodCB was defined in index.js and closed over a specific variable in that file.
        // Thus, setFoodCB can assign this animateBars function (carrying a reference to a specific dataset)...
        // ...to that variable.
        setFoodCB(animateBars);
    });
}