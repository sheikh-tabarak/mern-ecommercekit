import React, { Component } from "react";
import Chart from "react-apexcharts";
import categories from "../../data/categories";

class Donut extends Component {
  render() {
    return (
      <div className="donut">
        <Chart
          type="pie"
          series={[63, 25]}
          options={{
            
            labels: categories.map((value,index)=>{
                return value.category
            }),
            colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
            chart: {
              width: "50px",
            },
            states: {
              hover: {
                filter: {
                  type: "none",
                },
              },
            },
            legend: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            hover: { mode: null },
            plotOptions: {
              donut: {
                expandOnClick: false,
                donut: {
                  labels: {
                    show: false,
                  },
                },
              },
            },
            fill: {
              colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
            },
            tooltip: {
              enabled: true,
              theme: "dark",
              style: {
                fontSize: "12px",
                fontFamily: undefined,
                backgroundColor: "#000000",
              },
            },
          }}
        />
      </div>
    );
  }
}

export default Donut;

// import Chart from "react-apexcharts";
// import Card from "../Card";

// const PieChart = (props) => {
//   const { series, options } = props;

//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {},
//       series: [44, 55, 41, 17, 15],
//       labels: ['A', 'B', 'C', 'D', 'E']
//     }
//   }

// //   render() {

//     return (
//       <div className="donut">
//         <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
//       </div>
//     );

// //   return (

// //     <>
// //      <Chart
// //       options={options}
// //       series={series}
// //       type="pie"
// //       width="100%"
// //       height="100%"
// //     />

// //     <div>LOL</div>
// //     </>

// //   );
// };

// export default PieChart;
