import React, { useState, useEffect } from 'react';
import './OrderHistory.scss';
import { getToken } from '../../../Services/Token';
import { checkToken } from '../../../api/UserServices';
import axios from '../../../api/axios';
import moment from 'moment';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import { toast } from 'react-toastify';
import config from '../../../api/base';

export default function OrderHistory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listOrderByAccount, setListOrderByAccount] = useState([]);
    const [detailOrderByStatus, setDetailOrderByStatus] = useState([]);
    const [change, setChange] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState();
    const [id_order, setIDOrder] = useState();
    const [listOrderDetail, setListOrderDetail] = useState([]);

    const [activeTab, setActiveTab] = useState('tab1');
    const handleTabClick = (tabName, status) => {
        setActiveTab(tabName);
        setStatus(status);
    };

    const showModalDetail = async (item) => {
        setIDOrder(item.id_order);
        setIsModalOpen(true);
        getListOrderDetail(item.id_order);
    };

    const hideModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    async function getOrderList() {
        let token = await getToken();
        let data = await checkToken(token);
        console.log(data.userInfo.id_account);
        try {
            let orderByAccount = await axios.get(
                axios.defaults.baseURL + `/account/order-history-by-account/${data.userInfo.id_account}`,
            );
            setListOrderByAccount(orderByAccount?.data.listOrder);
        } catch (error) {
            console.log('lỗi:', error);
        }
    }

    const getOrderByStatus = async (status) => {
        let token = await getToken();

        let data = await checkToken(token);

        try {
            let orderByStatus = await axios.get(
                axios.defaults.baseURL + `/account/order-history-by-status/${data.userInfo.id_account}/${status}`,
            );
            setDetailOrderByStatus(orderByStatus?.data.listOrder);
        } catch (error) {}
    };

    async function getListOrderDetail(id_order) {
        try {
            const result = await axios.get(axios.defaults.baseURL + `/admin/detail-order/${id_order}`);
            setListOrderDetail(result?.data.listOrderDetail);
        } catch (error) {}
    }

    const handleCancel = async (id_order) => {
        try {
            let result = await axios.post(axios.defaults.baseURL + `/admin/cancel-order/${id_order}`);
            setChange(!change);
            if (result.data.errCode === 0) toast.success(result.data.message);
            setChange(!change);
        } catch (error) {}
    };

    useEffect(() => {
        getOrderList();
    }, [change]);

    useEffect(() => {
        getOrderByStatus(status);
    }, [status]);

    useEffect(() => {
        getListOrderDetail();
    }, [change]);

    let shipFee = 20000;
    // eslint-disable-next-line no-unused-vars
    let totalOriginalPrice = 0;
    let totalReducedPrice = 0;

    listOrderDetail[0]?.products?.forEach((item) => {
        totalOriginalPrice += item?.price * item?.quantity;
        totalReducedPrice += item?.price_reducing * item?.quantity;
    });

    // Tính số tiền giảm giá từ mã khuyến mãi
    const discountAmount =
        (((listOrderDetail && listOrderDetail[0]?.discount_percentage) || 0) / 100) * totalReducedPrice;

    // Tính tổng tiền sau khi giảm giá
    const totalAfterDiscount = totalReducedPrice - discountAmount + shipFee;

    const countOrdersByStatus = (status) => {
        if (!listOrderByAccount) {
            return 0;
        }

        return listOrderByAccount.reduce((count, item) => {
            if (item.status === status) {
                return count + 1;
            }
            return count;
        }, 0);
    };

    // Sử dụng hàm để đếm số lượng đơn hàng cho từng trạng thái
    const countWaiting = countOrdersByStatus(1);
    const countDelivering = countOrdersByStatus(2);
    const countComplete = countOrdersByStatus(0);
    const countCancel = countOrdersByStatus(3);
    const countAllOrder = countWaiting + countDelivering + countComplete + countCancel;

    return (
        <div className="wrapper-profile ">
            <div className="container-profile ">
                <div className="sidebar-profile">
                    <div className="wrapper-sidebar">
                        <SidebarProfile />
                    </div>
                </div>
                <div className="sidebar-cart-info">
                    <div className="wrapper-header-myorder">
                        <h5>ĐƠN HÀNG CỦA TÔI</h5>
                        <div className="lists-status-cart">
                            <div
                                className={activeTab === 'tab1' ? 'active' : 'status-item'}
                                onClick={() => handleTabClick('tab1')}
                                style={{ borderLeft: '2px solid #ccc' }}
                            >
                                <p className="count-of-status">{countAllOrder}</p>
                                <p className="name-status">Tất cả</p>
                            </div>

                            <div
                                className={activeTab === 'tab2' ? 'active' : 'status-item'}
                                onClick={() => handleTabClick('tab2', 1)}
                            >
                                <p className="count-of-status">{countWaiting}</p>
                                <p className="name-status">Chờ xác nhận</p>
                            </div>

                            <div
                                className={activeTab === 'tab3' ? 'active' : 'status-item'}
                                onClick={() => handleTabClick('tab3', 2)}
                            >
                                <p className="count-of-status">{countDelivering}</p>
                                <p className="name-status">Đang giao</p>
                            </div>

                            <div
                                className={activeTab === 'tab4' ? 'active' : 'status-item'}
                                onClick={() => handleTabClick('tab4', 0)}
                            >
                                <p className="count-of-status">{countComplete}</p>
                                <p className="name-status">Hoàn tất</p>
                            </div>

                            <div
                                className={activeTab === 'tab5' ? 'active' : 'status-item'}
                                onClick={() => handleTabClick('tab5', 3)}
                                style={{ borderRight: '2px solid #ccc' }}
                            >
                                <p className="count-of-status">{countCancel}</p>
                                <p className="name-status">Bị hủy</p>
                            </div>
                        </div>
                    </div>
                    {activeTab === 'tab1' && (
                        <div className="wrapper-info-myorder">
                            <div className="more-info-myorder">
                                <div className="title-more-info">
                                    <p>Mã đơn hàng</p>
                                    <p>Ngày mua</p>
                                    <p>Người nhận</p>
                                    <p>Địa chỉ</p>
                                    <p>Trạng thái</p>
                                    <p>Thao tác</p>
                                </div>

                                {listOrderByAccount &&
                                    listOrderByAccount?.map((item, index) => {
                                        return (
                                            <div className="detail-title" key={item.id_order}>
                                                <p>MH{item.id_order}</p>
                                                <p>{moment(item.order_time).format('llll')}</p>
                                                <p>{item.name}</p>
                                                <p>{item.address}</p>
                                                {item.status === 0 ? (
                                                    <p style={{ color: 'blue' }}>Đã hoàn thành</p>
                                                ) : item.status === 1 ? (
                                                    <p style={{ color: '#FFD700' }}>Chờ xác nhận</p>
                                                ) : item.status === 2 ? (
                                                    <p style={{ color: 'green' }}>Đang giao</p>
                                                ) : (
                                                    <p style={{ color: 'red' }}>Đã huỷ</p>
                                                )}
                                                <button onClick={() => showModalDetail(item)} className="detail-btn">
                                                    Xem chi tiết
                                                </button>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'tab2' && (
                        <div className="wrapper-info-myorder">
                            <div className="more-info-myorder">
                                <div className="title-more-info">
                                    <p>Mã đơn hàng</p>
                                    <p>Ngày mua</p>
                                    <p>Người nhận</p>
                                    <p>Địa chỉ</p>
                                    <p>Trạng thái</p>
                                    <p>Thao tác</p>
                                </div>

                                {listOrderByAccount &&
                                    listOrderByAccount?.map((item, index) => {
                                        return (
                                            <div className="detail-title" key={item.id_order}>
                                                {item.status === 1 ? (
                                                    <>
                                                        <p>MH{item.id_order}</p>
                                                        <p>{moment(item.order_time).format('llll')}</p>
                                                        <p>{item.name}</p>
                                                        <p>{item.address}</p>
                                                        <p style={{ color: '#FFD700' }}>Chờ xác nhận</p>
                                                        <button
                                                            onClick={() => showModalDetail(item)}
                                                            className="detail-btn"
                                                        >
                                                            Xem chi tiết
                                                        </button>
                                                    </>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'tab3' && (
                        <div className="wrapper-info-myorder">
                            <div className="more-info-myorder">
                                <div className="title-more-info">
                                    <p>Mã đơn hàng</p>
                                    <p>Ngày mua</p>
                                    <p>Người nhận</p>
                                    <p>Địa chỉ</p>
                                    <p>Trạng thái</p>
                                    <p>Thao tác</p>
                                </div>

                                {listOrderByAccount &&
                                    listOrderByAccount?.map((item, index) => {
                                        return (
                                            <div className="detail-title" key={item.id_order}>
                                                {item.status === 2 ? (
                                                    <>
                                                        <p>MH{item.id_order}</p>
                                                        <p>{moment(item.order_time).format('llll')}</p>
                                                        <p>{item.name}</p>
                                                        <p>{item.address}</p>
                                                        <p style={{ color: 'green' }}>Đang giao</p>
                                                        <button
                                                            onClick={() => showModalDetail(item)}
                                                            className="detail-btn"
                                                        >
                                                            Xem chi tiết
                                                        </button>
                                                    </>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'tab4' && (
                        <div className="wrapper-info-myorder">
                            <div className="more-info-myorder">
                                <div className="title-more-info">
                                    <p>Mã đơn hàng</p>
                                    <p>Ngày mua</p>
                                    <p>Người nhận</p>
                                    <p>Địa chỉ</p>
                                    <p>Trạng thái</p>
                                    <p>Thao tác</p>
                                </div>

                                {listOrderByAccount &&
                                    listOrderByAccount?.map((item, index) => {
                                        return (
                                            <div className="detail-title" key={item.id_order}>
                                                {item.status === 0 ? (
                                                    <>
                                                        <p>MH{item.id_order}</p>
                                                        <p>{moment(item.order_time).format('llll')}</p>
                                                        <p>{item.name}</p>
                                                        <p>{item.address}</p>
                                                        <p style={{ color: 'green' }}>Hoàn thành</p>
                                                        <button
                                                            onClick={() => showModalDetail(item)}
                                                            className="detail-btn"
                                                        >
                                                            Xem chi tiết
                                                        </button>
                                                    </>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'tab5' && (
                        <div className="wrapper-info-myorder">
                            <div className="more-info-myorder">
                                <div className="title-more-info">
                                    <p>Mã đơn hàng</p>
                                    <p>Ngày mua</p>
                                    <p>Người nhận</p>
                                    <p>Địa chỉ</p>
                                    <p>Trạng thái</p>
                                    <p>Thao tác</p>
                                </div>

                                {listOrderByAccount &&
                                    listOrderByAccount?.map((item, index) => {
                                        return (
                                            <div className="detail-title" key={item.id_order}>
                                                {item.status === 3 ? (
                                                    <>
                                                        <p>MH{item.id_order}</p>
                                                        <p>{moment(item.order_time).format('llll')}</p>
                                                        <p>{item.name}</p>
                                                        <p>{item.address}</p>
                                                        <p style={{ color: 'red' }}>Đã huỷ</p>
                                                        <button
                                                            onClick={() => showModalDetail(item)}
                                                            className="detail-btn"
                                                        >
                                                            Xem chi tiết
                                                        </button>
                                                    </>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Start: Modal */}
            {isModalOpen && (
                <div className="modal-order-wrapper" onClick={hideModal}>
                    <div
                        className="modal-order-container"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="close-modal-btn" onClick={hideModal}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className="modal-order-inner">
                            <div className="modal-header-order">
                                <h6 className="modal-header-title">CHI TIẾT ĐƠN HÀNG</h6>

                                {listOrderDetail && listOrderDetail[0]?.status === 0 ? (
                                    <p className="hightlight-status-done">
                                        <span className="status-order-cancel">Đã hoàn thành</span>
                                    </p>
                                ) : listOrderDetail && listOrderDetail[0]?.status === 1 ? (
                                    <p className="hightlight-status-wait">
                                        <span className="status-order-wait">Chờ xác nhận</span>
                                    </p>
                                ) : listOrderDetail && listOrderDetail[0]?.status === 2 ? (
                                    <p className="hightlight-status-delivery">
                                        <span className="status-order-cancel">Đang giao</span>
                                    </p>
                                ) : (
                                    <p className="hightlight-status-cancel">
                                        <span className="status-order-cancel">Bị hủy</span>
                                    </p>
                                )}

                                <div className="modal-header-content">
                                    <div className="left-modal-content">
                                        <p className="code-order-label">
                                            Mã đơn hàng :{' '}
                                            <span className="code-order">
                                                MH
                                                {listOrderDetail && listOrderDetail[0]?.id_order}
                                            </span>
                                        </p>
                                        <p className="code-order-label">
                                            Ngày mua :{' '}
                                            <span className="code-order">
                                                {moment(listOrderDetail && listOrderDetail[0]?.order_time).format(
                                                    'llll',
                                                )}
                                            </span>
                                        </p>
                                        <p className="code-order-label">
                                            Tổng tiền :{' '}
                                            <span className="code-order">
                                                {totalAfterDiscount.toLocaleString('vi', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                        </p>
                                        <p className="code-order-label">
                                            Thông tin xuất hóa đơn : <span className="code-order">(Không có)</span>
                                        </p>
                                        <p className="code-order-label">
                                            GTGT : <span className="code-order">(Không có)</span>
                                        </p>
                                        <p className="code-order-label">
                                            Ghi chú : <span className="code-order">(Không có)</span>
                                        </p>
                                    </div>

                                    <div className="right-modal-content">
                                        {(listOrderDetail && listOrderDetail[0]?.status === 1) ||
                                        (listOrderDetail && listOrderDetail[0]?.status === 2) ? (
                                            <button
                                                className="btn-cancel-order"
                                                onClick={() =>
                                                    handleCancel(listOrderDetail && listOrderDetail[0]?.id_order)
                                                }
                                            >
                                                Hủy đơn hàng
                                            </button>
                                        ) : null}
                                        {/* <button className="btn-re-order">Đặt hàng lại</button> */}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="modal-body-top">
                                    <div className="modal-info-receiver">
                                        <h5 className="modal-info-title">Thông tin người nhận</h5>
                                        <p className="modal-info-name">
                                            Tên khách hàng : {listOrderDetail && listOrderDetail[0]?.name_receiver}
                                        </p>
                                        <p className="modal-info-address">
                                            Địa chỉ :{listOrderDetail && listOrderDetail[0]?.name_address}
                                        </p>
                                        <p className="modal-info-tel">
                                            Số điện thoại :
                                            <span className="modal-phone-number">
                                                {listOrderDetail && listOrderDetail[0]?.phone_receiver}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="modal-info-receiver">
                                        <h5 className="modal-info-title">Phương thức vận chuyển</h5>
                                        <p className="modal-info-name">Giao hàng tiêu chuẩn</p>
                                    </div>

                                    <div className="modal-info-receiver">
                                        <h5 className="modal-info-title">Phương thức thanh toán</h5>
                                        <p className="modal-info-name">Thanh toán bằng tiền mặt khi nhận hàng</p>
                                    </div>
                                </div>
                                <div className="modal-body-bottom">
                                    {/* Bắt đầu: trạng thái hủy */}

                                    {listOrderDetail && listOrderDetail[0]?.status === 0 ? (
                                        <div className="body-bottom-inner">
                                            <i class="icon-progress fa-regular fa-square-check"></i>
                                            <div className="icon-body-status"></div>
                                            <p className="title-icon">Giao hàng thành công</p>
                                            {/* <div className="line-progress"></div> */}
                                        </div>
                                    ) : listOrderDetail && listOrderDetail[0]?.status === 1 ? (
                                        <div className="body-bottom-inner">
                                            <div className="icon-body-status"></div>
                                            <i class="icon-progress fa-solid fa-box-open"></i>
                                            <p className="title-icon">Đang xử lý</p>
                                            {/* <div className="line-progress"></div> */}
                                        </div>
                                    ) : listOrderDetail && listOrderDetail[0]?.status === 2 ? (
                                        <div className="body-bottom-inner">
                                            <i class="icon-progress fa-solid fa-truck"></i>
                                            <div className="icon-body-status"></div>
                                            <p className="title-icon">Đang giao</p>
                                            {/* <div className="line-progress"></div> */}
                                        </div>
                                    ) : (
                                        <div className="body-bottom-inner">
                                            <i class="icon-progress fa-solid fa-xmark"></i>
                                            <div className="icon-body-status"></div>
                                            <p className="title-icon">Bị hủy</p>
                                        </div>
                                    )}

                                    {/* <div className="body-bottom-inner">
                                        <div className="icon-body-status"></div>
                                        <i class="icon-progress fa-solid fa-clipboard-check"></i>
                                        <p className="title-icon">Đơn hàng mới</p>
                                        <div className="line-progress"></div>
                                    </div>

                                    <div className="body-bottom-inner">
                                        <div className="icon-body-status"></div>
                                        <i class="icon-progress fa-solid fa-box-open"></i>
                                        <p className="title-icon">Đang xử lý</p>
                                        <div className="line-progress"></div>
                                    </div>

                                    <div className="body-bottom-inner">
                                        <i class="icon-progress fa-solid fa-truck"></i>
                                        <div className="icon-body-status"></div>
                                        <p className="title-icon">Đang giao</p>
                                        <div className="line-progress"></div>
                                    </div>

                                    <div className="body-bottom-inner">
                                        <i class="icon-progress fa-regular fa-square-check"></i>
                                        <div className="icon-body-status"></div>
                                        <p className="title-icon">Giao hàng thành công</p>
                                        <div className="line-progress"></div>
                                    </div>

                                    <div className="body-bottom-inner">
                                        <i class="icon-progress fa-solid fa-xmark"></i>
                                        <div className="icon-body-status"></div>
                                        <p className="title-icon">Bị hủy</p>
                                    </div> */}
                                    {/* Kết thúc trạng thái hủy */}
                                </div>
                            </div>
                            <div className="modal-footer-order">
                                <h5>Danh sách sản phẩm</h5>
                                <div className="table-detail-order" style={{ display: 'table' }}>
                                    <div className="table-order-row" style={{ display: 'table-row' }}>
                                        <p style={{ fontWeight: 'bold' }} className="table-order-cell">
                                            Hình ảnh
                                        </p>
                                        <p style={{ fontWeight: 'bold' }} className="table-order-cell">
                                            Tên sản phẩm
                                        </p>
                                        <p style={{ fontWeight: 'bold' }} className="table-order-cell">
                                            Mã sản phẩm
                                        </p>
                                        <p style={{ fontWeight: 'bold' }} className="table-order-cell">
                                            Giá bán
                                        </p>
                                        <p style={{ fontWeight: 'bold' }} className="table-order-cell">
                                            SL
                                        </p>
                                        <p style={{ fontWeight: 'bold' }} className="table-order-cell">
                                            Thành tiền
                                        </p>
                                    </div>

                                    {listOrderDetail &&
                                        listOrderDetail[0]?.products?.map((item, index) => {
                                            return (
                                                <div className="table-order-row" key={index}>
                                                    <p className="table-order-cell">
                                                        <img
                                                            src={`${config.PUBLIC_IMAGE_URL}${item && item?.images}`}
                                                            alt=""
                                                            className="footer-order-image"
                                                        />
                                                    </p>
                                                    <p className="table-order-cell" style={{ maxWidth: '200px' }}>
                                                        {item && item?.name_product}
                                                    </p>
                                                    <p className="table-order-cell" style={{ whiteSpace: 'nowrap' }}>
                                                        VN{item && item?.id_product}
                                                    </p>
                                                    <p className="table-order-cell" style={{ whiteSpace: 'nowrap' }}>
                                                        {item &&
                                                            item?.price_reducing.toLocaleString('vi', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}
                                                        <span
                                                            style={{
                                                                display: 'block',
                                                                textDecoration: 'line-through',
                                                                color: '#ccc',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {item &&
                                                                item?.original_price.toLocaleString('vi', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                })}
                                                        </span>
                                                    </p>
                                                    <p className="table-order-cell" style={{ minWidth: '80px' }}>
                                                        {item && item?.quantity}
                                                    </p>
                                                    <p className="table-order-cell" style={{ whiteSpace: 'nowrap' }}>
                                                        {(
                                                            (item && item?.price_reducing) * (item && item?.quantity)
                                                        ).toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>

                                <div className="footer-count-money">
                                    <p className="code-order-label">
                                        Tổng tiền :{' '}
                                        <span className="code-order">
                                            {totalReducedPrice.toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                    </p>
                                    <p className="code-order-label">
                                        Giảm giá :{' '}
                                        <span className="code-order">
                                            {discountAmount?.toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                    </p>
                                    <p className="code-order-label">
                                        Phí vận chuyển :{' '}
                                        <span className="code-order">
                                            {shipFee.toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                    </p>
                                    <p className="code-order-label" style={{ fontSize: '20px', color: '#fa0001' }}>
                                        Thành tiền :{' '}
                                        <span className="code-order">
                                            {totalAfterDiscount?.toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* End: Modal */}
        </div>
    );
}
