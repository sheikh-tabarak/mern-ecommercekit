import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BarChart() {
  const [ReduxOrderData, setReduxOrderData] = useState([]);
  const [ReduxProductsData, setReduxProductsData] = useState([]);

  const OrderDetails = useSelector((state) => state.orders.OrderData);
  const ProductDetails = useSelector((state) => state.products.ProductsData);

  const [TotalSales, setTotalSales] = useState(0);
  var counts = [],count = 0, i = 0;

  useEffect(() => {
    setReduxProductsData(ProductDetails);
    setReduxOrderData(OrderDetails);


    
for(i=0; i<ReduxOrderData.length; i++) {
    if(counts[ReduxOrderData[i].month] == undefined) {
        counts[ReduxOrderData[i].month] = 1;
        count++;
    }
}
 
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            className="w-400"

            
            options={{

    
              chart: {
                id: "basic-bar",
               
              },
              xaxis: {
                categories: ReduxOrderData?ReduxOrderData.map((value, index) => {
                  return value.month+" "+value.Year;
                }):"",
              },
            }
          
          }
            series={[
              {
                color: "#46c378",
                name: "Monthly Sales($)",
                data: ReduxOrderData?ReduxOrderData.map((value, index) => {
                  return value.total;
                }):"",
              },
            ]}
            type="bar"
          />
        </div>
      </div>
    </div>
  );
}
