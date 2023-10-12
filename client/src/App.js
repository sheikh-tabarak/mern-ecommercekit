import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Dashboard from "./admin/Dashboard";
import { useDispatch, useSelector } from "react-redux/";
import store from "./store/store";
import { setProductArchive } from "./store/actions/index";
import Home from "./user/Home";

function App() {
  const [name, setname] = useState("test");
  const isLogin = useSelector((state) => state.checkLoginApp);

  const [products, setProducts] = useState([]);
  const [refreshData, setrefreshData] = useState(false);
  const baseLink = process.env.REACT_APP_SERVER_BASE_LINK;

  useEffect(() => {
    // fetch(
    //   "https://dummyjson.com/RESOURCE/?limit=10&skip=5&select=key1,key2,key3"
    // )
    //   .then((res) => res.json())
    //   .then(console.log);

    // fetch('https://dummyjson.com/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({

    //     username: 'sheikhtabarak',
    //     password: 'sheikhtabarak',
    //     // expiresInMins: 60, // optional
    //   })
    // })
    // .then(res => res.json())
    // .then(console.log)

    /* providing token in bearer */
    // fetch('https://dummyjson.com/auth/RESOURCE', {
    //   method: 'GET', /* or POST/PUT/PATCH/DELETE */
    //   headers: {
    //     'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTY5NjM2NDE2NiwiZXhwIjoxNjk2MzY3NzY2fQ.586e0ikpmoTRnX8huPuz7_GogYmw6qrfTpNJknAUMqQ',
    //     'Content-Type': 'application/json'
    //   },
    // })
    // .then(res => res.json())
    // .then(console.log);

    const fetchProjects = async () => {
      // try {

      fetch(`${baseLink}/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    };

    fetchProjects();
  }, [refreshData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
