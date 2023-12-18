import React, {useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Redirect,
} from "react-router-dom";
import "./App.css";
import axios from "axios";
import { AxiosError } from "axios";
import Login from "./auth/Login";
import Dashboard from "./admin/Dashboard";
import { useDispatch, useSelector } from "react-redux/";
import store from "./store/store";
import { setProductArchive } from "./store/actions/index";
import Home from "./user/home.page";
import fetchProducts from "./APIs/products";
import Loading from "./loading";
import { loginUser } from "./store/actions/LoginActions";
import validatetoken from "./auth/validateToken";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoading, setisLoading] = useState(false);
  // const [refresh_username, setUsername] = useState("");
  // const [refresh_email, setEmail] = useState("");
  // const [refresh_userId, setUserId] = useState("");
  // const [refresh_isAdmin, setIsAdmin] = useState(false);
  // const [refresh_isLoggedin, setIsLoggedin] = useState(false);
  const [Refresh, setRefresh] = useState(false);

  const emailis = useSelector((state) => state.app.email);
  const isAdmin = useSelector((state) => state.app.isAdmin);
  const isLoggedin = useSelector((state) => state.app.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    setRefresh(!Refresh);
  }, []);

  useEffect(() => {
    const loadTokenData = async () => {
      await validatetoken(dispatch);
      setisLoading(false);
    };
    loadTokenData();
  }, [Refresh]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {/* <h1> {emailis + "is now " + isAdmin + "islogin ==> " + isLoggedin}</h1> */}

      {/* <authContext.Provider
        value={{
          username: username,
          email: email,
          userId: userId,
          isAdmin: isAdmin,
          token: Token,
          isLoggedin: isLoggedin,
        }}
      > */}

      {/* <StoreProvider> */}
      {/* <ErrorBoundary> */}

      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home/>} />
          <Route
            path="/login/*"
            element={<Login setRefresh={setRefresh} Refresh={Refresh} />}
          />
          {/* {isAdmin === true && isLoggedin === true ? ( */}

          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* ) : ( */}
          <></>
          {/* )} */}
          {/* <Route path="/test/" element={"Thi is Test"}/> */}
        </Routes>
      </BrowserRouter>

      <ToastContainer />
      {/* </ErrorBoundary> */}

      {/* </StoreProvider> */}
      {/* </authContext.Provider> */}
    </>
  );
}

export default App;
