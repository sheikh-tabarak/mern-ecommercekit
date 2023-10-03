import React, { useEffect, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "../components/Widget";
import PieChartCard from "../components/charts/PieChart";
import { useSelector } from "react-redux";
import categories from "../data/categories";
import BarChart from "../components/charts/BarChart";

export default function RevenueOverview() {
  document.title = "Revenue Analysis | Dashboard";
  const [ReduxOrderData, setReduxOrderData] = useState([]);
  const [ReduxProductsData, setReduxProductsData] = useState([]);

  const OrderDetails = useSelector((state) => state.orders.OrderData);
  const ProductDetails = useSelector((state) => state.products.ProductsData);

  const [TotalSales, setTotalSales] = useState(0);
  const [TotalAverage, setTotalAverage] = useState(0.0);


  let totale = 0;

  useEffect(() => {
    setReduxProductsData(ProductDetails);
    setReduxOrderData(OrderDetails);
    ReduxOrderData.map((value, index) => {
      totale = parseInt(value.total) + totale;
    });
    setTotalSales(totale);
    setTotalAverage(TotalSales/ReduxOrderData.length);
    console.log(totale);


  });
  return (
    <>
      <div className="mt-3 mb-4 grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7 text-[#46c378]" />}
          title={"Total Orders"}
          subtitle={ReduxOrderData.length}
        />
        <Widget
          icon={<MdBarChart className="h-6 w-6 text-[#46c378]" />}
          title={"Total Sales"}
          subtitle={"$" + TotalSales}
        />
        <Widget
          icon={<IoDocuments className="h-7 w-7 text-[#46c378]" />}
          title={"Total Categories"}
          subtitle={categories.length}
        />

        <Widget
          icon={<IoDocuments className="h-7 w-7 text-[#46c378]" />}
          title={"Total Products"}
          subtitle={ReduxProductsData.length}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        {/* <DailyTraffic /> */}

        <div className="items-center bg-white rounded-[20px] md:grid-cols-2 p-[20px]">
          <div className="flex flex-row justify-between">
            <div className="ml-1 pt-2">
              <p className="text-sm font-medium leading-4 text-gray-600">
                Total Monthly Average
              </p>
              <p className="text-[34px] font-bold text-navy-700 dark:text-white">
               ${TotalAverage}


                <span className="text-sm font-medium leading-6 text-gray-600">
                 &nbsp; / month
                </span>
              </p>
            </div>
            <div className="mt-2 flex items-start">
              <div className="flex items-center text-sm text-green-500">
                <MdArrowDropUp className="h-5 w-5" />
                <p className="font-bold"> +2.45% </p>
              </div>
            </div>
          </div>
          <BarChart />
        </div>

        <div className="bg-white items-center rounded-[20px] md:grid-cols-2 p-[20px]">
          <div className="flex flex-row justify-between">
            <div className="ml-1 pt-2">
              <p className="text-sm font-medium leading-4 text-gray-600">
                Categories wise Filteration
              </p>
              <p className="text-[34px] font-bold text-navy-700 dark:text-white">
               {categories.length}
                <span className="text-sm font-medium leading-6 text-gray-600">
                &nbsp;   Total
                </span>
              </p>
            </div>
            <div className="mt-2 flex items-start">
              <div className="flex items-center text-sm text-green-500">
               
              </div>
            </div>
          </div>
          <div className="w-[350px]">
              <PieChartCard />
          </div>
        
        </div>
      </div>
    </>
  );
}
