import React, { Component } from "react";
import * as d3 from "d3";
import TIPS from './tips.csv'
import './App.css';
import BarChart from "./BarChart";
import CorrMatrix from "./CorrMatrix";
import Scatter from "./Scatter";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [],
            selected_column: 'total_bill'
        }
    }
    componentDidMount() {
        let data = d3.csv(TIPS).then((data) => {
            this.setState({'columns': Object.keys(data[0])})
            //this.setState({'selected_column': this.state.columns[0]})
        })
    }
    componentDidUpdate() {
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <div id="header">
                    <span>Select Target:</span>
                    <select id='col_selector' onChange={(event) => {this.setState({selected_column: event.target.value})}}>
                        {this.state.columns.map((col, idx) => (
                            <option key={col}>{col}</option>
                        ))}
                    </select>
                </div>
                <div class="graph-container">
                    <div id="bar-chart">
                        <BarChart></BarChart>
                    </div>
                    <div id="corr-matrix">
                        <CorrMatrix></CorrMatrix>
                    </div>
                    <div id="scatter">
                        <Scatter></Scatter>
                    </div>
                </div> 
            </div>
        )
    }
}
export default App