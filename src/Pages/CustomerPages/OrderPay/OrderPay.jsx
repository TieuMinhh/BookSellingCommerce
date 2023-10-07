import React, { useState } from 'react';
import './OrderPay.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Img1 from '../../../Assets/img/kgd.jpg';
import Img2 from '../../../Assets/img/delivery.png';
import { Link } from 'react-router-dom';
import CuponIcon from '../../../Assets/svg/ico_coupon.svg';
import VoucherImg from '../../../Assets/img/voucher-icon.jpg';

export default function OrderPay() {
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
                            <li>Ngô Duy Tân</li>
                            <li>znamtrung@gmail.com</li>
                            <li>0912486205</li>
                            <li>284/4/34 Trần Trâm, P.13, Q.Bình Thanh, TPHCM</li>
                        </ul>
                        <div className="img-delivery">
                            <img src={Img2} alt=""></img>
                        </div>
                    </div>
                </div>
                <div className="method-delivery">
                    <h4 className="h4">Phương thức vận chuyển</h4>
                    <div class="line"></div>
                    <p className="info-method">Qúy khách vui lòng điền tên và địa chỉ giao nhận trước</p>
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
                            <input className="input" type="text" placeholder="Nhập mã khuyến mãi"></input>
                            <Button className="apply-btn">Áp dụng</Button>
                        </div>
                        <Button className="discout-btn" variant="link" onClick={showModal}>
                            Chọn mã khuyến mãi
                        </Button>
                    </div>
                </div>
                <div className="check">
                    <h4>KIỂM TRA LẠI ĐƠN HÀNG</h4>
                    <div class="line"></div>
                    <div class="product-order">
                        <img src={Img1} alt=""></img>
                        <p className="info-check">Không Gia Đình</p>
                        <div className="check-right">
                            <div className="temporary">
                                <p>133.200 đ</p>
                                <span>148.000 đ</span>
                            </div>
                            <p className="quantity">x1</p>
                            <p className="total">133.200 đ</p>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="product-order">
                        <img src={Img1} alt=""></img>
                        <p className="info-check">Không Gia Đình</p>
                        <div className="check-right">
                            <div className="temporary">
                                <p>133.200 đ</p>
                                <span>148.000 đ</span>
                            </div>
                            <p className="quantity">x1</p>
                            <p className="total">133.200 đ</p>
                        </div>
                    </div>
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
                        <span className="total-text">Tổng tiền :</span>
                        <span className="total-text"> 100.000.000 đ</span>
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
                                id=""
                                className="form-promotion"
                                placeholder="Nhập mã khuyến mãi/Quà tặng"
                            />
                            <button className="apply-promotion-btn-top">Áp dụng</button>
                        </div>
                    </div>
                    <div className="modal-promotion-inner">
                        <div className="modal-promotion-content">
                            <p className="title-content">Mã giảm giá</p>

                            {/* a Ticket */}
                            <div className="cover-promotion-ticket">
                                <div className="inner-promotion-ticket">
                                    <div className="left-promotion-ticket" style={{ color: '#000' }}>
                                        <img src={VoucherImg} alt="voucher" className="voucher-img" />
                                    </div>
                                    <div className="right-promotion-ticket">
                                        <p className="title-right-promotion">Mã giảm giá 10K - Đơn hàng từ 1000K</p>
                                        <p className="sub-title-promotion">
                                            Không Áp Dụng Cho Phiếu Quà Tặng và Sách Giáo Khoa
                                        </p>
                                        <button className="apply-promotion-btn-bottom">Áp dụng</button>
                                    </div>
                                </div>
                            </div>

                            <div className="cover-promotion-ticket">
                                <div className="inner-promotion-ticket">
                                    <div className="left-promotion-ticket" style={{ color: '#000' }}>
                                        <img src={VoucherImg} alt="voucher" className="voucher-img" />
                                    </div>
                                    <div className="right-promotion-ticket">
                                        <p className="title-right-promotion">Mã giảm giá 10K - Đơn hàng từ 1000K</p>
                                        <p className="sub-title-promotion">
                                            Không Áp Dụng Cho Phiếu Quà Tặng và Sách Giáo Khoa
                                        </p>
                                        <button className="apply-promotion-btn-bottom">Áp dụng</button>
                                    </div>
                                </div>
                            </div>

                            <div className="cover-promotion-ticket">
                                <div className="inner-promotion-ticket">
                                    <div className="left-promotion-ticket" style={{ color: '#000' }}>
                                        <img src={VoucherImg} alt="voucher" className="voucher-img" />
                                    </div>
                                    <div className="right-promotion-ticket">
                                        <p className="title-right-promotion">Mã giảm giá 10K - Đơn hàng từ 1000K</p>
                                        <p className="sub-title-promotion">
                                            Không Áp Dụng Cho Phiếu Quà Tặng và Sách Giáo Khoa
                                        </p>
                                        <button className="apply-promotion-btn-bottom">Áp dụng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* End Modal */}
        </>
    );
}
