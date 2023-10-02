import React, { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "../components/Widget";
import DailyTraffic from "../components/charts/DailyTraffic";
import PieChartCard from "../components/charts/PieChart";
import Donut from "../components/charts/PieChart";
import { useDispatch, useSelector } from "react-redux";
import categories from "../data/categories";
// import PieChartCard from "../components/charts/PieChartCard";
// import PieChartCard from "../components/charts/PieChartCard";

export default function RevenueOverview() {
  document.title = "Revenue Analysis | Dashboard";
  const [ReduxOrderData, setReduxOrderData] = useState([]);
  const [ReduxProductsData, setReduxProductsData] = useState([]);

  const OrderDetails = useSelector((state) => state.orders.OrderData);
  const ProductDetails = useSelector((state) => state.products.ProductsData);

  const [TotalSales, setTotalSales] = useState(0);

  let totale = 0;

  useEffect(() => {
    setReduxProductsData(ProductDetails);
    setReduxOrderData(OrderDetails);
    ReduxOrderData.map((value, index) => {
      totale = parseInt(value.total) + totale;
    });
    setTotalSales(totale);
    console.log(totale);
  });
  return (
    
    <>
      <div className="mt-3 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-3 3xl:grid-cols-6">
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
        <DailyTraffic />
        <PieChartCard />
        {/* <Donut /> */}
      </div>
    </>
  );
}
