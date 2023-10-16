import React, { createContext, useEffect, useState } from "react";
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
import authContext from "./auth/auth.context";
import Login from "./auth/Login";
import Dashboard from "./admin/Dashboard";
import { useDispatch, useSelector } from "react-redux/";
import store from "./store/store";
import { setProductArchive } from "./store/actions/index";
import Home from "./user/Home";
import fetchProjects from "./APIs/products";
import useRefreshToken from "./auth/useRefreshToken";

function App() {
  // const [name, setname] = useState("test");
  // const [products, setProducts] = useState([]);
  // const [refreshData, setrefreshData] = useState(false);

  const url = process.env.REACT_APP_SERVER_BASE_LINK;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const Token = localStorage.getItem("token");
  useEffect(() => {
    const validatetoken = async () => {
      await axios
        .get(`${url}/users/refresh/token`, {
          headers: {
            "x-header-token": Token,
          },
        })
        .then((response) => {
          console.log(response.data.auth);
          const isAdmin = response.data.isAdmin;
          const uid = response.data.userId;
          const usernamee = response.data.userName;
          const emaill = response.data.userEmail;
          const auth = response.data.auth;


          setUsername(usernamee);
          setEmail(emaill);
          setIsAdmin(isAdmin);
          setUserId(uid);
          setIsLoggedin(auth);

          // console.log(isLoggedin)
        })
        .catch((error) => {
          console.log(error.response);
        });
    };

    validatetoken();
  }, []);

  return (
    <>
      <authContext.Provider
        value={{
          username: username,
          email: email,
          userId: userId,
          isAdmin: isAdmin,
          token: Token,
          isLoggedin: isLoggedin,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
            {isAdmin === true ? (
              <Route path="/dashboard/*" element={<Dashboard />} />
            ) : (
              <></>
            )}
            {/* <Route path="/test/" element={"Thi is Test"}/> */}
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
    </>
  );
}

export default App;
