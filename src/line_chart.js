export const renderLineChart = dataset => {

    const width = 720;
    const height = 500;
    const padding = 40;

    let svg = d3.select(".line-chart-container").append("svg")
        .attr("width", width)
        .attr("height", height);
    
    d3.csv(dataset).then(data => {
        // Define x & y scales based on dataset
        // let maxX = data.length;  // The old way: set x value by datum's in the dataset array
        // let xScale = d3.scaleLinear()
        //     .domain([0, maxX])
        //     .range([padding, width - padding]);
        
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

        // Render data as circles on the chart
        let tabascoData = data.map(datum => {
            let newRow = Object.assign({}, { Month: datum.Month, tabasco: datum.tabasco });
            return newRow;
        });
        let srirachaData = data.map(datum => {
            let newRow = Object.assign({}, { Month: datum.Month, sriracha: datum.sriracha });
            return newRow;
        });
        // console.log(data);  // this has an extra key with columns; may need to add this to tabascoData & srirachaData
        // console.log(tabascoData);
        // console.log(srirachaData);
        // console.log(typeof data);
        // console.log(typeof tabascoData);
        // console.log(typeof srirachaData);
        
        svg.selectAll('circle')
            // .data(data)
            .data(tabascoData)
            .enter()
            .append("circle")
            // .attr("cx", (_, idx) => xScale(idx)) // The old way: set x value by datum's in the dataset array
            .attr("cx", (datum) => {
                return xScale(new Date(datum.Month))
            })
            .attr("cy", datum => yScale(datum.tabasco))
            .attr("r", "2")
            .attr("fill", "green");
        svg.selectAll('circle')
            // .data(data)
            .data(srirachaData)
            .exit().remove()
            .enter()
            .join("circle")
            .append("circle")
            // .attr("cx", (_, idx) => xScale(idx))
            .attr("cx", (datum) => {
                return xScale(new Date(datum.Month))
            })
            .attr("cy", datum => yScale(datum.sriracha))
            .attr("r", "2")
            .attr("fill", "orange");
    });
}


// // plot data as circles
// let circ = svg.selectAll('circle')  // selects all circles (even though they haven't been create yet!)
//     .data(dataset)  // bind data to DOM (bind each circle to a data point)
//     .enter()        // add one circle per data point
//     .append('circle')
//     .attr('cx', function (d) { return xScale(d[0]); })   // attributes for each circle are a function of the data points (scaled to the range)
//     .attr('cy', function (d) { return yScale(d[1]); })
//     .attr('r', function (d) { return rScale(d[2]); })
//     .attr('fill', 'purple').attr('opacity', 0.5);


// // add axes to svg
// // NOTE about translate: translate(origin-x-coord, origin-y-coord) ... remember y origin starts at top

// // x axis
// svg.append('g') // creates a group
//     .attr('class', 'axis')  // add css class for styling
    // .attr("transform", "translate(0," + (h - pad) + ")") // translate(origin-x-coord, origin-y-coord)
//     .call(xAxis);
// // y axis
// svg.append('g')
//     .attr('class', 'axis')
//     .attr("transform", "translate(" + pad + ", 0)")
//     .call(yAxis);