import React, { Component, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import categories from "../../data/categories";
import { useSelector } from "react-redux";

export default function Donut() {


  return (
    <div className="donut">
      <Chart
        type="pie"
        series={categories.map((value, index) => {
          return value.count;
        })}
        options={{
          labels: categories.map((value, index) => {
            return value.category;
          }),
          colors: ["#00000", "#00000", "#00000", "#00000", "#00000", "#00000"],
          chart: {
            width: "20px",
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
            colors: ["#46c378", "#328e56"],
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