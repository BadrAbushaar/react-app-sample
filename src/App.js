import React, { Component } from "react";
import * as d3 from "d3";
import TIPS from './tips.csv';
import './App.css';
import BarChart from "./BarChart";
import CorrMatrix from "./CorrMatrix";
import Scatter from "./Scatter";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: null, // Add 'data' to the initial state
            selected_column: "total_bill"
        };
    }

    componentDidMount() {
        d3.csv(TIPS).then((data) => {
            const columns = Object.keys(data[0]);
            this.setState({
                columns: columns,
                data: data // Set the data in the state
            });
        });
    }

    render() {
        const { columns, data, selected_column } = this.state;

        if (!data) {
            return <div>Loading data...</div>; // Handle the loading state
        }

        return (
            <div>
                <div id="header">
                    <span>Select Target:</span>
                    <select id="col_selector" onChange={(e) => this.setState({ selected_column: e.target.value })}>
                        {columns.map((col) => (
                            <option key={col} value={col}>
                                {col}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="graph-container">
                    <div id="bar-chart">
                        <BarChart data={data} selected_column={selected_column} />
                    </div>
                    <div id="corr-matrix">
                        <CorrMatrix data={data} />
                    </div>
                    <div id="scatter">
                        <Scatter data={data} selected_column={selected_column} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;