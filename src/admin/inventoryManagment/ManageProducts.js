import React from "react";
import AllProducts from "./allProducts";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CreateNewProduct from "./CreateNewProduct";
import AllOrders from "./allOrders";

export default function ManageProducts() {
  return (
    <Routes>
      <Route path="/" element={<AllProducts />}></Route>
      <Route path="/orders" element={<AllOrders />}></Route>
      <Route path="/new-product" element={<CreateNewProduct />}></Route>
    </Routes>
  );
}
