import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Pages/AdminPages/Dashboard/Dashboard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Category from './Pages/AdminPages/Category/Category';
import Book from './Pages/AdminPages/Book/Book';
import Revenue from './Pages/AdminPages/Revenue/Revenue';
import Customer from './Pages/AdminPages/Customer/Customer';
import Order from './Pages/AdminPages/Order/Order';
import Promotion from './Pages/AdminPages/Promotion/Promotion';
import Login from './Pages/Auths/Login/Login';
import SignUp from './Pages/Auths/Signin/Signin';
import Profile from './Pages/CustomerPages/Profile/Profife';
import ChangeInfo from './Pages/CustomerPages/ChangeInfo/ChangeInfo';
import ChangeAddress from './Pages/CustomerPages/ChangeAddress/ChangeAddress';
import OrderHistory from './Pages/CustomerPages/OrderHistory/OrderHistory';
import MyVoucher from './Pages/CustomerPages/MyVoucher/MyVoucher';

import jwtDecode from 'jwt-decode';
import { AuthContextProvider } from './Context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

import HomePage from './Pages/HomePage/Home';
import Cart from './Pages/CustomerPages/Cart/Cart';
import BookDetail from './Pages/CustomerPages/BookDetail/BookDetail';

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    // let role = localStorage.getItem("accessToken");

    // let role = localStorage.getItem("accessToken")
    //   ? jwtDecode(localStorage.getItem("accessToken")).role_id
    //   : 0;

    let role = 0;

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
                                            <Route path="/customer" element={<Customer />} />
                                            <Route path="/promotion" element={<Promotion />} />
                                            {/* <Route path="/setting" element={<Setting />} /> */}
                                            <Route path="/login" element={<Login />} />
                                            <Route path="/signup" element={<SignUp />} />
                                        </Routes>
                                    </main>
                                </>
                            ) : (
                                <div className="user-layout">
                                    {/* <Routes>
                    <Route path="/login" element={<Login />} />
                  </Routes> */}
                                    <Header />
                                    <Routes>
                                        <Route path="/" exact element={<HomePage />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<SignUp />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/book/detail" element={<BookDetail />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/change-info" element={<ChangeInfo />} />
                                        <Route path="/change-address" element={<ChangeAddress />} />
                                        <Route path="/order-history" element={<OrderHistory />} />
                                        <Route path="/my-voucher" element={<MyVoucher />} />

                                        {/* <Route path="/hero" element={<Hero />} />
                <Route path="/hero/detail" element={<HeroDetail />} />
                <Route path="/academy" element={<Hero />}>
                  <Route path="introduce" element={<Introduce />} />

                </Route>
                <Route path="/skin" element={<Skin />} />
                <Route path="/skin/detail" element={<SkinDetail />} /> */}
                                    </Routes>
                                    <Footer />
                                </div>
                            )}
                        </BrowserRouter>
                        {/* <Footer /> */}

                        <ToastContainer />
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </AuthContextProvider>
    );
}

export default App;
