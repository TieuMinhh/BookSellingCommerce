import React, { useEffect, useState } from 'react';
import './OrderPay.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Img1 from '../../../Assets/img/kgd.jpg';
import Img2 from '../../../Assets/img/delivery.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../../Services/Token';
import moment from 'moment';
import { toast } from 'react-toastify';
import CuponIcon from '../../../Assets/svg/ico_coupon.svg';
import VoucherImg from '../../../Assets/img/voucher-icon.jpg';

export default function OrderPay() {
    const [isShowModalAddress, setIsShowModalAddress] = useState(false);
    const [isNewAddress, setIsNewAddress] = useState(false);
    const location = useLocation();
    const listProduct = location.state ? location.state.selectedItems : []; // Lấy danh sách sản phẩm đã chọn từ trang giỏ hàng
    console.log('Danh sách sp là :', listProduct);
    let totalOriginalPrice = 0;
    let totalReducedPrice = 0;
    let shipFee = 20000;
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState(null);

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

    const [user, getUser] = useState([]);
    const [change, setChange] = useState([]);
    const [listVoucher, setListVoucher] = useState([]);

    const getInfoUser = async () => {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get('http://localhost:8081/api/v1/account/info');
        getUser(result.data.userInfo);
        setDeliveryAddress(result.data.userInfo.address);
        console.log('Check token neeee:', result.data.userInfo);
        // console.log(deliveryAddress);
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
        try {
            const response = await axios.get(`http://localhost:8081/api/v1/getDiscountByCode?discount_code=${code}`);

            console.log(response);

            const check = response.data.data;

            const today = new Date();
            const startDay = new Date(check.start_date);
            const endDay = new Date(check.end_date);

            if (startDay < today && endDay >= today) {
                setDiscount({ ...check });
                setTimeout(() => {
                    hideModalPromotion();
                    toast.success('Đã áp dụng mã giảm giá');
                }, 1000);
            } else {
                toast.error('Mã giảm giá không hợp lệ');
            }
        } catch (error) {
            console.error(error);
            toast.error('Đã xảy ra lỗi khi sử dụng mã giảm giá');
        }
    }

    async function ChooseVoucher(item) {
        try {
            const response = await axios.get(
                `http://localhost:8081/api/v1/getDiscountByCode?discount_code=${item.discount_code}`,
            );

            console.log(response);

            const check = response.data.data;

            const today = new Date();
            const startDay = new Date(check.start_date);
            const endDay = new Date(check.end_date);

            if (startDay < today && endDay >= today) {
                setDiscount({ ...check });
                setTimeout(() => {
                    hideModalPromotion();
                    toast.success('Đã áp dụng mã giảm giá');
                }, 1000);
            } else {
                toast.error('Mã giảm giá không hợp lệ');
            }
        } catch (error) {
            console.error(error);
            toast.error('Đã xảy ra lỗi khi sử dụng mã giảm giá');
        }
    }

    const handleOrder = async () => {
        try {
            const addressId = deliveryAddress ? deliveryAddress.id_address : null;
            const order = await axios.post('http://localhost:8081/api/v1/dathang', {
                arr: listProduct,
                discount_id: discount?.discount_id,
                id_address: addressId,
            });

            console.log(order);

            // Đặt lại giá trị giỏ hàng và tiền cần thanh toán
            setCode('');
            setDiscount(null);

            toast.success('Đặt hàng thành công');
            // Thực hiện điều hướng hoặc cập nhật giao diện sau khi đặt hàng thành công
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error(error);
            toast.error('Đã xảy ra lỗi khi đặt hàng');
        }
    };

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
                                Giao hàng tiêu chuẩn :
                            </label>
                            <span>1.000.000.000đ</span>
                        </div>

                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="method" id="method2" />
                            <label htmlFor="method2" className="detail-address-delivery">
                                Giao hàng nhanh :
                            </label>
                            <span>2.000.000.000đ</span>
                        </div>

                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="method" id="method3" />
                            <label htmlFor="method3" className="detail-address-delivery">
                                Giao hàng siêu tốc :
                            </label>
                            <span>3.000.000.000đ</span>
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
                        <Button className="discout-btn" variant="link" onClick={showModalPromotion}>
                            Chọn mã khuyến mãi
                        </Button>
                    </div>
                </div>
                <div className="check">
                    <h4>KIỂM TRA LẠI ĐƠN HÀNG</h4>
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
                <div className="pay-inner">
                    <div className="cover-check-money">
                        <p className="book-total-money">
                            Tổng tiền{' '}
                            <span className="detail-total-money">
                                {(Math.round(totalReducedPrice / 1000) * 1000).toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </p>
                        <p className="book-total-money">
                            Phí vận chuyển (Giao hàng tiêu chuẩn){' '}
                            <span className="detail-total-money">
                                {' '}
                                {shipFee.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </p>
                        <p className="book-total-money">
                            Giảm giá :{' '}
                            <span className="detail-total-money">
                                {' '}
                                {discountAmount.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </p>
                        <p className="book-total-money" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                            Thành tiền{' '}
                            <span className="total-all-money">
                                {' '}
                                {(Math.round(totalAfterDiscount / 1000) * 1000 + shipFee).toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </p>
                    </div>
                    <div class="line1"></div>
                    <div className="done">
                        <Button className="back-btn" variant="light">
                            <i class="fa-solid fa-arrow-left" style={{ color: 'black' }}></i>
                            <Link to="/cart"> Quay về giỏ hàng</Link>
                        </Button>

                        <Button className="confirm-btn" onClick={handleOrder}>
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

                            {/* a Ticket */}
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
                                                    <button
                                                        className="apply-promotion-btn-bottom"
                                                        onClick={() => ChooseVoucher(item)}
                                                    >
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
