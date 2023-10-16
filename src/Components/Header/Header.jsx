import React, { useState, useEffect } from 'react';
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

export default function Header() {
    const [listCart, setListCart] = useState([]);
    const [change, setChange] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [searchName, setSearchName] = useState('');

    const debouncedValue = useDebounce(searchName, 500);

    const navigate = useNavigate();

    const [shouldSearch, setShouldSearch] = useState(false);

    useEffect(() => {
        if (shouldSearch) {
            const searchProduct = async () => {
                try {
                    const result = await axios.post(axios.defaults.baseURL + '/api/v1/search-product', {
                        name: debouncedValue,
                    });
                    console.log(result.data.message);

                    // Chuyển hướng đến trang product cùng với kết quả tìm kiếm
                    navigate(`/product?search-product=${debouncedValue}`, {
                        state: { searchResult: result.data.message },
                    });
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
            searchProduct();
        }
    }, [debouncedValue, shouldSearch]);

    const handleInputChange = (e) => {
        setSearchName(e.target.value);
        setShouldSearch(e.target.value !== '');
    };

    const handleCategoryClick = async (item) => {
        console.log('Id category là : ', item.id_category);
        try {
            const result = await axios.post(axios.defaults.baseURL + '/api/v1/search-product-by-id-category', {
                id_category: item.id_category,
            });
            console.log(result.data.message);

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
    const handleClose = () => setShow(false);

    const handleLoginSuccess = () => {
        // Gọi hàm này sau khi đăng nhập thành công để đóng modal.
        handleClose();
    };

    async function getListProduct() {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.post(axios.defaults.baseURL + `/api/v1/account/cart`);
        setListCart(result?.data.list);
        // setChange(!change);
    }

    async function getListCategory() {
        let result = await axios.get(axios.defaults.baseURL + `/api/v1/category?id=ALL`);
        setListCategory(result?.data.listCategory);
        // console.log(result.data);
    }

    useEffect(() => {
        getListCategory();
    }, []);

    useEffect(() => {
        getListProduct();
    }, [change]);

    return (
        <div class="header">
            <div class="topbar row">
                <div class="topbar-left col">
                    <p className="open"> Mở cửa: 7h30 đến 21h30, T7 và Chủ nhật 8h đến 22h</p>
                </div>
                <div class="topbar-right col">
                    <div class="topbar-right-list">
                        <div class="topbar-right-list-item">
                            <i class="fa-solid fa-star"></i>
                            <a href="https://www.thegioididong.com/mua-online-gia-re#game">Khuyến mãi hot</a>
                        </div>
                        <div class="topbar-right-list-item">
                            <i class="fa-solid fa-location-pin"></i>
                            <a href="https://www.thegioididong.com/sieu-thi-the-gioi-di-dong/ho-chi-minh">
                                {' '}
                                Hệ thống cửa hàng
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mid-header">
                <div class="container-header row grid wide">
                    <div class="container-header-1 col" style={{ display: 'flex' }}>
                        <Link to="/">
                            <img src={LogoPage} alt="" style={{ width: '200px' }}></img>
                        </Link>
                        <div class="cover-img-menu">
                            <Link to="/product">
                                <img src={IconMenu} alt="" className="icon-menu-header" />
                                <i class="down-menu-icon fa-solid fa-angle-down"></i>
                            </Link>
                            <div className="modal-wrapper-cate">
                                <div className="modal-container-cate">
                                    <p className="modal-title-cate">
                                        <i class="fa-regular fa-bookmark" style={{ marginRight: '16px' }}></i>Danh mục
                                        sản phẩm
                                    </p>

                                    {listCategory &&
                                        listCategory.map((item, index) => {
                                            return (
                                                <div key={index} onClick={() => handleCategoryClick(item)}>
                                                    <p className="modal-item-cate">
                                                        <i
                                                            class="fa-solid fa-book-open"
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

                    <div class="container-header-2 col">
                        <div class="header-search">
                            <input
                                type="text"
                                placeholder="Nhập để tìm kiếm ..."
                                value={searchName}
                                onChange={handleInputChange}
                            ></input>
                            <i class="icon fa fa-search"></i>
                        </div>
                    </div>

                    <div class="container-header-3 col">
                        <Link to="/cart" className="first">
                            <div class="header-list">
                                <b>12</b>
                                <i class="fa-regular fa-bell"></i>
                                <p>Thông báo</p>
                            </div>
                        </Link>

                        <Link to="/cart" className="first">
                            <div class="header-list">
                                {listCart?.length > 0 && <b>{listCart && listCart?.length}</b>}

                                <i class="fa-solid fa-cart-shopping"></i>
                                <p>Giỏ hàng</p>
                            </div>
                        </Link>

                        <Link to="" className="second">
                            <div class="header-list">
                                <div class="menu-header">
                                    {!localStorage.getItem('accessToken') ? (
                                        <div className="wrapper-content-menu">
                                            <button
                                                onClick={handleShow}
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
                                                onClick={handleShow}
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
                                                            class="fa-solid fa-chevron-left fa-rotate-180"
                                                        ></i>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/order-history">
                                                    <span className="user-name">
                                                        <i class="fa-regular fa-clipboard"></i> Đơn hàng của tôi
                                                    </span>{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/favourite">
                                                    <span className="user-name">
                                                        <i class="fa-regular fa-heart"></i> Sản phẩm yêu thích
                                                    </span>{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/my-voucher">
                                                    <span className="user-name">
                                                        <i class="fa-solid fa-ticket"></i> Wallet Voucher
                                                    </span>{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/account-fpoint">
                                                    <span className="user-name">
                                                        <i class="fa-solid fa-f"></i> Tài khoản F-point
                                                    </span>{' '}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/"
                                                    onClick={() => {
                                                        localStorage.removeItem('accessToken');
                                                        // localStorage.removeItem("refreshToken");
                                                    }}
                                                >
                                                    <span className="user-name">
                                                        <i class="fa-solid fa-arrow-right-from-bracket"></i> Thoát tài
                                                        khoản
                                                    </span>{' '}
                                                </Link>
                                            </li>
                                        </div>
                                    )}
                                </div>
                                <b>10</b>
                                <i class="fa-regular fa-user"></i>
                                <p>Tài khoản</p>
                            </div>
                        </Link>

                        <div class="header-list">
                            <div class="cover-img-vietnam">
                                <img src={VietNamFlag} alt="vietnam" />
                                <span class="fa-solid fa-angle-down"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="hr" />

            <MyLoginModal show={show} handleClose={handleClose} handleLoginSuccess={handleLoginSuccess} />
        </div>
    );
}
