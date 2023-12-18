import React from "react";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="flex justify-center text-gray-300 ">
      <div className="">
        <div className="flex justify-center text-[140px] ">
          {" "}
          <BsCartX />{" "}
        </div>

        {/* <div className=" py-5"> */}
        <p className="text-xl py-5">Your cart is currently empty.</p>
        {/* </div> */}

        {/* <div> */}

        <div className="flex justify-center text-[140px] ">
        
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}
