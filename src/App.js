// App.js
import React, { Component } from "react";
import * as d3 from "d3";
import TIPS from "./tips.csv";
import "./App.css";
import CorrMatrix from "./CorrMatrix";
import Scatter from "./Scatter";
import BarChart from "./BarChart";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [],
			data: null,
			selected_column: "total_bill",
			selectedLabels: { x: "total_bill", y: "tip" },
		};
	}

	componentDidMount() {
		d3.csv(TIPS).then((data) => {
			const columns = Object.keys(data[0]);
			this.setState({
				columns: columns,
				data: data,
			});
		});
	}

	handleCellClick = (x, y) => {
		const { columns } = this.state;
		this.setState({
			selectedLabels: { x: columns[x], y: columns[y] },
		});
	};

	render() {
		const {
			columns,
			data,
			selectedLabels,
			selected_column,
			selected_category,
		} = this.state;

		if (!data) {
			return <div>Loading data...</div>;
		}

		return (
			<div>
				<div id="header">
					<span>Select Target:</span>
					<select
						id="col_selector"
						value={selected_column}
						onChange={(e) => this.setState({ selected_column: e.target.value })}
					>
						{columns.map((col) => (
							<option key={col} value={col}>
								{col}
							</option>
						))}
					</select>
				</div>

				<div className="graph-container">
					<div id="bar-chart" className="widget">
						<BarChart
							data={data}
							selected_column={selected_column}
							selected_category={selected_category}
						/>
					</div>
					<div id="corr-matrix" className="widget">
						<CorrMatrix data={data} onCellClick={this.handleCellClick} />
					</div>
					<div id="scatter" className="widget">
						<Scatter data={data} selectedLabels={selectedLabels} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
