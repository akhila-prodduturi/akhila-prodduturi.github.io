function renderChart1() {
	// Graph dimensions
	var margin = {
			top: 50,
			right: 150,
			bottom: 100,
			left: 50
		},
		width = 500 - margin.left - margin.right,
		height = 550 - margin.top - margin.bottom,
		tooltip = d3.select("#tooltip");

	// append the svg object 
	var svg = d3.select("#slide1")
		.append("svg")
		.attr("width", 600)
		.attr("height", 550)
		.append("g")
		.attr("transform",
			"translate(" + 150 + "," + 50 + ")")

	//Read the data
	d3.csv("https://flunky.github.io/cars2017.csv", function(data) {

		//Add colors according to fuel type

		var color = d3.scaleOrdinal()
			.domain(["Gasoline", "Diesel", "Electricity"])
			.range(["Lightblue", "Orange", "lightpink"])

		// X axis
		var x = d3.scaleLinear()
			.domain([0, 0])
			.range([0, 400]);
		svg.append("g")
			.attr("class", "myXaxis")
			.attr("transform", "translate(" + 0 + "," + 400 + ")")
			.call(d3.axisBottom(x))
			.attr("opacity", "0")

		// Label for x axis  
		svg.append("text")
			.attr("x", 200)
			.attr("y", 440)
			.style("text-anchor", "middle")
			.text("Average Miles per Gallon in the City");

		// Add Y axis
		var y = d3.scaleLinear()
			.domain([0, 0])
			.range([400, 0]);
		svg.append("g")
			.attr("class", "myYaxis")
			.call(d3.axisLeft(y))
			.attr("opacity", "0")

		// Label for Y axis
		svg.append("text")
			.attr("x", -200)
			.attr("y", -40)
			.attr("transform", "rotate(-90)")
			.style("text-anchor", "middle")
			.text("Average Miles per Gallon on Highway");


		// Add the data points
		svg.append('g')
			.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function(d, i) {
				return x(d.AverageCityMPG);
			})
			.attr("cy", function(d, i) {
				return y(d.AverageHighwayMPG);
			})
			.attr("r", function(d, i) {
				return 6 - -(d.EngineCylinders);
			})
			.style("fill", function(d, i) {
				return color(d.Fuel);
			})
			.style("stroke", "black")
			.on("mouseover", function(d, i) {
				tooltip.style("opacity", 1)
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px")
					.html("Fuel:" + d.Fuel + "<br/>" + "Make:" + d.Make +
						"<br/>" + "Engine Cylinders:" + d.EngineCylinders);
			})
			.on("mouseout", function() {
				tooltip.style("opacity", 0)
			})


		// new X axis
		x.domain([0, 175])
		svg.select(".myXaxis")
			.transition()
			.duration(3000)
			.attr("opacity", "1")
			.call(d3.axisBottom(x));

		y.domain([0, 175])
		svg.select(".myYaxis")
			.transition()
			.duration(3000)
			.attr("opacity", "1")
			.call(d3.axisLeft(y));

		svg.selectAll("circle")
			.transition()
			.delay(function(d, i) {
				return (i * 3)
			})
			.duration(3000)
			.attr("cx", function(d) {
				return x(d.AverageCityMPG);
			})
			.attr("cy", function(d) {
				return y(d.AverageHighwayMPG);
			})

		var legend = svg.selectAll('legend')
			.data(color.domain())
			.enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', function(d, i) {
				return 'translate(0,' + i * 22 + ')';
			});

		legend.append('rect')
			.attr('x', width + 24)
			.attr('y', 20)
			.attr('width', 15)
			.attr('height', 15)
			.style('fill', color);

		legend.append('text')
			.attr('x', width + 20)
			.attr('y', 25)
			.attr('dy', '.35em')
			.style('text-anchor', 'end')
			.text(function(d) {
				return d;
			});


		legend.on('click', function(type) {
			d3.selectAll('circle')
				.style('opacity', 0)
				.filter(function(d) {
					return d.Fuel == type;
				})
				.style('opacity', 1);
		})

		svg.append("text")
			.attr("x", (width / 2))
			.attr("y", 0 - (margin.top / 2))
			.attr("text-anchor", "middle")
			.style("font-size", "16px")
			.style("text-decoration", "bold")
			.text("Avg Highway MPG vs Avg City MPG");

		svg.append("text")
			.attr("x", width + 5)
			.attr("y", 10)
			.attr("text-anchor", "middle")
			.style("font-size", "12px")
			.style("text-decoration", "bold")
			.style("text-decoration", "italic")
			.text("Click to Filter");

		svg.append("text")
			.attr("x", width)
			.attr("y", 130)
			.attr("text-anchor", "middle")
			.style("font-size", "12px")
			.style("text-decoration", "bold")
			.text("Hyundai, 0 cylinders");


	});
}