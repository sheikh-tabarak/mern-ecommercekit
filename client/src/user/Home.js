import React, { useContext } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProductsPage from "./productsPage";
import Footer from "./components/footer";
import HeaderNew from "./components/HeaderNew";
import authContext from "../auth/auth.context";
export default function Home() {
  const context = useContext(authContext)

  


  document.title = "Home | ECommerce Kit";
  return (
    <>

      {/* <HeaderNew /> */}
      <Header/>
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
