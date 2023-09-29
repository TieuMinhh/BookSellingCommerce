import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Pages/AdminPages/Dashboard/Dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Category from "./Pages/AdminPages/Category/Category";
import Book from "./Pages/AdminPages/Book/Book";
import Revenue from "./Pages/AdminPages/Revenue/Revenue";
import Customer from "./Pages/AdminPages/Customer/Customer";
import Order from "./Pages/AdminPages/Order/Order";
import Promotion from "./Pages/AdminPages/Promotion/Promotion";
import Login from "./Pages/Auths/Login/Login";
import SignUp from "./Pages/Auths/Signin/Signin";
// import RevenueDetail from "./Pages/RevenueDetail/RevenueDetail";

import jwtDecode from "jwt-decode";
import { AuthContextProvider } from "./Context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/Styles.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // let role = localStorage.getItem("accessToken");

  let role = localStorage.getItem("accessToken")
    ? jwtDecode(localStorage.getItem("accessToken")).role_id
    : 0;

  // console.log(role);

  // useEffect(() => {
  //   console.log("Is login: ", isLogin);
  //   setRole(
  //     localStorage.getItem("accessToken")
  //       ? jwtDecode(localStorage.getItem("accessToken")).role
  //       : 0
  //   );
  // }, []);

  return (
    <AuthContextProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <BrowserRouter>
              {role === 1 ? (
                <>
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Navbar setIsSidebar={setIsSidebar} />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/category" element={<Category />} />
                      <Route path="/book" element={<Book />} />
                      <Route path="/order" element={<Order />} />
                      <Route path="/revenue" element={<Revenue />} />
                      {/* <Route
                        path="/revenue-detail"
                        element={<RevenueDetail />}
                      /> */}
                      <Route path="/customer" element={<Customer />} />
                      <Route path="/promotion" element={<Promotion />} />
                      {/* <Route path="/setting" element={<Setting />} /> */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                    </Routes>
                  </main>
                </>
              ) : (
                <Routes>
                  <Route path="/login" element={<Login />} />
                </Routes>
              )}
            </BrowserRouter>
            <ToastContainer />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
