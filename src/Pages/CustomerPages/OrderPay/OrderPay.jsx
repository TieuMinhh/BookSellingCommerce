import React, { useEffect, useState } from 'react';
import './OrderPay.scss';
import Button from 'react-bootstrap/Button';
import Img2 from '../../../Assets/img/delivery.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../../api/axios';
import { getToken } from '../../../Services/Token';
import moment from 'moment';
import { toast } from 'react-toastify';
import CuponIcon from '../../../Assets/svg/ico_coupon.svg';
import VoucherImg from '../../../Assets/img/voucher-icon.jpg';
import config from '../../../api/base';
import { NotifyModalSuccess } from '../../../Components/NotifyModalSuccess/NotifyModalSuccess';
import { NotifyModalFail } from '../../../Components/NotifyModalFail/NotifyModalFail';

export default function OrderPay() {
    const location = useLocation();
    const listProduct = location.state ? location.state.selectedItems : []; // Lấy danh sách sản phẩm đã chọn từ trang giỏ hàng
    let totalOriginalPrice = 0;
    let totalReducedPrice = 0;
    let shipFee = 20000;
    const navigate = useNavigate();

    console.log(listProduct);

    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState(null);
    const [listAddress, setListAddress] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const [formAddress, setFormAddress] = useState(null);
    const [IdAddress, setIdAddress] = useState(null);
    const [nameAddress, setNameAddress] = useState(null);
    const [nameReceiver, setNameReceiver] = useState(null);
    const [phoneReceiver, setPhoneReceiver] = useState(null);

    const [isShowModalAddAddress, setIsShowModalAddAddress] = useState(false);
    const [isShowModalEditAddress, setIsShowModalEditAddress] = useState(false);
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

    const hideModalAddAddress = () => {
        setIsShowModalAddAddress(false);
    };

    const showModalAddAddress = () => {
        setFormAddress('add');
        setIsShowModalAddAddress(true);
    };

    const hideModalEditAddress = () => {
        setIsShowModalEditAddress(false);
    };

    const showModalEditAddress = (item) => {
        setFormAddress('edit');
        setIdAddress(item.id_address);
        setNameAddress(item.name_address);
        setNameReceiver(item.name_receiver);
        setPhoneReceiver(item.phone_receiver);
        setIsShowModalEditAddress(true);
    };

    const [user, getUser] = useState([]);
    const [change, setChange] = useState([]);
    const [listVoucher, setListVoucher] = useState([]);
    const [isNotiSuccess, setIsNotiSuccess] = useState(false);
    const [detailNoti, setDetailNoti] = useState('');
    const [isNotiFail, setIsNotiFail] = useState(false);

    const goToChangeInfo = () => {
        navigate('/change-info');
    };

    const getInfoUser = async () => {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get(axios.defaults.baseURL + '/account/info');
        getUser(result.data.userInfo);
        setDeliveryAddress(result.data.userInfo.address);
    };

    async function getListVoucher() {
        const result = await axios.get(axios.defaults.baseURL + `/discount?id=ALL`);
        setListVoucher(result?.data.listDiscount);
    }

    async function getListDeliveryAddress() {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.get(axios.defaults.baseURL + `/delivery-address`);
        setListAddress(result?.data.listAddress);
    }

    async function AddNewDeliveryAddress() {
        try {
            let token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const result = await axios.post(axios.defaults.baseURL + `/create-delivery-address`, {
                name_address: nameAddress,
                name_receiver: nameReceiver,
                phone_receiver: phoneReceiver,
            });

            setChange(!change);
            setIsShowModalAddAddress(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function UpdateDeliveryAddress(item) {
        try {
            let token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const result = await axios.post(axios.defaults.baseURL + `/update-delivery-address/${IdAddress}`, {
                name_address: nameAddress,
                name_receiver: nameReceiver,
                phone_receiver: phoneReceiver,
            });

            setChange(!change);
            setIsShowModalEditAddress(false);
        } catch (error) {}
    }

    async function DeleteDeliveryAddress(item) {
        try {
            let token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const result = await axios.delete(axios.defaults.baseURL + `/delete-delivery-address/${item.id_address}`);

            setChange(!change);
        } catch (error) {}
    }

    async function AddVoucher() {
        try {
            const response = await axios.get(axios.defaults.baseURL + `/get-discount-by-code?discount_code=${code}`);

            const check = response.data.data;

            const today = new Date();
            const startDay = new Date(check.start_date);
            const endDay = new Date(check.end_date);

            if (startDay < today && endDay >= today) {
                setDiscount({ ...check });
                hideModalPromotion();
                setIsNotiSuccess(true);
                setDetailNoti('Đã áp dụng mã giảm giá');
                setTimeout(() => {
                    setIsNotiSuccess(false);
                }, 3000);
            } else {
                setIsNotiFail(true);
                setDetailNoti('Mã giảm giá không hợp lệ');
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 3000);
            }
        } catch (error) {
            setIsNotiFail(true);
            setDetailNoti('Đã xảy ra lỗi khi sử dụng mã giảm giá');
            setTimeout(() => {
                setIsNotiFail(false);
            }, 3000);
        }
    }

    async function ChooseVoucher(item) {
        try {
            const response = await axios.get(
                axios.defaults.baseURL + `/get-discount-by-code?discount_code=${item.discount_code}`,
            );

            const check = response.data.data;

            const today = new Date();
            const startDay = new Date(check.start_date);
            const endDay = new Date(check.end_date);

            if (startDay < today && endDay >= today) {
                setDiscount({ ...check });
                hideModalPromotion();

                setIsNotiSuccess(true);
                setDetailNoti('Đã áp dụng mã giảm giá');
                setTimeout(() => {
                    setIsNotiSuccess(false);
                }, 3000);
            } else {
                setIsNotiFail(true);
                setDetailNoti('Mã giảm giá không hợp lệ');
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 3000);
            }
        } catch (error) {
            setIsNotiFail(true);
            setDetailNoti('Đã xảy ra lỗi khi sử dụng mã giảm giá');
            setTimeout(() => {
                setIsNotiFail(false);
            }, 3000);
        }
    }

    const handleOrder = async () => {
        try {
            const order = await axios.post(axios.defaults.baseURL + '/order-pay', {
                arr: listProduct,
                discount_id: discount?.discount_id,
                id_address: listAddress[0]?.id_address,
            });

            // Đặt lại giá trị giỏ hàng và tiền cần thanh toán
            setCode('');
            setDiscount(null);

            setOrderSuccess(true);
            setTimeout(() => {
                setOrderSuccess(false);
            }, 5000);
            // toast.success('Đặt hàng thành công');

            // Thực hiện điều hướng hoặc cập nhật giao diện sau khi đặt hàng thành công
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error(error);
            toast.error('Đã xảy ra lỗi khi đặt hàng');
        }
    };

    const [selectedAddress, setSelectedAddress] = useState({});

    // const handleRadioChange = (index) => {
    //     // Cập nhật trạng thái của địa chỉ được chọn
    //     const updatedAddresses = listAddress.map((item, idx) => ({
    //         ...item,
    //         checked: idx === index,
    //     }));
    //     // Lưu trạng thái đã chọn và cập nhật danh sách địa chỉ
    //     setSelectedAddress(updatedAddresses[index]);
    //     console.log('Địa chỉ được chọn là :', selectedAddress);
    // };

    const handleRadioChange = (selectedItem) => {
        // Cập nhật trạng thái của địa chỉ được chọn
        const updatedAddresses = listAddress.map((item) =>
            item.id === selectedItem.id ? { ...item, checked: true } : { ...item, checked: false },
        );
        // Lưu trạng thái đã chọn
        setSelectedAddress(selectedItem);
        console.log('Địa chỉ được chọn là:', selectedItem);
    };

    useEffect(() => {
        getInfoUser();
        getListVoucher();
        getListDeliveryAddress();
    }, [change]);

    // Tính tổng giá trị sản phẩm trước khi giảm giá
    listProduct?.forEach((item) => {
        totalOriginalPrice += item?.price * item?.quantity;
        totalReducedPrice += item?.price_reducing * item?.quantity;
    });

    // Tính số tiền giảm giá từ mã khuyến mãi
    const discountAmount = ((discount?.percentage || 0) / 100) * totalReducedPrice;

    // Tính tổng tiền sau khi giảm giá
    const totalAfterDiscount = totalReducedPrice - discountAmount;

    return (
        <>
            <div className="containerPay">
                <div className="delivery-address">
                    <h4 className="h4"> Địa chỉ nhận hàng</h4>
                    <div className="line"></div>
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
                            <i className="fa-solid fa-map-location-dot"></i> Địa chỉ nhận hàng :
                        </p>

                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="option" id="address1" />
                            <label htmlFor="address1" className="detail-address-delivery">
                                {user && user?.address}
                            </label>
                            <div className="cover-edit-delete">
                                <button className="btn-edit-address" onClick={goToChangeInfo}>
                                    Sửa
                                </button>
                                <button className="btn-delete-address">Xóa</button>
                            </div>
                        </div>

                        {listAddress &&
                            listAddress.map((item, index) => {
                                return (
                                    <div className="cover-detail-address" key={item.id}>
                                        {/* <input
                                            className="form-address"
                                            type="radio"
                                            id={`address${item.id}`}
                                            checked={selectedAddress === item.id} // So sánh theo id
                                            onChange={() => handleRadioChange(item)}
                                        /> */}
                                        <input
                                            className="form-address"
                                            type="radio"
                                            id={`address${item.id}`}
                                            checked={selectedAddress === item} // So sánh theo đối tượng địa chỉ
                                            onClick={() => handleRadioChange(item)}
                                        />
                                        <label htmlFor={`address${item.id}`} className="detail-address-delivery">
                                            {item && item?.name_address}
                                        </label>
                                        <div className="cover-edit-delete">
                                            <button
                                                className="btn-edit-address"
                                                onClick={() => showModalEditAddress(item)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="btn-delete-address"
                                                onClick={() => DeleteDeliveryAddress(item)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                        <div
                            className="cover-detail-address"
                            onClick={() => {
                                showModalAddAddress();
                                setIsNewAddress(true);
                            }}
                        >
                            <i className="fa-solid fa-circle-plus" style={{ color: '#C92127', fontSize: '18px' }}></i>
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
                    <div className="line"></div>
                    <p className="info-method">Qúy khách vui lòng điền tên và địa chỉ giao nhận trước</p>

                    <div className="wrapper-address-delivery">
                        <div className="cover-detail-address">
                            <input className="form-address" type="radio" name="method" id="method1" />
                            <label htmlFor="method1" className="detail-address-delivery">
                                Giao hàng tiêu chuẩn :
                            </label>
                            <span>
                                {shipFee.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="method-pay">
                    <h4 className="h4">Phương thức thanh toán</h4>
                    <div className="line"></div>

                    <p className="info-method-pay">
                        <i
                            className="fa-solid fa-money-bill-1-wave "
                            style={{ marginRight: '8px', color: '#ed722f' }}
                        ></i>
                        Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                </div>
                <div className="discout">
                    <h4 className="h4">Mã khuyến mãi</h4>
                    <div className="line"></div>
                    <div className="info-discout">
                        <p>Mã khuyến mãi</p>
                        <div className="apply">
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
                    <h4 className="h4">KIỂM TRA LẠI ĐƠN HÀNG</h4>
                    <div className="line"></div>

                    {listProduct &&
                        listProduct.map((item, index) => {
                            return (
                                <div className="product-order" key={index}>
                                    <img
                                        src={`${config.PUBLIC_IMAGE_URL}${item && item?.images}`}
                                        alt=""
                                        className="avatar-image"
                                    />

                                    <p className="info-check" style={{ paddingLeft: '24px' }}>
                                        {item && item?.name_product}
                                    </p>

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
                    <div className="line"></div>
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
                            Giảm giá{' '}
                            <span className="detail-total-money">
                                {' '}
                                {discountAmount.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </p>
                        <p
                            className="book-total-money"
                            style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fa0001' }}
                        >
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
                    <div className="line1"></div>
                    <div className="done">
                        <Button className="back-btn" variant="light">
                            <i className="fa-solid fa-arrow-left" style={{ color: 'black' }}></i>
                            <Link to="/cart"> Quay về giỏ hàng</Link>
                        </Button>

                        <Button className="confirm-btn" onClick={handleOrder}>
                            <span>Xác nhận đặt hàng</span>
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
                        <i className="fa-solid fa-xmark"></i>
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
                                        <div className="cover-promotion-ticket" key={item.discount_code}>
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

            {/* Start Modal Add Address */}
            {isShowModalAddAddress && (
                <div className="modal-edit-address-wrapper" onClick={hideModalAddAddress}>
                    <div
                        className="modal-edit-address-container"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {formAddress === 'add' && <h5 className="title-edit-address">Thêm mới địa chỉ giao hàng</h5>}

                        <div className="cover-item-address-input">
                            <p className="label-input-address">Họ và tên người nhận</p>
                            <input
                                type="text"
                                name=""
                                id=""
                                className="form-edit-address"
                                placeholder="Nhập họ và tên"
                                value={nameReceiver}
                                onChange={(e) => setNameReceiver(e.target.value)}
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
                                value={phoneReceiver}
                                onChange={(e) => setPhoneReceiver(e.target.value)}
                            />
                        </div>

                        <div className="cover-item-address-input">
                            <p className="label-input-address">Địa chỉ nhận hàng</p>
                            <input
                                type="text"
                                name=""
                                id=""
                                className="form-edit-address"
                                placeholder="Nhập địa chỉ"
                                value={nameAddress}
                                onChange={(e) => setNameAddress(e.target.value)}
                            />
                        </div>

                        <button className="btn-modal-save-address" onClick={AddNewDeliveryAddress}>
                            Lưu địa chỉ
                        </button>
                        <button className="btn-modal-cancel-address" onClick={hideModalAddAddress}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}
            {/* End Modal Add Address */}

            {/* Start Modal Edit Address */}
            {isShowModalEditAddress && (
                <div className="modal-edit-address-wrapper" onClick={hideModalAddAddress}>
                    <div
                        className="modal-edit-address-container"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {formAddress === 'edit' && <h5 className="title-edit-address">Thay đổi địa chỉ giao hàng</h5>}

                        <div className="cover-item-address-input">
                            <p className="label-input-address">Họ và tên người nhận</p>
                            <input
                                type="text"
                                name=""
                                id=""
                                className="form-edit-address"
                                placeholder="Nhập họ và tên"
                                value={nameReceiver}
                                onChange={(e) => setNameReceiver(e.target.value)}
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
                                value={phoneReceiver}
                                onChange={(e) => setPhoneReceiver(e.target.value)}
                            />
                        </div>

                        <div className="cover-item-address-input">
                            <p className="label-input-address">Địa chỉ nhận hàng</p>
                            <input
                                type="text"
                                name=""
                                id=""
                                className="form-edit-address"
                                placeholder="Nhập địa chỉ"
                                value={nameAddress}
                                onChange={(e) => setNameAddress(e.target.value)}
                            />
                        </div>

                        <button className="btn-modal-save-address" onClick={UpdateDeliveryAddress}>
                            Lưu địa chỉ
                        </button>
                        <button className="btn-modal-cancel-address" onClick={hideModalEditAddress}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}
            {/* End Modal Edit Address */}

            {/* Start modal add cart success */}
            {orderSuccess && (
                <div className="modal-add-success" onClick={() => setOrderSuccess(false)}>
                    <div className="modal-container-success">
                        <div className="cover-icon-success">
                            <i
                                className="fa-solid fa-check detail-icon-success"
                                style={{ color: '#fff', lineHeight: '60px' }}
                            ></i>
                        </div>
                        <p className="sub-a-success" style={{ color: '#fff' }}>
                            Ngài đã đặt hàng thành công
                        </p>
                    </div>
                </div>
            )}

            {/* Start modal add cart success */}
            <div onClick={() => setIsNotiSuccess(false)}>
                <NotifyModalSuccess isSuccess={isNotiSuccess} detailNoti={detailNoti} />
            </div>
            <div onClick={() => setIsNotiFail(false)}>
                <NotifyModalFail isFail={isNotiFail} detailNoti={detailNoti} />
            </div>
        </>
    );
}
