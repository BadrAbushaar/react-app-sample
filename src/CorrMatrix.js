// CorrMatrix.js
import React, { Component } from "react";
import Plotly from "plotly.js-dist";
// import * as d3 from "d3";

class CorrMatrix extends Component {
	componentDidMount() {
		this.plotCorrelationMatrix();
	}

	plotCorrelationMatrix() {
		const zValues = [
			[0.6, 0.49, 1],
			[0.68, 1, 0.49],
			[1, 0.68, 0.6],
		];

		const annotations = [];
		zValues.forEach((row, rowIndex) => {
			row.forEach((value, colIndex) => {
				const annotation = {
					x: colIndex,
					y: rowIndex,
					text: `${value.toFixed(2)}`,
					showarrow: false,
					font: {
						color: value >= 0.5 ? "#000" : "#fff",
					},
				};
				annotations.push(annotation);
			});
		});

		const trace1 = {
			z: zValues,
			dx: 1,
			dy: 1,
			x0: 0,
			y0: 0,
			scl: [
				["0", "rgb(0,0,204)"],
				["0.3", "rgb(102,0,153)"],
				["0.5", "rgb(204,0,0)"],
				["0.7", "rgb(255,102,0)"],
				["1", "rgb(255,255,0)"],
			],
			name: "trace 0",
			type: "heatmap",
			zmax: 1,
			zmin: 0.5,
			zauto: true,
			hoverinfo: "text",
			clickmode: "event+select",
		};

		const data = [trace1];

		const layout = {
			font: {
				size: 12,
				color: "#000",
				family: "Arial, sans-serif",
			},
			title: "Correlation Matrix",
			width: 600,
			height: 600,
			xaxis: {
				type: "linear",
				dtick: 1,
				range: [-0.5, 2.5],
				ticktext: ["total_bill", "tip", "size"],
				tickvals: [0, 1, 2],
				title: "",
				mirror: true,
				showgrid: true,
				showline: true,
				zeroline: false,
				gridcolor: "#ddd",
				gridwidth: 1,
				linecolor: "rgb(207, 226, 243)",
				linewidth: 8,
				tickangle: 0,
				tickcolor: "#000",
				tickwidth: 1,
				titlefont: {
					size: 0,
					color: "",
					family: "",
				},
			},
			yaxis: {
				type: "linear",
				dtick: 1,
				range: [-0.5, 2.5],
				ticktext: ["size", "tip", "total_bill"],
				tickvals: [2, 1, 0],
				title: "",
				mirror: true,
				showgrid: true,
				showline: true,
				zeroline: false,
				gridcolor: "#ddd",
				gridwidth: 1,
				linecolor: "rgb(207, 226, 243)",
				linewidth: 8,
				tickangle: 0,
				tickcolor: "#000",
				tickwidth: 1,
				titlefont: {
					size: 0,
					color: "",
					family: "",
				},
			},
			height: 440,
			legend: {
				font: {
					size: 0,
					color: "",
					family: "",
				},
			},
			margin: {
				b: 60,
				l: 70,
				r: 200,
				t: 60,
				pad: 2,
				autoexpand: true,
			},
			barmode: "stack",
			boxmode: "overlay",
			autosize: false,
			dragmode: "zoom",
			hovermode: "x",
			titlefont: {
				size: 0,
				color: "",
				family: "",
			},
			separators: ".,",
			bargroupgap: 0,
			hidesources: false,
			plot_bgcolor: "#fff",
			paper_bgcolor: "#fff",
			annotations: annotations,
		};

		Plotly.newPlot("plotly-div", data, layout);

		document
			.getElementById("plotly-div")
			.on("plotly_click", this.handlePlotClick);
	}

	handlePlotClick = (event) => {
		const { points } = event;
		if (points.length > 0) {
			const { x, y } = points[0];
			this.props.onCellClick(x, y);
		}
	};

	render() {
		return (
			<div className="correlation-matrix">
				<div id="plotly-div"></div>
			</div>
		);
	}
}

export default CorrMatrix;
