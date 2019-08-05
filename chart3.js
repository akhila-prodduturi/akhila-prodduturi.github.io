function renderChart3() {
    // Graph dimensions
    var margin = {
            top: 50,
            right: 50,
            bottom: 100,
            left: 50
        },
        width = 500 - 100,
        height = 550 - 150,
        tooltip = d3.select("#tooltip");

    var Highway = [{
        Cylinders: "0",
        value: 101.5,
        count: 10,
        Gasoline: 0,
        Diesel: 0,
        Electricity: 10
    }, {
        Cylinders: "2",
        value: 33,
        count: 1,
        Gasoline: 1,
        Diesel: 0,
        Electricity: 0
    }, {
        Cylinders: "3",
        value: 37.5,
        count: 4,
        Gasoline: 4,
        Diesel: 0,
        Electricity: 0
    }, {
        Cylinders: "4",
        value: 31.36,
        count: 52,
        Gasoline: 48,
        Diesel: 4,
        Electricity: 0
    }, {
        Cylinders: "6",
        value: 25.59,
        count: 39,
        Gasoline: 37,
        Diesel: 2,
        Electricity: 0
    }, {
        Cylinders: "8",
        value: 21.86,
        count: 30,
        Gasoline: 30,
        Diesel: 0,
        Electricity: 0
    }, {
        Cylinders: "10",
        value: 20.67,
        count: 3,
        Gasoline: 3,
        Diesel: 0,
        Electricity: 0
    }, {
        Cylinders: "12",
        value: 18.71,
        count: 7,
        Gasoline: 7,
        Diesel: 0,
        Electricity: 0
    }];

    var City = [{
        Cylinders: "0",
        value: 119.2,
        count: 10,
        Gasoline: 0,
        Diesel: 0,
        Electricity: 10
    }, {
        Cylinders: "2",
        value: 36,
        count: 1,
        Gasoline: 1,
        Diesel: 0,
        Electricity: 0
    }, {
        Cylinders: "3",
        value: 31,
        count: 4,
        Gasoline: 4,
        Diesel: 0,
        Electricity: 0
    }, {
        Cylinders: "4",
        value: 24,
        count: 52,
        Gasoline: 48,
        Diesel: 4,
        Electricity: 0
    }, {
        Cylinders: "6",
        value: 18.28,
        count: 39,
        Gasoline: 37,
        Diesel: 2,
        Electricity: 0
    }, {
        Cylinders: "8",
        value: 14.7,
        count: 30,
        Gasoline: 30,
        Diesel: 0,
        Electricity: 0
    }, {
        Cylinders: "10",
        value: 13.33,
        count: 3,
        Gasoline: 3,
        Diesel: 0,
        Electricity: 0
    }, {
        Cylinders: "12",
        value: 12,
        count: 7,
        Gasoline: 7,
        Diesel: 0,
        Electricity: 0
    }];

    var svg = d3.select("#slide3")
        .append("svg")
        .attr("width", 500)
        .attr("height", 550)
        .append("g")
        .attr("transform",
            "translate(" + 50 + "," + 50 + ")");

    // X axis
    var x = d3.scaleBand().range([0, 400]).domain(City.map(function(d) {
            return d.Cylinders;
        }))
        .padding(0.23);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    svg.append("text")
        .attr("x", 200)
        .attr("y", 440)
        .style("text-anchor", "middle")
        .text("Engine Cylinders");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 120])
        .range([400, 0]);
    svg.append("g")
        .attr("class", "myYaxis")
        .call(d3.axisLeft(y));


    svg.append("text")
        .attr("x", -200)
        .attr("y", -35)
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("Average Miles per Gallon");

    var color = d3.scaleOrdinal()
        .domain(["0", "2", "3", "4", "6", "8", "10", "12"])
        .range(["Lightblue", "#cdc675", "pink", "turquoise", "Orange", "#b17fc3", "lightgreen", "coral"]);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var legend = svg.selectAll('legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            return 'translate(0,' + i * 22 + ')';
        });

    legend.append('circle')
        .attr('cx', width + 25)
        .attr('cy', 17)
        .attr('r', 8)
        .style('fill', color);

    legend.append('text')
        .attr('x', width + 13)
        .attr('y', 15)
        .attr('dy', '.35em')
        .style('text-anchor', 'end')
        .text(function(d) {
            return d;
        });


    legend.on('click', function(type) {
        d3.selectAll('rect')
            .style('opacity', 0.1)
            .filter(function(d) {
                return d.Cylinders == type;
            })
            .style('opacity', 1);
    })

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "bold")
        .text("Engine Cylinders vs Average Mileage");

    svg.append("text")
        .attr("x", width + 15)
        .attr("y", 2)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("text-decoration", "bold")
        .style("text-decoration", "italic")
        .text("Click to Filter");

    // A function that create / update the plot for a given variable:
    function update(City) {
        var bars = svg.selectAll("rect")
            .data(City)
        bars
            .enter()
            .append("rect")
            .on("mouseover", function(d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(function() {
                        var avgMPG = "<div><span>Avg MPG:</span> " + d.value + "</div>";
                        var noVehicles = "<div><span>No. of Vehicles: </span>" + d.count + "</div>";
                        var gasVehicles = "<div><span>Gasoline Vehicles: </span>" + d.Gasoline + "</div>";
                        var dieselVehicles = "<div><span>Diesel Vehicles: </span>" + d.Diesel + "</div>";
                        var electricVehicles = "<div><span>Electric Vehicles: </span>" + d.Electricity + "</div>";
                        return "<div>" + avgMPG + noVehicles + gasVehicles + dieselVehicles + electricVehicles + "</div>"
                    })
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 56) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .merge(bars)
            .transition()
            .duration(1800)
            .attr("x", function(d) {
                return x(d.Cylinders);
            })
            .attr("y", function(d) {
                return y(d.value);
            })
            .attr("width", x.bandwidth())
            .attr("height", function(d) {
                return height - y(d.value);
            })
            .attr("fill", function(d) {
                return color(d.Cylinders);
            })

        svg.selectAll("text.label").remove();
        var label = svg.selectAll("text.label")
            .data(City)

        label.enter()
            .append("text")
            .attr("class", "label")
            .transition()
            .duration(1800)
            .text(function(d) {
                return d.value
            })
            .attr("x", function(d) {
                return x(d.Cylinders) + x.bandwidth() / 2;
            })
            .attr("y", function(d) {
                return y(d.value) - 5;
            })
            .attr("text-anchor", "middle")
    }

    // Initialize the plot with the first dataset
    update(City)
}