import React, { useState, useEffect } from 'react';
import './OrderPay.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Img1 from '../../../Assets/img/kgd.jpg';
import Img2 from '../../../Assets/img/delivery.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CuponIcon from '../../../Assets/svg/ico_coupon.svg';
import VoucherImg from '../../../Assets/img/voucher-icon.jpg';
import axios from 'axios';
import { getToken } from '../../../Services/Token';
import moment from 'moment';
import { toast } from 'react-toastify';

export default function OrderPay() {
    const location = useLocation();
    const listProduct = location.state ? location.state.selectedItems : []; // Lấy danh sách sản phẩm đã chọn từ trang giỏ hàng
    console.log('Danh sách sp là :', listProduct);
    let totalOriginalPrice = 0;
    let totalReducedPrice = 0;
    let shipFee = 20000;

    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState(null);

    const hideModal = () => {
        const modal = document.querySelector('.modal-promotion-wrapper');
        modal.classList.remove('active');
        modal.classList.add('hidden');
    };

    const showModal = () => {
        const modal = document.querySelector('.modal-promotion-wrapper');
        modal.classList.remove('hidden');
        modal.classList.add('active');
    };

    const [user, getUser] = useState([]);
    const [change, setChange] = useState([]);
    const [listVoucher, setListVoucher] = useState([]);

    const getInfoUser = async () => {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get('http://localhost:8081/api/v1/account/info');
        getUser(result.data.userInfo);
        console.log('Check token neeee:', result.data.userInfo);
    };

    async function getListVocuher() {
        // const result = await axiosApiInstance.get(
        //   axiosApiInstance.defaults.baseURL + "/api/v1/hero/get"
        // );
        const result = await axios.get(`http://localhost:8081/api/v1/discount?id=ALL`);
        setListVoucher(result?.data.listDiscount);
        // console.log(result.data);
    }

    async function AddVoucher() {
        const response = await axios.get(`http://localhost:8081/api/v1/getDiscountByCode?discount_code=${code}`);

        console.log(response);

        const check = response.data.data;

        const today = new Date();
        const startDay = new Date(check.start_date);
        const endDay = new Date(check.end_date);

        if (startDay < today && endDay >= today) {
            setDiscount({ ...check });
            toast.success('Đã áp dụng mã giảm giá');
        } else {
            toast.error('Mã giảm giá không hợp lệ');
        }
    }

    useEffect(() => {
        getInfoUser();
        getListVocuher();
    }, [change]);

    // Tính tổng giá trị sản phẩm trước khi giảm giá
    listProduct.forEach((item) => {
        totalOriginalPrice += item?.price * item?.quantity;
        totalReducedPrice += item?.price_reducing * item?.quantity;
    });

    // Tính số tiền giảm giá từ mã khuyến mãi
    console.log(discount);
    const discountAmount = ((discount?.percentage || 0) / 100) * totalReducedPrice;

    // Tính tổng tiền sau khi giảm giá
    const totalAfterDiscount = totalReducedPrice - discountAmount;

    return (
        <>
            <div className="containerPay">
                <div className="delivery-address">
                    <h4 className="h4"> Địa chỉ nhận hàng</h4>
                    <div class="line"></div>
                    <div className="info-delivery">
                        <ul className="left-info">
                            <li>Họ và tên người nhận</li>
                            <li>Email </li>
                            <li>Số điện thoại</li>
                            <li>Địa chỉ nhận hàng</li>
                        </ul>
                        <ul className="right-info">
                            <li>{user && user?.name}</li>
                            <li>{user && user?.email}</li>
                            <li>{user && user?.phone}</li>
                            <li>{user && user?.address}</li>
                        </ul>
                        <div className="img-delivery">
                            <img src={Img2} alt=""></img>
                        </div>
                    </div>
                </div>
                <div className="method-delivery">
                    <h4 className="h4">Phương thức vận chuyển</h4>
                    <div class="line"></div>
                    <p className="info-method">Đường chim bay</p>
                </div>
                <div className="method-pay">
                    <h4 className="h4">Phương thức thanh toán</h4>
                    <div class="line"></div>

                    <p className="info-method-pay">
                        <i class="fa-solid fa-money-bill-1-wave " style={{ marginRight: '8px', color: '#ed722f' }}></i>
                        Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                </div>
                <div className="discout">
                    <h4 className="h4">Mã khuyến mãi</h4>
                    <div class="line"></div>
                    <div className="info-discout">
                        <p>Mã khuyến mãi</p>
                        <div class="apply">
                            <input
                                className="input"
                                type="text"
                                placeholder="Nhập mã khuyến mãi"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            ></input>
                            <Button className="apply-btn" onClick={AddVoucher}>
                                Áp dụng
                            </Button>
                        </div>
                        <Button className="discout-btn" variant="link" onClick={showModal}>
                            Chọn mã khuyến mãi
                        </Button>
                    </div>
                </div>
                <div className="check">
                    <h4 className="h4">Kiểm tra lại đơn hàng</h4>

                    <div class="line"></div>

                    {listProduct &&
                        listProduct.map((item, index) => {
                            return (
                                <div class="product-order">
                                    <img
                                        src={`http://localhost:8081/image/${item && item?.images}`}
                                        alt=""
                                        className="avatar-image"
                                    />
                                    <p className="info-check">{item && item?.name}</p>
                                    <div className="check-right">
                                        <div className="temporary">
                                            <p>
                                                {item &&
                                                    (Math.round(item?.price_reducing / 1000) * 1000).toLocaleString(
                                                        'vi',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        },
                                                    )}
                                            </p>
                                            <span>
                                                {item &&
                                                    (Math.round(item?.price / 1000) * 1000).toLocaleString('vi', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}
                                            </span>
                                        </div>
                                        <p className="quantity">{item && item?.quantity}</p>
                                        <p className="total">
                                            {(item && item?.price_reducing * item?.quantity).toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    <div class="line"></div>
                </div>
            </div>

            <div className="pay-container">
                <div class="line1"></div>
                <div className="done">
                    <Button className="back-btn" variant="light">
                        <i class="fa-solid fa-arrow-left" style={{ color: 'black' }}></i>
                        <Link to="/cart"> Quay về giỏ hàng</Link>
                    </Button>
                    <div className="total-total">
                        <span className="total-text">Tổng tiền : </span>
                        <span className="total-text">
                            {(Math.round(totalReducedPrice / 1000) * 1000).toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </span>

                        <span className="total-text">Giảm giá : </span>
                        <span className="total-text">
                            {(Math.round(discountAmount / 1000) * 1000).toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </span>

                        <span className="total-text">Phí ship :</span>
                        <span className="total-text">
                            {shipFee.toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </span>

                        <span className="total-text">Thành tiền : </span>
                        <span className="total-text">
                            {(Math.round(totalAfterDiscount / 1000) * 1000 + shipFee).toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </span>
                    </div>

                    <Button className="confirm-btn">
                        <span>Xác nhận thanh toán</span>
                    </Button>
                </div>
            </div>

            {/* Modal ticket promotion */}

            <div className="modal-promotion-wrapper">
                <div className="modal-promotion-container">
                    <div className="close-modal-promotion" onClick={hideModal}>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div className="modal-promotion-header">
                        <p className="title-promotion-header">
                            <img src={CuponIcon} alt="" /> Chọn mã khuyến mãi
                        </p>
                        <div className="cover-input-promotion">
                            <input
                                type="text"
                                name=""
                                className="form-promotion"
                                placeholder="Nhập mã khuyến mãi/Quà tặng"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <button className="apply-promotion-btn-top" onClick={AddVoucher}>
                                Áp dụng
                            </button>
                        </div>
                    </div>
                    <div className="modal-promotion-inner">
                        <div className="modal-promotion-content">
                            <p className="title-content">Mã giảm giá</p>

                            {listVoucher &&
                                listVoucher.map((item, index) => {
                                    return (
                                        <div className="cover-promotion-ticket">
                                            <div className="inner-promotion-ticket">
                                                <div className="left-promotion-ticket" style={{ color: '#000' }}>
                                                    <img src={VoucherImg} alt="voucher" className="voucher-img" />
                                                </div>
                                                <div className="right-promotion-ticket">
                                                    <p className="title-right-promotion">{item.discount_code}</p>
                                                    <p className="sub-title-promotion">{item.description}</p>
                                                    <p className="voucher-time">
                                                        ÁP DỤNG TỪ {moment(item.start_date).format('L')} ĐẾN{' '}
                                                        {moment(item.end_date).format('L')}
                                                    </p>
                                                    <button className="apply-promotion-btn-bottom" onClick={AddVoucher}>
                                                        Áp dụng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
            {/* End Modal */}
        </>
    );
}
