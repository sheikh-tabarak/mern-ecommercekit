import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProductsPage from "./shop.page";
import Footer from "./components/footer";
import Loading from "../loading";
import Cart from "./popups/cart";
export default function Home() {
  const [isLoading,setisLoading] = useState(true)

  useEffect(()=>{
    console.log('refresh')
    setisLoading(false)


  },[])

  document.title = "Home | ECommerce Kit";
  return (
    <>
    {isLoading?<Loading/>:
        <>
          <Header />
        {/* <Cart/> */}

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
      }
    </>
  );
}
