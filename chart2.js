function renderChart2() {
	// Graph dimensions
	//Dimensions
	var margin = {
		top: 50,
		right: 150,
		bottom: 100,
		left: 50
	},
		width = 600 - 200,
		height = 550 - 150;
	tooltip = d3.select("#tooltip");

	var City = [{
		fuel: "Electricity",
		value: 119.2,
		count: 10
	}, {
		fuel: "Diesel",
		value: 24.5,
		count: 6
	}, {
		fuel: "Gasoline",
		value: 19.53,
		count: 130
	},

	];

	var Highway = [{
		fuel: "Electricity",
		value: 101.5,
		count: 10
	}, {
		fuel: "Diesel",
		value: 32.5,
		count: 6
	}, {
		fuel: "Gasoline",
		value: 26.66,
		count: 130
	},];

	var svg = d3.select("#slide2")
		.append("svg")
		.attr("width", 600)
		.attr("height", 550)
		.append("g")
		.attr("transform",
			"translate(" + 150 + "," + 50 + ")");

	// X axis
	var x = d3.scaleBand().range([0, 400]).domain(City.map(function (d) {
		return d.fuel;
	}))
		.padding(0.23);
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))

	svg.append("text")
		.attr("x", 200)
		.attr("y", 440)
		.style("text-anchor", "middle")
		.text("Fuel Type");

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
		.domain(["Electricity", "Diesel", "Gasoline"])
		.range(["Lightblue", "Orange", "pink"]);


	var legend = svg.selectAll('legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function (d, i) {
			return 'translate(0,' + i * 22 + ')';
		});

	legend.append('circle')
		.attr('cx', width + 32)
		.attr('cy', 17)
		.attr('r', 8)
		.style('fill', color);

	legend.append('text')
		.attr('x', width + 20)
		.attr('y', 15)
		.attr('dy', '.35em')
		.style('text-anchor', 'end')
		.text(function (d) {
			return d;
		});


	legend.on('click', function (type) {
		d3.selectAll('rect')
			.style('opacity', 0.1)
			.filter(function (d) {
				return d.fuel == type;
			})
			.style('opacity', 1);
	})

	svg.append("text")
		.attr("x", (width / 2))
		.attr("y", 0 - (margin.top / 2))
		.attr("text-anchor", "middle")
		.style("font-size", "16px")
		.style("text-decoration", "bold")
		.text("Fuel Type vs Average Mileage");

	svg.append("text")
		.attr("x", width - 5)
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
			.on("mouseover", function (d) {
				tooltip.transition()
					.duration(200)
					.style("opacity", .9);
				tooltip.html(function () {
					var avgMPG = "<div><span>Avg MPG: </span>" + d.value + "</div>";
					var noVehicles = "<div><span>No. of Vehicles: </span>" + d.count + "</div>";
					return "<div>" + avgMPG + noVehicles + "</div>"
				})
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY - 28) + "px");
			})
			.on("mouseout", function (d) {
				tooltip.transition()
					.duration(500)
					.style("opacity", 0);
			})
			.merge(bars)
			.transition()
			.duration(1800)
			.attr("x", function (d) {
				return x(d.fuel);
			})
			.attr("y", function (d) {
				return y(d.value);
			})
			.attr("width", x.bandwidth())
			.attr("height", function (d) {
				return height - y(d.value);
			})
			.attr("fill", function (d) {
				return color(d.fuel);
			})

		svg.selectAll("text.label").remove();
		var label = svg.selectAll("text.label")
			.data(City)

		label.enter()
			.append("text")
			.attr("class", "label")
			.transition()
			.duration(1800)
			.text(function (d) {
				return d.value
			})
			.attr("x", function (d) {
				return x(d.fuel) + x.bandwidth() / 2;
			})
			.attr("y", function (d) {
				return y(d.value) - 5;
			})
			.attr("text-anchor", "middle")
	}

	// Initialize the plot with the first dataset
	update(City)
}