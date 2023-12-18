import React, { useContext, useEffect } from "react";
import logo from "../assests/logo/logo.png";
import { useState } from "react";
import "../styles/sheikhtabarak.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
import { loginUser } from "../slices/authSlice";
import { AxiosError } from "axios";
import axios from "axios";
// import {
//   updateEmail,
//   updateIsAdmin,
//   updateIsLoggedin,
//   updateUserId,
//   updateUsername,
// } from "../store/actions/loginStatusAction";
import { toast } from "react-toastify";
import validatetoken from "./validateToken";

export default function Login(props) {
  document.title = "Login | Ecommerce Kit";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = process.env.REACT_APP_SERVER_BASE_LINK;
  const [isLoading, setisLoading] = useState(true);
  const [isLoggedin, setisLoggedin] = useState(false);
  const [Refresh, setRefresh] = useState(false);


  const isLoggedinfromRedux = useSelector((state) => state.app.isLoggedIn);
  const usernamefromRedux = useSelector((state) => state.app.username);


  const [error, setError] = useState({
    status: false,
    message: "Error",
  });
  const Token = localStorage.getItem("token");

  useEffect(() => {
    validatetoken(dispatch);
    if (isLoggedinfromRedux) {
      navigate("/");
      toast.success(
        <>
          <p>Logged in as {usernamefromRedux} </p>
          {/* <p className="leading-relaxed text-sm/[12px]"></p> */}
        </>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "bg-white dark:bg-gray-900",
          autoClose: 5000,
        }
      );

    }
    validatetoken();
    setisLoading(false);

  }, [Refresh]);

  // useEffect(() => {

  //   try {
  //     // const test = localStorage.getItem("token");

  //     if (!test) {
  //       console.log("This is token : " + test);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  async function checkLogin() {
    // localStorage.setItem("test", "this is local ok storage");

    if (!user.email) {
      setError({
        status: true,
        message: "Email field can't be Empty",
      });
    } else if (!user.password) {
      setError({
        status: true,
        message: "Password field can't be Empty",
      });
    } else {
      setisLoading(true);

      const token = await axios
        .post(`${url}/users/login`, {
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          setRefresh(!Refresh);
          setisLoading(false);

          return response;
        })
        .catch((error) => {
          // console.log(error.response.data);
          setisLoading(false);
         
          const message = error.response?error.response.data:"Server didn't responds";
         
          try {
             setError({
            status: true,
            message:message,
          });
          } catch (error1) {
            console.log(error1)
            
          }

         

          return error;
        });
    }
  }

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isLogin, setisLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(user);
    const data = checkLogin();

    // data.data.token?console.log(data.data.token):console.log("Nope");

    // data.data.token?localStorage.setItem("token", data.data.token):localStorage.setItem("token", undefined);

    // // const data = await login;
  };

  function Abort() {
    setError({
      status: false,
      message: "",
    });
  }

  return isLoading ? (
    <Loading />
  ) : (
    <section className="bg-gray-50 dark:bg-gray-900">
      {isLoggedinfromRedux ? "True" : "False"}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Link
              to={"/"}
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="h-20 mr-2" src={logo} alt="logo" />
            </Link>

            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </p>

            {error.status === true ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error.message}</span>

                <span
                  onClick={Abort}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            ) : (
              <div></div>
            )}

            <form
              onSubmit={
                // e.preventDefault(), // {(e)=>
                handleSubmit
              }
              // }
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>

                <input
                  value={user.email}
                  onChange={(value) => {
                    setUser({
                      email: value.target.value,
                      password: user.password,
                    });

                    setError({
                      status: false,
                      message: "No message",
                    });

                    console.log(user.email);
                  }}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  autoComplete=""
                  value={user.password}
                  onChange={(value) => {
                    setError({
                      status: false,
                      message: "No message",
                    });

                    setUser({
                      password: value.target.value,
                      email: user.email,
                    });
                    console.log(user.password);
                  }}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <div className="flex gap-3 text-gray-500 dark:text-gray-300 text-left text-sm">
                <div>
                  Username:{" "}
                  <kbd className="bg-gray-100 p-1 rounded mx-2">demo</kbd>{" "}
                </div>
                <div>
                  Password:{" "}
                  <kbd className="bg-gray-100 p-1 rounded mx-2"> demo</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to={"/"}
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Visit website
                </Link>
              </div>

              <button
                // onClick={
                // () =>
                // ()=>handleSubmit
                // {
                // e.preventDefault();

                // const handleSubmit = (e) => {
                //   e.preventDefault();

                // console.log(user);
                // dispatch(loginUser(user));

                // console.log(dispatch(loginUser(user)));

                // };

                // for (let index = 0; index < UsersData.length; index++) {
                //   if (user.username === UsersData[index].username) {
                //     for (
                //       let newindex = 0;
                //       newindex < UsersData.length;
                //       newindex++
                //     ) {
                //       if (user.password === UsersData[newindex].password) {
                //         setisLogin(true);
                //       } else {
                //         setError({
                //           status: true,
                //           message:
                //             'Password for "' + user.username + '" is Wrong',
                //         });
                //       }
                //     }
                //   } else {
                //     setError({
                //       status: true,
                //       message: "No user Exists",
                //     });
                //   }
                // }

                // if (user.username === "demo" && user.password === "demo") {
                //   navigate("/dashboard/overview");
                // } else {
                //   setError({
                //     status: true,
                //     message: "Username or Password is inncorrect",
                //   });
                // }
                // }
                className=" sheikhtabarak-btn-main block w-full rounded-md  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
              >
                Login
                {/* {auth.loginStatus === "pending" ? "Submitting..." : "Login"} */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
