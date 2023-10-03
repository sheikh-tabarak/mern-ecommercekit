import React from "react";
import herobg from "../../assests/hero-bg.jpg";

export default function Hero() {
  return (
    <div
      style={{
        backgroundImage: "url(" + herobg + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="h-52 lg:h-screen px-6 lg:px-8"
    >
     
    </div>
  );
}
