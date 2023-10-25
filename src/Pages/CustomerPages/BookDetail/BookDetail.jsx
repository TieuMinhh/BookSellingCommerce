import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './BookDetail.scss';
import axios from '../../../api/axios';
import Img from '../../../Assets/img/kgd.jpg';

import { getToken } from '../../../Services/Token';
import config from '../../../api/base';
import { NotifyModalSuccess } from '../../../Components/NotifyModalSuccess/NotifyModalSuccess';
import { NotifyModalFail } from '../../../Components/NotifyModalFail/NotifyModalFail';
import MyLoginModal from '../../Auths/Auths/Auths';
import { useContext } from 'react';
import { CountCartContext } from '../../../Components/CountCartProvider/CountCartProvider';
import { useNavigate } from 'react-router-dom';

export default function BookDetail() {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState(1); //number of item
    const [quantity, setQuantity] = useState(1);
    const [isNotiSuccess, setIsNotiSuccess] = useState(false);
    const [detailNoti, setDetailNoti] = useState('');
    const [isNotiFail, setIsNotiFail] = useState(false);
    const countCartContext = useContext(CountCartContext);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }, []);

    const updateQuantity = (value) => {
        setNumber((prevState) => prevState + value);
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    async function getDetailProduct() {
        const result = await axios.get(axios.defaults.baseURL + `/detail-product?id=${id}`);
        setList(result?.data.listProduct);
    }

    const handleIncrement = () => {
        updateQuantity(1);
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (number > 1) updateQuantity(-1);
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = async () => {
        let token = await getToken();
        let id_product = id;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.post(axios.defaults.baseURL + `/add-to-cart/${id_product}`, { quantity });

        if (result.status === 200) {
            setIsNotiSuccess(true);
            setDetailNoti(result.data.message);
            setTimeout(() => {
                setIsNotiSuccess(false);
            }, 3000);
        }

        if (result.status === 500) {
            setIsNotiFail(true);
            setDetailNoti(result.data.message);
            setTimeout(() => {
                setIsNotiFail(false);
            }, 3000);
        }
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleLoginSuccess = () => {
        // Gọi hàm này sau khi đăng nhập thành công để đóng modal.
        handleClose();
    };

    const handleCheckLogin = async () => {
        countCartContext.handleCountCart();
        if (localStorage.getItem('accessToken')) {
            handleAddToCart();
            try {
                const token = await getToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const result = await axios.post(axios.defaults.baseURL + `/account/cart`);
                countCartContext.handleCountCart(result?.data.list.length);
            } catch (error) {}
        } else {
            setShow(true);
        }
    };

    const handelBuyNow = async () => {
        if (localStorage.getItem('accessToken')) {
            handleAddToCart();
            try {
                const token = await getToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const result = await axios.post(axios.defaults.baseURL + `/account/cart`);
                console.log('COunt: ', result?.data.list.length);
                countCartContext.handleCountCart(result?.data.list.length);
                navigate('/cart');
            } catch (error) {}
        } else {
            setShow(true);
        }
    };

    const navigate = useNavigate();
    // const goToOrderPage = () => {
    //     navigate('/order-pay', {
    //         state: { selectedItems: [{ ...list, quantity: quantity }] },
    //     });
    // };

    useEffect(() => {
        getDetailProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="products-info">
            <MyLoginModal
                isLogin={false}
                show={show}
                handleClose={handleClose}
                handleLoginSuccess={handleLoginSuccess}
            />
            ;
            <div className="product-info">
                <div className="left-product">
                    <div className="big-image-product">
                        <img
                            src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                            alt=""
                            className="avatar-image"
                        />
                    </div>
                    <div className="images-product">
                        <div className="small-image-product">
                            <img
                                src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                        <div className="small-image-product">
                            <img
                                src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                        <div className="small-image-product">
                            <img
                                src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                        <div className="small-image-product">
                            <img
                                src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                    </div>
                </div>

                <div className="right-product">
                    <div className="product-name">{list && list[0]?.name_product}</div>
                    <div className="book-info">
                        <p className="product-nxb">Nhà xuất bản: {list && list[0]?.name_company}</p>
                        <p className="product-author"> Tác giả: {list && list[0]?.author}</p>
                    </div>
                    <div className="rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>

                    <div className="main-price">
                        <div className="price">
                            {list &&
                                list[0]?.price_reducing.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}{' '}
                        </div>
                        <span>
                            {list &&
                                list[0]?.price.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}{' '}
                        </span>
                    </div>

                    <div className="time-delivery">
                        <div className="info-delivery">
                            <p>Thời gian giao hàng</p>
                            <p>Chính sách đổi trả</p>
                        </div>
                        <div>
                            <p>Dự kiến từ 1-3 ngày</p>
                            <p>Khui sách = miễn đổi trả</p>
                        </div>
                    </div>

                    <div className="quantity">
                        <p className="quantityName">Số lượng :</p>
                        <div className="counter">
                            <button className="btn-giam" onClick={handleDecrement}>
                                -
                            </button>
                            <p
                                style={{
                                    fontSize: '18px',
                                }}
                            >
                                {number}
                            </p>
                            <button className="btn-tang" onClick={handleIncrement}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="btn-box">
                        <div className="cart-btn">
                            <Button id="add-btn" variant="outline-danger" onClick={handleCheckLogin}>
                                <i className="fa-solid fa-shopping-cart add-btn-box"></i>
                                Thêm vào giỏ hàng
                            </Button>
                        </div>

                        <div className="buy-btn" onClick={handelBuyNow}>
                            <Button id="order-btn" variant="danger">
                                <i className="fa-solid order-btn-box"></i>
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-related">
                <div className="product-related-title">
                    <p>Bạn có thể thích</p>
                </div>
                <div className=" product-related-content">
                    <div className="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div className="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div className="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div className="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div className="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div className="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="info-describe">
                <h4> Thông tin sản phẩm</h4>

                <div className="info-info">
                    <ul className="left-info">
                        <li>Mã hàng</li>
                        <li>Tên Nhà Cung Cấp </li>
                        <li>Tác giả</li>
                        <li>Người dịch</li>
                        <li>Nhà xuất bản</li>
                        <li>Năm xuất bản</li>
                    </ul>

                    <ul className="right-info">
                        <li>8935230009887</li>
                        <li>Cty Văn Hóa & Truyền Thông Trí Việt.</li>
                        <li>{list && list[0]?.author}</li>
                        <li>Xiao Ming</li>
                        <li>{list && list[0]?.name_company}</li>
                        <li>{list && list[0]?.year_publish}</li>
                    </ul>
                </div>

                <div className="line"></div>
                <p className="name-describe"> Không Gia Đình</p>
                <div className="detail-describe">
                    <p>{list && list[0]?.content}</p>
                    <div className=""></div>
                </div>
            </div>
            {/* Start modal add cart success */}
            <div onClick={() => setIsNotiSuccess(false)}>
                <NotifyModalSuccess isSuccess={isNotiSuccess} detailNoti={detailNoti} />
            </div>
            <div onClick={() => setIsNotiFail(false)}>
                <NotifyModalFail isFail={isNotiFail} detailNoti={detailNoti} />
            </div>
        </div>
    );
}
