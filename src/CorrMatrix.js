// CorrMatrix.js
import React, { Component } from "react";
import * as d3 from "d3";
import { sec } from "mathjs";

class CorrMatrix extends Component {
	componentDidMount() {
		this.plotCorrelationMatrix();
	}

	plotCorrelationMatrix() {
		const data = [
			[1, 0.49, 0.6],
			[0.49, 1, 0.68],
			[0.6, 0.68, 1],
		];
		const columns = ['total_bill', 'tip', 'size']

		let svg = d3.select("#corr_matrix");
		const margin = {top: 40, right: 30, bottom: 60, left: 80};
		const width = +svg.attr("width") - margin.left - margin.right;
		const height = +svg.attr("height") - margin.top - margin.bottom;

		svg = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

		const x = d3.scaleBand()
          .range([0, width])
          .domain(data.map((_, i) => `${columns[i]}`))
          .padding(0.05);

		const y = d3.scaleBand()
			.range([0, height])
			.domain(data.map((_, i) => `${columns[i]}`))
			.padding(0.05);

		svg.append("g").call(d3.axisLeft(y))
			.selectAll('text')
				.attr('font-size', 15);

		svg
			.append("g")
			.attr("transform", `translate(0, ${height})`)
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("font-size", 15);

		const colorScale = d3.scaleSequential(d3.interpolateRdBu)
			.domain([-1, 1]);

		svg.append("linearGradient")
			.attr("id", "linear-gradient")
			.attr("x1", "0%")
			.attr("y1", "100%")
			.attr("x2", "0%")
			.attr("y2", "0%")
		.selectAll("stop")
			.data(colorScale.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colorScale(t) })))
			.enter().append("stop")
			.attr("offset", d => d.offset)
			.attr("stop-color", d => d.color)
	
		const legend = svg.append("g")
			.attr("transform", `translate(${width+10}, 0)`);
		
		legend.append("rect")
        .attr("width", 20)
        .attr("height", height)
        .style("fill", "url(#linear-gradient)");

		const row = svg.selectAll(".row")
			.data(data)
			.enter().append("g")
			.attr("transform", (_, i) => `translate(0,${y(`${columns[i]}`)})`)
			.attr('primary-data', (_, i) => `${columns[i]}`);

		let cells = row.selectAll(".cell")
			.data(d => d)
			.enter().append('g')
		cells.append("rect")
			.attr("x", (_, i) => x(`${columns[i]}`))
			.attr("width", x.bandwidth())
			.attr("height", y.bandwidth())
			.attr('secondary-data', (_, i) => `${columns[i]}`)
			.style("fill", d => colorScale(d))
			.on('click', this.handlePlotClick);
		cells.append('text')
		.text(d => d)
		.attr("x", (_, i) => x(`${columns[i]}`)+x.bandwidth()/2)
		.attr('y', _ => y.bandwidth()/2)
		.attr('text-anchor', 'middle')
		.attr('fill', d => d > 0.75 ? 'white' : 'black')
		
	}

	handlePlotClick = (event) => {
		console.log(event)
		let secondary = event.target.attributes['secondary-data'].value
		let primary = event.target.parentElement.parentElement.attributes['primary-data'].value
		console.log(primary)
		console.log(secondary)
		this.props.onCellClick(primary.toString(), secondary.toString())
	};

	render() {
		return (
			<svg id='corr_matrix' width="400" height="400"></svg >
		);
	}
}

export default CorrMatrix;
