import React, { Component } from "react";
import Chart from "react-apexcharts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {

        // labels:["one","Two", "Three"],
        // colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
     
        chart: {
          id: "basic-bar"
        },
        xaxis: {
            
          categories: [1991, 1992, 1993, 1994]
        }
      },
      series: [
        {
            color:"#46c378",
          name: "One",
          data: [30, 40, 45, 50]
        }
        // ,
        // {
        //     color:"#46c378",
        //     name: "Two",
        //     data: [555, 40, 45, 50, 49, 60, 70, 91]
        //   }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="400"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;