// Scatter.js
import React, { Component } from "react";
import * as d3 from "d3";

class Scatter extends Component {
	componentDidMount() {
		this.createScatterplot();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedLabels !== this.props.selectedLabels) {
			this.updateScatterplot();
		}
	}

	createScatterplot() {
		const { data, selectedLabels } = this.props;

		const margin = { top: 50, right: 30, bottom: 50, left: 40 },
			width = 1200 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;

		const svg = d3
			.select("#scatter-canvas")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		const xData = data.map((d) => parseFloat(d[selectedLabels.x]));
		const yData = data.map((d) => parseFloat(d[selectedLabels.y]));

		const x = d3.scaleLinear().domain([0, d3.max(xData)]).range([0, width]);
		const xAxis = d3.axisBottom(x).tickValues(d3.range(0, d3.max(xData), d3.max(xData)/10));
		svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

		svg.append("text")
			.attr("text-anchor", "middle")
			.attr("x", width / 2)
			.attr("y", height + 40)
			.text(selectedLabels.x);

		
		const y = d3.scaleLinear().domain([0, d3.max(yData)]).range([height, 0]).nice();
		const yAxis = d3.axisLeft(y).tickValues(d3.range(0, d3.max(yData), d3.max(yData)/10));
		svg.append("g").call(yAxis);

		svg.append("text")
			.attr("text-anchor", "middle")
			.attr("transform", "rotate(-90)")
			.attr("x", -height / 2)
			.attr("y", -30)
			.text(selectedLabels.y);

		

		svg
			.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", (d, i) => x(xData[i]))
			.attr("cy", (d, i) => y(yData[i]))
			.attr("r", 5)
			.attr("fill", "#404040");
			
	}

	updateScatterplot() {
		d3.select("#scatter-canvas").selectAll("*").remove();
		this.createScatterplot();
	}

	render() {
		const { selectedLabels } = this.props;

		return (
			<svg id="scatter-canvas" style={{ background: "#F0F0F0"} }>
				<text
					textAnchor="middle"
					x={600}
					y={440}
					style={{ fontSize: 12, fill: "#000" }}
				>
					{selectedLabels.x} vs {selectedLabels.y}
				</text>
			</svg>
		);
	}
}

export default Scatter;
