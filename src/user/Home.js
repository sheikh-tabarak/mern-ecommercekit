import React from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProductsPage from "./productsPage";

export default function Home() {
  return (
    <>
      {" "}
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
            </>
          }
        />
        <Route path="/shop" element={<ProductsPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
