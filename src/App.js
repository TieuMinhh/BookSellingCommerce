import React, { useState, useEffect, useContext } from 'react';
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
import Profile from './Pages/CustomerPages/Profile/Profife';
import ChangeInfo from './Pages/CustomerPages/ChangeInfo/ChangeInfo';
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

import Product from './Pages/ProductPage/Product';
import Cart from './Pages/CustomerPages/Cart/Cart';
import BookDetail from './Pages/CustomerPages/BookDetail/BookDetail';
import OrderPay from './Pages/CustomerPages/OrderPay/OrderPay';
import ChangePassword from './Pages/CustomerPages/ChangePassword/ChangePassword';
import HomePage from './Pages/HomePage/HomePage';
import PageUp from './Components/PageUp/PageUp';
import Publishing from './Pages/AdminPages/Publishing/Publishing';
import ProductPromotion from './Pages/AdminPages/ProductPromotion/ProductPromotion';
import { AuthContext } from './Components/AuthProvider/AuthProvider';

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [isScrollTop, setIsScrollTop] = useState(false);
    const [roleUser, setRoleUser] = useState();

    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.handleChangeRole();
        setRoleUser(authContext.roleUser);
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setIsScrollTop(true);
            } else {
                setIsScrollTop(false);
            }
        });
    }, [authContext]);

    return (
        <AuthContextProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <BrowserRouter>
                            {roleUser === 1 && (
                                <>
                                    <Sidebar isSidebar={isSidebar} />
                                    <main className="content">
                                        <Navbar setIsSidebar={setIsSidebar} />
                                        <Routes>
                                            <Route path="/admin" element={<Dashboard />} />
                                            <Route path="admin/category" element={<Category />} />
                                            <Route path="admin/book" element={<Book />} />
                                            <Route path="admin/order" element={<Order />} />
                                            <Route path="admin/revenue" element={<Revenue />} />
                                            <Route path="admin/customer" element={<Customer />} />
                                            <Route path="admin/promotion" element={<Promotion />} />
                                            <Route path="admin/promotion-product" element={<ProductPromotion />} />
                                            <Route path="admin/publishing-company" element={<Publishing />} />
                                        </Routes>
                                    </main>
                                </>
                            )}
                            {roleUser === 0 && (
                                <div className="user-layout">
                                    <Header />
                                    <Routes>
                                        <Route path="/" exact element={<HomePage />} />
                                        <Route path="/product" exact element={<Product />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/book/detail" element={<BookDetail />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/order-pay" element={<OrderPay />} />
                                        <Route path="/change-info" element={<ChangeInfo />} />
                                        <Route path="/change-password" element={<ChangePassword />} />
                                        <Route path="/order-history" element={<OrderHistory />} />
                                        <Route path="/my-voucher" element={<MyVoucher />} />
                                    </Routes>
                                    {isScrollTop && <PageUp />}
                                    <Footer />
                                </div>
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
