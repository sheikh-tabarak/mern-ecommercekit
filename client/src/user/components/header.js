import { Link, useNavigate } from "react-router-dom";
import logo from "../../assests/logo/logo.png";
import React, { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import {
  FaSignOutAlt,
  FaList,
  FaUserAlt,
  FaSignInAlt,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLoggedin } from "../../store/actions/loginStatusAction";
import validatetoken from "../../auth/validateToken";
import { toast } from "react-toastify";
import Cart from "../popups/cart";

const navigationLinks = {
  home: {
    Label: "Home",
    Link: "/",
  },
  shop: {
    Label: "Shop",
    Link: "/shop",
  },
  account: {
    Label: "My Account",
    Link: "/account",
  },
  cart: {
    Label: "Cart",
    Link: "/cart",
  },
};

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [navbar, setNavbar] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const emailis = useSelector((state) => state.app.email);
  const username = useSelector((state) => state.app.username);
  const userId = useSelector((state) => state.app.userId);
  const isAdmin = useSelector((state) => state.app.isAdmin);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const [AccountBox, setAccountBox] = useState(false);
  const [openCart, setopenCart] = useState(false)


  useEffect(() => {
    const loadTokenData = async () => {
      await validatetoken(dispatch);
      setisLoading(false);
    };

    loadTokenData();
  }, []);

  function handleLogout() {
    // const dispatch = useDispatch();
    localStorage.removeItem("token");
    console.log("Logged out");
    dispatch(updateIsLoggedin(false));
    navigate("/login");
    setAccountBox(false);
    toast.error(
      <>
        <p>Logged out Successfully</p>
        {/* <p className="leading-relaxed text-sm/[12px]"></p> */}
      </>,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "bg-white dark:bg-gray-900",
        autoClose: 5000,
      }
    );
  }

  return (

    <>
    <Cart Open={openCart} setOpen={setopenCart}/>
    
    <nav className="w-full bg-white shadow">
      <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 ">
            <Link to={"/"}>
              <a className="flex items-center justify-between mr-4">
                <img className="h-12" src={logo} alt="logo" />
              </a>
            </Link>
            <div className="md:hidden">
              {/* <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              > */}
              {/* {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )} */}
              {/* </button> */}
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:w-[900px] lg:pr-10">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full px-4 py-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#4DD583]  focus:border-[#4DD583]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#4DD583]  dark:focus:border-[#4DD583] "
                placeholder="Search Product and Categories..."
                required=""
              />
              <button
                type="submit"
                className="text-white absolute right-0 bottom-0 top-0 bg-[#4DD583] hover:bg-[#4DD583] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center items-center  md:block md:pb-0 md:mt-0 ${"block"}`}
          >
            <ul className="lg:w-content lg:static lg:bg-white  flex gap-4 items-center justify-center text-sm font-medium text-gray-900 dark:text-white ">
              <li className="text-gray-600 hover:text-[#4DD583]">
                <Link to={"/shop"}>
                  <FaStore className="text-[22px] " />
                </Link>
              </li>

              <li className="text-gray-600 hover:text-[#4DD583]">
                <Link >
                  <FaShoppingCart onClick={()=>setopenCart(true)} className="text-[22px] " />
                </Link>
              </li>
              <div onClick={() => setAccountBox(false)} className=
              {`${
                AccountBox ? `` : `hidden `
              } fixed bg-red-500 top-0 bottom-0 right-0 left-0 opacity-0`}></div>
              <li className="text-gray-600 hover:text-[#4DD583] z-[10] ">
                <Link to={"#"}>
                  <div
                    className="relative"

                    // onPointerLeave={() => setAccountBox(false)}
                  >
                    {!isLoggedIn ? (
                      <Link to={"/login"}>
                        <FaSignInAlt className="text-[24px]" />{" "}
                      </Link>
                    ) : (
                      <BiSolidUserCircle
                        onClick={() => setAccountBox(!AccountBox)}
                        className="text-[24px] "
                      />
                    )}

                    <div
                      id="dropdown "
                      className={`z-[50] ${
                        AccountBox ? `` : `hidden`
                      } absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 `}
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        {
                          <>
                            <li>
                              <a
                                href="#"
                                className="flex gap-2  items-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <FaUserAlt /> My Account
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex gap-2 items-center  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <FaList /> My Orders
                              </a>
                            </li>
                            <li>
                              <Link
                                onClick={() => handleLogout()}
                                // to={'/logindd'}
                                className="flex gap-2 items-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <FaSignOutAlt /> Logout
                              </Link>
                            </li>
                          </>
                        }
                      </ul>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
                        </>
  );
}
