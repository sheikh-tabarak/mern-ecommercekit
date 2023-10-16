import React, { useContext } from "react";
import herobg from "../../assests/hero-bg.jpg";
import authContext from "../../auth/auth.context";

export default function Hero() {

  const context = useContext(authContext)
  return (
    <div
      style={{
        backgroundImage: "url(" + herobg + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="h-52 lg:h-screen px-6 lg:px-8"
    >

      This is Test + {context.email} {context.username} {context.userId} {context.isAdmin?"true":"false"}
     
    </div>
  );
}
