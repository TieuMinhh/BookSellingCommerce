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
    const [isShowModalAddress, setIsShowModalAddress] = useState(false);
    const [isNewAddress, setIsNewAddress] = useState(false);

    const hideModalPromotion = () => {
        const modal = document.querySelector('.modal-promotion-wrapper');
        modal.classList.remove('active');
        modal.classList.add('hidden');
    };

    const showModalPromotion = () => {
        const modal = document.querySelector('.modal-promotion-wrapper');
        modal.classList.remove('hidden');
        modal.classList.add('active');
    };

    const hideModalAddress = () => {
        setIsShowModalAddress(false);
    };

    const showModalAddress = () => {
        setIsShowModalAddress(true);
    };

    return (
        <>
            <div className="containerPay">
                <div className="delivery-address">
                    <h4 className="h4"> Địa chỉ nhận hàng</h4>
                    <div class="line"></div>
                    <div className="info-delivery">
                        <ul className="left-info">
                            <li>Họ và tên người nhận :</li>
                            <li>Email :</li>
                            <li>Số điện thoại :</li>
                        </ul>
                        <ul className="right-info">
                            <li>Ngô Duy Tân</li>
                            <li>znamtrung@gmail.com</li>
                            <li>0912486205</li>
                        </ul>
                        <div className="img-delivery">
                            <img src={Img2} alt=""></img>
                        </div>
                    </div>
                    <div className="wrapper-address-delivery">
                        <p>
                            <i class="fa-solid fa-map-location-dot"></i> Địa chỉ nhận hàng :
                        </p>

                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="option" id="address1" />
                            <label htmlFor="address1" className="detail-address-delivery">
                                167 Tăng Nhơn Phú, phường Phước Long B, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt
                                Nam
                            </label>
                            <div className="cover-edit-delete">
                                <button
                                    className="btn-edit-address"
                                    onClick={() => {
                                        showModalAddress();
                                        setIsNewAddress(false);
                                    }}
                                >
                                    Sửa
                                </button>
                                <button className="btn-delete-address">Xóa</button>
                            </div>
                        </div>

                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="option" id="address2" />
                            <label htmlFor="address2" className="detail-address-delivery">
                                Giao ở đâu tùy ý
                            </label>
                            <div className="cover-edit-delete">
                                <button
                                    className="btn-edit-address"
                                    onClick={() => {
                                        showModalAddress();
                                        setIsNewAddress(false);
                                    }}
                                >
                                    Sửa
                                </button>
                                <button className="btn-delete-address">Xóa</button>
                            </div>
                        </div>

                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="option" id="address3" />
                            <label htmlFor="address3" className="detail-address-delivery">
                                Sao Hỏa
                            </label>
                            <div className="cover-edit-delete">
                                <button
                                    className="btn-edit-address"
                                    onClick={() => {
                                        showModalAddress();
                                        setIsNewAddress(false);
                                    }}
                                >
                                    Sửa
                                </button>
                                <button className="btn-delete-address">Xóa</button>
                            </div>
                        </div>

                        <div
                            className="cover-detail-address"
                            onClick={() => {
                                showModalAddress();
                                setIsNewAddress(true);
                            }}
                        >
                            <i class="fa-solid fa-circle-plus" style={{ color: '#C92127', fontSize: '18px' }}></i>
                            <label
                                style={{
                                    color: '#000',
                                    paddingLeft: '18px',
                                    fontSize: '1rem',
                                    userSelect: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Giao đến địa chỉ khác
                            </label>
                        </div>
                    </div>
                </div>
                <div className="method-delivery">
                    <h4 className="h4">Phương thức vận chuyển</h4>
                    <div class="line"></div>
                    <p className="info-method">Qúy khách vui lòng điền tên và địa chỉ giao nhận trước</p>

                    <div className="wrapper-address-delivery">
                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="method" id="method1" />
                            <label htmlFor="method1" className="detail-address-delivery">
                                Giao hàng tiêu chuẩn : 1.000.000.000đ
                            </label>
                        </div>

                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="method" id="method2" />
                            <label htmlFor="method2" className="detail-address-delivery">
                                Giao hàng nhanh : 2.000.000.000đ
                            </label>
                        </div>

                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="method" id="method3" />
                            <label htmlFor="method3" className="detail-address-delivery">
                                Giao hàng siêu tốc : 3.000.000.000đ
                            </label>
                        </div>
                    </div>
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
                        <Button className="discout-btn" variant="link" onClick={showModalPromotion}>
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
                <div className="pay-inner">
                    <div className="cover-check-money">
                        <p className="book-total-money">
                            Thành tiền <span className="detail-total-money">1.000.000.000đ</span>
                        </p>
                        <p className="book-total-money">
                            Phí vận chuyển (Giao hàng tiêu chuẩn){' '}
                            <span className="detail-total-money">2.000.000.000đ</span>
                        </p>
                        <p className="book-total-money" style={{ fontWeight: 'bold' }}>
                            Tổng số tiền <span className="total-all-money">3.000.000.000đ</span>
                        </p>
                    </div>
                    <div class="line1"></div>
                    <div className="done">
                        <Button className="back-btn" variant="light">
                            <i class="fa-solid fa-arrow-left" style={{ color: 'black' }}></i>
                            <Link to="/cart"> Quay về giỏ hàng</Link>
                        </Button>

                        <Button className="confirm-btn">
                            <span>Xác nhận thanh toán</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal ticket promotion */}

            <div className="modal-promotion-wrapper" onClick={hideModalPromotion}>
                <div
                    className="modal-promotion-container"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="close-modal-promotion" onClick={hideModalPromotion}>
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

            {/* End Modal Ticket Promotion*/}

            {/* Start Modal Edit Address */}
            {isShowModalAddress && (
                <div className="modal-edit-address-wrapper" onClick={hideModalAddress}>
                    <div
                        className="modal-edit-address-container"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {!isNewAddress && <h5 className="title-edit-address">Thay đổi địa chỉ giao hàng</h5>}
                        {isNewAddress && <h5 className="title-edit-address">Thêm mới địa chỉ giao hàng</h5>}

                        <div className="cover-item-address-input">
                            <p className="label-input-address">Họ và tên người nhận</p>
                            <input
                                type="text"
                                name=""
                                id=""
                                className="form-edit-address"
                                placeholder="Nhập họ và tên"
                            />
                        </div>

                        <div className="cover-item-address-input">
                            <p className="label-input-address">Số điện thoại</p>
                            <input
                                type="text"
                                name=""
                                id=""
                                className="form-edit-address"
                                placeholder="Nhập số điện thoại"
                            />
                        </div>

                        <div className="cover-item-address-input">
                            <p className="label-input-address">Địa chỉ nhận hàng</p>
                            <input type="text" name="" id="" className="form-edit-address" placeholder="Nhập địa chỉ" />
                        </div>

                        <button className="btn-modal-save-address">Lưu địa chỉ</button>
                        <button className="btn-modal-cancel-address" onClick={hideModalAddress}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}
            {/* End Modal Edit Address */}
        </>
    );
}
