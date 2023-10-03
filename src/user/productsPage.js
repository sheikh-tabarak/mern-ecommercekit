import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useSelector } from "react-redux";

export default function ProductsPage() {
  document.title = "Shop | ECommerce Kit";
  const [ReduxProductsData, setReduxProductsData] = useState([]);
  const ProductsDatais = useSelector((state) => state.products.ProductsData);

  useEffect(() => {
    setReduxProductsData(ProductsDatais);
  });
  return (
    <div className="p-8 lg:p-16 grid grid-cols-1  lg:grid-cols-4 gap-4">
      {ReduxProductsData ? (
        ReduxProductsData.map((value, index) => (
          <ProductCard
            name={value.name}
            desc={value.desc}
            image={value.image}
            category={value.category}
            price={value.price}
            stock={value.stock}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
