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


function App() {
  const [name, setname] = useState("test");
  const isLogin = useSelector((state) => state.checkLoginApp);

  const [products, setProducts] = useState([]);
  const [refreshData, setrefreshData] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProducts(products);
        store.dispatch(setProductArchive(products));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [refreshData]);


  

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<div>Website</div>} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
