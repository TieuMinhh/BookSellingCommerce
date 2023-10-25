import React, { useState, useEffect, useContext } from 'react';
import './Header.scss';
import LogoPage from '../../Assets/img/FahaShopBe.png';
import { Link, useNavigate } from 'react-router-dom';
import MyLoginModal from '../../Pages/Auths/Auths/Auths';
import VietNamFlag from '../../Assets/img/vietnam.png';
import PLatinum from '../../Assets/svg/platinum.svg';
import IconMenu from '../../Assets/img/icon-menu.png';
import axios from '../../api/axios';
import { getToken } from '../../Services/Token';
import useDebounce from '../../api/useDebounce';
import { NotifyModalFail } from '../NotifyModalFail/NotifyModalFail';
import { NotifyModalSuccess } from '../NotifyModalSuccess/NotifyModalSuccess';
import { CountCartContext } from '../CountCartProvider/CountCartProvider';

export default function Header() {
    const [listCart, setListCart] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [searchName, setSearchName] = useState('');

    const [isNotiSuccess, setIsNotiSuccess] = useState(false);
    const [isNotiFail, setIsNotiFail] = useState(false);
    const [detailNoti, setDetailNoti] = useState('');
    const [detailNotiSecond, setDetailNotiSecond] = useState('');
    const [activeTab, setAcTiveTab] = useState('');

    const debouncedValue = useDebounce(searchName, 500);

    const countCartContext = useContext(CountCartContext);

    const navigate = useNavigate();
    const [shouldSearch, setShouldSearch] = useState(false);

    useEffect(() => {
        const searchProduct = async () => {
            try {
                const result = await axios.post(axios.defaults.baseURL + '/search-product', {
                    name: debouncedValue,
                });

                // Chuyển hướng đến trang product cùng với kết quả tìm kiếm
                if (shouldSearch) {
                    navigate(`/product?search-product=${debouncedValue}`, {
                        state: { searchResult: result.data.message },
                    });
                }
                setShouldSearch(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        searchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, navigate]);

    const handleInputChange = (e) => {
        setSearchName(e.target.value);
        setShouldSearch(true);
    };

    const handleCategoryClick = async (item) => {
        try {
            const result = await axios.post(axios.defaults.baseURL + '/search-product-by-id-category', {
                id_category: item.id_category,
            });

            // Chuyển hướng đến trang product cùng với kết quả tìm kiếm
            navigate(`/product?category=${item.id_category}`, { state: { searchResult3: result.data.message } });
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const [show, setShow] = useState(false);

    const handleShow = (e) => {
        setShow(true);
    };
    // useEffect(() => {
    //     setShow(!location.state?.isLogin);
    //     console.log('IsLogin: ', location.state?.isLogin);
    // }, [location.state?.isLogin]);

    const handleClose = () => setShow(false);

    const handleLoginSuccess = () => {
        // Gọi hàm này sau khi đăng nhập thành công để đóng modal.
        handleClose();
    };

    async function getListProduct() {
        try {
            let token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const result = await axios.post(axios.defaults.baseURL + `/account/cart`);
            setListCart(result?.data.list);
        } catch (error) {}
    }

    async function getListCategory() {
        try {
            let result = await axios.get(axios.defaults.baseURL + `/category?id=ALL`);
            setListCategory(result?.data.listCategory);
        } catch (error) {}
    }

    useEffect(() => {
        getListCategory();
        getListProduct();
    }, []);

    return (
        <div className="header">
            <div className="topbar row">
                <div className="topbar-left col">
                    <p className="open"> Mở cửa: 7h30 đến 21h30, T7 và Chủ nhật 8h đến 22h</p>
                </div>
                <div className="topbar-right col">
                    <div className="topbar-right-list">
                        <div className="topbar-right-list-item">
                            <i className="fa-solid fa-star"></i>
                            <a href="https://www.thegioididong.com/mua-online-gia-re#game">Khuyến mãi hot</a>
                        </div>
                        <div className="topbar-right-list-item">
                            <i className="fa-solid fa-location-pin"></i>
                            <a href="https://www.thegioididong.com/sieu-thi-the-gioi-di-dong/ho-chi-minh">
                                Hệ thống cửa hàng
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mid-header">
                <div className="container-header row grid wide">
                    <div className="container-header-1 col" style={{ display: 'flex' }}>
                        <Link to="/">
                            <img src={LogoPage} alt="" style={{ width: '200px' }}></img>
                        </Link>
                        <div
                            className="cover-img-menu"
                            onClick={() => {
                                navigate('/product');
                            }}
                        >
                            {/* <Link to="/product"> */}
                            <img src={IconMenu} alt="" className="icon-menu-header" />
                            <i className="down-menu-icon fa-solid fa-angle-down"></i>
                            {/* </Link> */}
                            <div className="modal-wrapper-cate" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-container-cate">
                                    <p className="modal-title-cate">
                                        <i className="fa-regular fa-bookmark" style={{ marginRight: '16px' }}></i>Danh
                                        mục sản phẩm
                                    </p>

                                    {listCategory &&
                                        listCategory.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCategoryClick(item);
                                                    }}
                                                >
                                                    <p className="modal-item-cate">
                                                        <i
                                                            className="fa-solid fa-book-open"
                                                            style={{ marginRight: '16px' }}
                                                        ></i>{' '}
                                                        {item && item?.name_category}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-header-2 col">
                        <div className="header-search">
                            <input
                                type="text"
                                placeholder="Nhập để tìm kiếm ..."
                                value={searchName}
                                onChange={handleInputChange}
                            ></input>
                            <i className="icon fa fa-search"></i>
                        </div>
                    </div>

                    <div className="container-header-3 col">
                        <Link to="/cart" className="first">
                            <div className="header-list">
                                <b>12</b>
                                <i className="fa-regular fa-bell"></i>
                                <p>Thông báo</p>
                            </div>
                        </Link>

                        <Link to="/cart" className="first">
                            <div className="header-list">
                                {/* {listCart?.length > 0 && <b>{listCart && listCart?.length}</b>} */}
                                {countCartContext.countCart && <b>{countCartContext.countCart}</b>}

                                <i className="fa-solid fa-cart-shopping"></i>
                                <p>Giỏ hàng</p>
                            </div>
                        </Link>

                        <div className="second">
                            <div className="header-list">
                                <div className="menu-header">
                                    {!localStorage.getItem('accessToken') ? (
                                        <div className="wrapper-content-menu">
                                            <button
                                                onClick={() => {
                                                    handleShow();
                                                    setAcTiveTab('tab1');
                                                }}
                                                style={{
                                                    backgroundColor: '#C92127',
                                                    color: '#fff',
                                                    borderColor: 'transparent',
                                                }}
                                                className="btn-login"
                                            >
                                                Đăng nhập
                                            </button>

                                            <button
                                                onClick={() => {
                                                    handleShow();
                                                    setAcTiveTab('tab2');
                                                }}
                                                style={{
                                                    borderColor: '#C92127',
                                                    color: '#C92127',
                                                    backgroundColor: '#fff',
                                                }}
                                                className="btn-login"
                                            >
                                                Đăng ký
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="wrapper-menu-logged">
                                            <li>
                                                <Link to="/profile">
                                                    <img src={PLatinum} alt="" />
                                                    <div style={{ display: 'inline-block' }}>
                                                        <span className="user-name">
                                                            Ming Xiao<br></br>
                                                        </span>
                                                        <span className="desp-name">Thành viên của fahasa</span>
                                                    </div>
                                                    <div className="coutinue-icon">
                                                        <i
                                                            style={{
                                                                position: 'absolute',
                                                                color: '#000',
                                                                lineHeight: '48px',
                                                                right: '18px',
                                                            }}
                                                            className="fa-solid fa-chevron-left fa-rotate-180"
                                                        ></i>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/order-history">
                                                    <span className="user-name">
                                                        <i className="fa-regular fa-clipboard"></i> Đơn hàng của tôi
                                                    </span>{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/favourite">
                                                    <span className="user-name">
                                                        <i className="fa-regular fa-heart"></i> Sản phẩm yêu thích
                                                    </span>{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/my-voucher">
                                                    <span className="user-name">
                                                        <i className="fa-solid fa-ticket"></i> Wallet Voucher
                                                    </span>{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/account-fpoint">
                                                    <span className="user-name">
                                                        <i className="fa-solid fa-f"></i> Tài khoản F-point
                                                    </span>{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/"
                                                    onClick={() => {
                                                        localStorage.removeItem('accessToken');
                                                        setDetailNoti(`Ngài đã đăng xuất thành công!`);
                                                        setDetailNotiSecond('Hẹn gặp lại! ');
                                                        setIsNotiSuccess(true);
                                                    }}
                                                >
                                                    <span className="user-name">
                                                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Thoát
                                                        tài khoản
                                                    </span>
                                                </Link>
                                            </li>
                                        </div>
                                    )}
                                </div>
                                <b>10</b>
                                <i className="fa-regular fa-user"></i>
                                <p>Tài khoản</p>
                            </div>
                        </div>

                        <div className="header-list">
                            <div className="cover-img-vietnam">
                                <img src={VietNamFlag} alt="vietnam" />
                                <span className="fa-solid fa-angle-down"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="hr" />

            <MyLoginModal
                isLogin={true}
                show={show}
                handleClose={handleClose}
                handleLoginSuccess={handleLoginSuccess}
                active={activeTab}
            />

            <div onClick={() => setIsNotiFail(false)}>
                <NotifyModalFail isFail={isNotiFail} detailNoti={detailNoti} />
            </div>
            <div onClick={() => setIsNotiSuccess(false)}>
                <NotifyModalSuccess
                    isSuccess={isNotiSuccess}
                    detailNoti={detailNoti}
                    detailNotiSecond={detailNotiSecond}
                />
            </div>
        </div>
    );
}
