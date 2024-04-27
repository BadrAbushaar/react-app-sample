import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.data,
            primary_column: props.selected_column
        }
    }  
    changeBars(secondary) {
        this.state.secondary = secondary
        const { data, primary_column } = this.state;
        if (!data || !primary_column) {
            console.error("Data or primary_column is undefined");
            return;
        }
        let acc = {}
        data.forEach((row, i) => {
            const primary_val = row[primary_column]
            const secondary_val = row[secondary]

            if (!acc[secondary_val]) {
                acc[secondary_val] = {
                    avg: parseFloat(primary_val),
                    count: 1
                }
            }
            else {
                let prev = acc[secondary_val]
                acc[secondary_val] = {
                    avg: ((prev.avg * prev.count) + parseFloat(primary_val)) / (prev.count+1),
                    count: prev.count + 1
                }
            }
        })
        acc = Object.entries(acc)
        let max_val = 0
        acc.forEach((e) => {
            if (e[1].avg > max_val) {
                max_val = e[1].avg
            }
        })
        
        console.log(acc)
        console.log(max_val)
        
        const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        d3.select("#bar-canvas").selectAll("*").remove();

        const svg = d3.select("#bar-canvas")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
        
        // X axis
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(acc.map(d => d[0]))
            .padding(0.2);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, max_val * 1.1])
            .range([ height, 0]);
            svg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
            .data(acc)
            .join("rect")
            .attr("x", d => x(d[0]))
            .attr("y", d => y(d[1].avg))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d[1].avg))
            .attr("fill", "#69b3a2")
    }  
    componentDidMount() {
        this.changeBars('sex')
    }
    componentDidUpdate() {
        this.state.primary_column = this.props.selected_column
        this.changeBars(this.state.secondary)
    }
    render() {
        let cat_columns = ["sex","smoker","day","time","size"]
        return <div id='barchart-inner'>
            <div id='secondary_select'>
                {cat_columns.map((col, index) => (
                    <span key={col}>
                        <input type="radio" name="secondary_col" value={col} defaultChecked={index==0} onChange={(e) => this.changeBars(e.target.value)}></input>{col}<br></br>
                    </span>
                ))}
            </div>
            <svg id='bar-canvas'></svg>
        </div>
    }
}

export default BarChart