import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './BookDetail.scss';
import axios from '../../../api/axios';
import Img from '../../../Assets/img/kgd.jpg';
import { toast } from 'react-toastify';

import { getToken } from '../../../Services/Token';
import { useNavigate } from 'react-router-dom';
import config from '../../../api/base';
import { NotifyModalSuccess } from '../../../Components/NotifyModalSuccess/NotifyModalSuccess';
import { NotifyModalFail } from '../../../Components/NotifyModalFail/NotifyModalFail';

export default function BookDetail() {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState(1); //number of item
    const [quantity, setQuantity] = useState(1);
    const [isNotiSuccess, setIsNotiSuccess] = useState(false);
    const [detailNoti, setDetailNoti] = useState('');
    const [isNotiFail, setIsNotiFail] = useState(false);

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
        const result = await axios.get(axios.defaults.baseURL + `/api/v1/detail-product?id=${id}`);
        setList(result?.data.listProduct);
        console.log(result.data);
        // console.log(list.price);
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
        // console.log('Token là ', token);
        let id_product = id;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // console.log('Add Cart: ', token, id_product, quantity);
        let result = await axios.post(axios.defaults.baseURL + `/api/v1/add-to-cart/${id_product}`, { quantity });
        console.log(result);
        // return response.data;

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

    const navigate = useNavigate();
    const goToOrderPage = () => {
        navigate('/order-pay', {
            state: { selectedItems: [{ ...list, quantity: quantity }] },
        });
    };

    useEffect(() => {
        getDetailProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="products-info">
            <div class="product-info">
                <div class="left-product">
                    <div class="big-image-product">
                        <img
                            src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                            alt=""
                            className="avatar-image"
                        />
                    </div>
                    <div class="images-product">
                        <div class="small-image-product">
                            <img
                                src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                        <div class="small-image-product">
                            <img
                                src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                        <div class="small-image-product">
                            <img
                                src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                        <div class="small-image-product">
                            <img
                                src={`${config.PUBLIC_IMAGE_URL}${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                    </div>
                </div>

                <div class="right-product">
                    <div class="product-name">{list && list[0]?.name_product}</div>
                    <div class="book-info">
                        <p className="product-nxb">Nhà xuất bản: {list && list[0]?.name_company}</p>
                        <p className="product-author"> Tác giả: {list && list[0]?.author}</p>
                    </div>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>

                    <div class="main-price">
                        <div class="price">
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

                    <div class="quantity">
                        <p class="quantityName">Số lượng :</p>
                        <button class="counter">
                            <button class="btn-giam" onClick={handleDecrement}>
                                -
                            </button>
                            <p
                                style={{
                                    fontSize: '18px',
                                }}
                            >
                                {number}
                            </p>
                            <button class="btn-tang" onClick={handleIncrement}>
                                +
                            </button>
                        </button>
                    </div>

                    <div class="btn-box">
                        <div class="cart-btn">
                            <Button
                                id="add-btn"
                                variant="outline-danger"
                                onClick={() => {
                                    handleAddToCart();
                                    setIsNotiSuccess(true);
                                }}
                            >
                                <i class="fa-solid fa-shopping-cart add-btn-box"></i>
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                        <div class="buy-btn" onClick={goToOrderPage}>
                            <Button id="order-btn" variant="danger">
                                <i class="fa-solid order-btn-box"></i>
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="product-related">
                <div class="product-related-title">
                    <p>Bạn có thể thích</p>
                </div>
                <div class=" product-related-content">
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                </div>
            </div>

            <div class="line"></div>

            <div class="info-describe">
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

                <div class="line"></div>
                <p class="name-describe"> Không Gia Đình</p>
                <div class="detail-describe">
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
