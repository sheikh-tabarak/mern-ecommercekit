import React from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProductsPage from "./productsPage";
import Footer from "./components/footer";

export default function Home() {
  document.title = "Home | ECommerce Kit";
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
      <Footer />
    </>
  );
}
