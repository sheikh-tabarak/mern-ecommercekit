import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillSave,
  AiFillEdit,
} from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";

import categories from "../data/categories";
import { useDispatch, useSelector } from "react-redux";

import { updateProduct } from "../../store/actions/ProductActions";

export default function AllOrders() {
  document.title = "Order History | Dashboard";

  const [open, setOpen] = useState(false);

  const ConfirmDeletion = () => setOpen(!open);
  const [isLoading, setisLoading] = useState(false);
  const [refreshData, setrefreshData] = useState(false);


  const [Filter, setFilter] = useState({
    SearchText: "",
  });

  const [SearchText, setSearchText] = useState("");

  const [ReduxOrderData, setReduxOrderData] = useState([]);
  // const [ReduxProductsData, setReduxProductsData] = useState([]);

  const dispatch = useDispatch();

  const ProductsDatais = useSelector((state) => state.orders.OrderData);

  useEffect(() => {
    setReduxOrderData(ProductsDatais);
  }, [refreshData]);

  console.log(ReduxOrderData);

  return (
    <>
      <div className="  w-full items-center justify-between pb-4">
        <div className="w-full lg:w-max mb-4 lg:mb-0 ">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>

          <div className="relative  w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              value={Filter.SearchText}
              onChange={(e) => {
                setFilter((prevState) => ({
                  ...prevState,
                  SearchText: e.target.value,
                }));
              }}
              type="text"
              id="table-search"
              className=" w-full lg:w-max p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        {/* <div className="w-full lg:w-max mb-4 lg:mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {ReduxProductsData.length} Orders Found
        </div> */}

        {/* <select
          onChange={(e) => {
            setFilter((prevState) => ({
              ...prevState,
              Category: e.target.value,
            }));

            console.log("Value Console: " + e.target.value);
            console.log("Value Saved: " + Filter.Category);

            // console.log(Filter.Category)
          }}
          id="category"
          className="w-full lg:w-max mb-4 lg:mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value={""}>Filter by Category</option>
          {categories.map((value, index) => (
            <option value={value.category}>{value.category}</option>
          ))}
        </select> */}

        {/* <select
          onChange={(e) => {
            setFilter((prevState) => ({
              ...prevState,
              Sort: e.target.value,
            }));

            console.log("Value Console: " + e.target.value);
            console.log("Value Saved: " + Filter.Sort);
          }}
          id="sorting"
          className="w-full lg:w-max mb-4 lg:mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value={0}>Default Sorting</option>
          <option value={1}>Sort by price: low to high</option>
          <option value={2}>Sort by price: high to low</option>
          <option value={3}>Sort by title: A to Z</option>
          <option value={4}>Sort by title: Z to A</option>
          <option value={5}>Sort by stock: low to high</option>
          <option value={6}>Sort by stock: high to low</option>

          {categories.map((value, index) => (
            <option value={value.category}>{value.category}</option>
          ))}
        </select> */}

        {/* <IoMdRefreshCircle
          onClick={() => setrefreshData(!refreshData)}
          className="text-[25px] text-yellow-500 cursor-pointer"
        /> */}
        {/* <div className="w-full lg:w-max mb-4 lg:mb-0 ">
          <Link to={"/dashboard/products/new-product"}>
            <div
              // onClick={handleAddProduct}
              className=" text-center sheikhtabarak-btn-main text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
             Create a new Order
            </div>
          </Link>
        </div> */}
      </div>
      <ToastContainer />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Cutomer and Order Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Items
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {ReduxOrderData.map((value, index) => {
                if (
                  value.customer_name
                    .toLowerCase()
                    .includes(Filter.SearchText.toLowerCase())
                ) {


                 
                  //
                  return (
                    <tr
                      className={
                        "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      }
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex gap-4 items-center">
                          <div>
                            <p> {value.customer_name}</p>
                            <p className="text-xs text-gray-400">
                              <p className="pt-4 text-black">Order Details</p>
                              {value.order_items.map((val, index) => {
                                console.log("this is " + val + val.name);

                                return (
                                  <div className="border-t-[1px] my-1 py-1 flex justify-between gap-4">
                                    <p className=""> {val.name}</p>
                                    <p className=""> - </p>
                                    <p className=""> {val.quantity} </p>
                                    <p className=""> * </p>
                                    <p className=""> {val.price}</p>
                                  </div>
                                );
                              })}
                            </p>
                          </div>
                        </div>
                      </th>
                      <td>
                        {" "}
                        <span
                          className={
                            value.status === "Completed"
                              ? " bg-green-100 py-1 px-3 text-xs rounded-[20px]"
                              : value.status === "Pending"
                              ? "bg-yellow-100 py-1 px-3 text-xs rounded-[20px]"
                              : ""
                          }
                        >
                          {value.status}
                        </span>
                      </td>

                      <td className={"px-6 py-4"}>
                        {value.order_items.length}
                      </td>

                      <td className="px-6 py-4"> ${value.total}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-5">
                          {value.date}
                          {/* {UpdateProduct.id == value.id ? (
                            <AiFillSave
                              className="text-[18px] text-green-500  cursor-pointer"
                              onClick={handleUpdateProductQuantity}
                            />
                          ) : (
                            // <button >
                            //   Done
                            // </button>
                            <AiFillEdit
                              onClick={() => {
                                setUpdateProduct(value);
                              }}
                              className="text-[18px]  cursor-pointer"
                            />
                          )} */}
                          {/* <AiFillDelete
                            // onClick={() => handleDeleteProduct(value.id)}
                            className="text-[18px] text-red-500 cursor-pointer"
                          /> */}
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>

        {/* <tbody> */}
      </div>
    </>
  );
}
