import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { Link } from "react-router-dom";
import {
  AiFillDelete,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillSave,
  AiFillEdit,
} from "react-icons/ai";

import { IoMdRefreshCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import categories from "../data/categories";
import { useDispatch, useSelector } from "react-redux";

import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../store/actions/ProductActions";


export default function AllProducts() {
  document.title = "All Products | Dashboard";

  const [open, setOpen] = useState(false);
  const ConfirmDeletion = () => setOpen(!open);
  const [isLoading, setisLoading] = useState(false);
  const [refreshData, setrefreshData] = useState(false);

  const [Filter, setFilter] = useState({
    SearchText: "",
    Category: "",
    Sort: 0,
  });

  const [Sort, setSort] = useState(0);

  const [SearchText, setSearchText] = useState("");

  const [TechList, setTechList] = useState([]);

  const [ReduxProductsData, setReduxProductsData] = useState([]);
  const dispatch = useDispatch();

  const ProductsDatais = useSelector((state) => state.products.ProductsData);

  const [UpdateProduct, setUpdateProduct] = useState({
    id: undefined,
    name: "",
    desc: "",
    category: 0,
    price: undefined,
    stock: 0,
    image: "",
  });

  const handleDeleteProduct = (e) => {
    dispatch(deleteProduct(e));
    setrefreshData(!refreshData);
  };

  const handleUpdateProductQuantity = () => {
    dispatch(updateProduct(UpdateProduct));
    setrefreshData(!refreshData);

    toast.success(
      <>
        <p>Quantity Updated Successfully</p>
        {/* <p className="leading-relaxed text-sm/[12px]"></p> */}
      </>,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "bg-white dark:bg-gray-900",
        autoClose: 5000,
      }
    );

    setUpdateProduct({
      id: undefined,
      name: "",
      desc: "",
      category: 0,
      price: undefined,
      stock: 0,
      image: "",
    });
  };

  useEffect(() => {
    setReduxProductsData(ProductsDatais);

    ReduxProductsData.map((value, index) => {
      if (value.stock === 0) {

        toast.error(
          <>
            <p>{value.name} is out of Stock now</p>
          </>,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "bg-white dark:bg-gray-900",
            autoClose: 5000,
          }
        );
      } else if (value.stock >= 1 && value.stock < 3) {
        toast.warn(
          <>
            <p>{value.name} is running out of Stock</p>
          </>,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "bg-white dark:bg-gray-900",
            autoClose: 5000,
          }
        );
      }
    });
  }, [refreshData]);

  console.log(ReduxProductsData);

  return isLoading === true ? (
    <Loading />
  ) : (
    <>
      {/* <ConfirmationDialog open={true}/> */}
      <div className=" lg:flex items-center justify-between pb-4">
        <div className="w-full lg:w-max mb-4 lg:mb-0 ">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>

          <div className="relative">
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
        <div className="w-full lg:w-max mb-4 lg:mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {ReduxProductsData.length} Products Found
        </div>

        <select
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
        </select>

        <select
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

          {/* {categories.map((value, index) => (
            <option value={value.category}>{value.category}</option>
          ))} */}
        </select>

        <IoMdRefreshCircle
          onClick={() => setrefreshData(!refreshData)}
          className="text-[25px] text-yellow-500 cursor-pointer"
        />
        <div className="w-full lg:w-max mb-4 lg:mb-0 ">
          <Link to={"/dashboard/products/new-product"}>
            <div
              // onClick={handleAddProduct}
              className=" text-center sheikhtabarak-btn-main text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Add New Product
            </div>
          </Link>
        </div>
      </div>
      <ToastContainer />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ReduxProductsData.sort(
                Filter.Sort == 0
                  ? (a, b) => (a.id > b.id ? 1 : -1)
                  : Filter.Sort == 1
                  ? (a, b) => (a.price > b.price ? 1 : -1)
                  : Filter.Sort == 2
                  ? (a, b) => (a.price < b.price ? 1 : -1)
                  : Filter.Sort == 3
                  ? (a, b) =>
                      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                  : Filter.Sort == 4
                  ? (a, b) =>
                      a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
                  : Filter.Sort == 5
                  ? (a, b) => (a.stock > b.stock ? 1 : -1)
                  : Filter.Sort == 6
                  ? (a, b) => (a.stock < b.stock ? 1 : -1)
                  : (a, b) => (a.id > b.id ? 1 : -1)
              ).map((value, index) => {
                if (
                  value.name
                    .toLowerCase()
                    .includes(Filter.SearchText.toLowerCase()) &&
                  categories[value.category].category.includes(Filter.Category)
                ) {
                  //
                  return (
                    <tr
                      className={
                        value.stock <= 0
                          ? "items-center opacity-[0.4] bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          : "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      }
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex gap-4 items-center">
                          <img
                            class="w-10 h-10 rounded-full "
                            src={value.image}
                            alt={value.name}
                          />

                          <div>
                            <p> {value.name}</p>
                            <p className="text-xs text-gray-400">
                              {" "}
                              {value.desc}
                            </p>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        {" "}
                        {categories[value.category].category}
                      </td>

                      {UpdateProduct.id == value.id ? (
                        <td
                          className={
                            value.stock < 3
                              ? "px-6 py-4 text-red-500 "
                              : "px-6 py-4"
                          }
                        >
                          {" "}
                          <div className="flex gap-4">
                            <AiFillMinusCircle
                              className="text-[18px] text-red-500  cursor-pointer"
                              onClick={() => {
                                if (UpdateProduct.stock > 0) {
                                  setUpdateProduct((prevState) => ({
                                    ...prevState,
                                    stock: UpdateProduct.stock - 1,
                                  }));
                                }
                              }}
                            />
                            {/* <p>-</p> */}
                            <p> {UpdateProduct.stock}</p>

                            <AiFillPlusCircle
                              className="text-[18px] text-green-500  cursor-pointer"
                              onClick={() => {
                                setUpdateProduct((prevState) => ({
                                  ...prevState,
                                  stock: UpdateProduct.stock + 1,
                                }));
                              }}
                            />
                          </div>
                        </td>
                      ) : (
                        <td
                          className={
                            value.stock < 3
                              ? "px-6 py-4 text-red-500 "
                              : "px-6 py-4"
                          }
                        >
                          {" "}
                          {value.stock}
                        </td>
                      )}

                      <td className="px-6 py-4"> ${value.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-5">
                          {UpdateProduct.id == value.id ? (
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
                          )}
                          <AiFillDelete
                            onClick={() => handleDeleteProduct(value.id)}
                            className="text-[18px] text-red-500 cursor-pointer"
                          />
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
