import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { useSelector } from "react-redux";
import fetchProducts from "../APIs/products";
import axios from "axios";
const url = process.env.REACT_APP_SERVER_BASE_LINK;

export default function ProductsPage() {
  document.title = "Shop | ECommerce Kit";
  const [ReduxProductsData, setReduxProductsData] = useState();
  const ProductsDatais = useSelector((state) => state.products.ProductsData);


  useEffect(() => {


    const fetchProdd = async ()=>{
      
      await axios
      .get(`${url}/products`, )
      .then((response) => {
        console.log(response.data);
         setReduxProductsData(response.data)
        // return response.data
      })
      .catch((error) => {
        console.log(error.response);
        return error.response
      });
    }
    // const products = fetchProducts();
// console.log(products)
   
    // setReduxProductsData(ProductsDatais);
    fetchProdd();
  },[]);
  return (
    <div className="p-8 lg:p-16 grid grid-cols-1  lg:grid-cols-4 gap-4">
      {ReduxProductsData ? (
        ReduxProductsData.map((value, index) => (
          <ProductCard
            name={value.name}
            desc={value.desc}
            image={value.image}
            category={value.category.name}
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
