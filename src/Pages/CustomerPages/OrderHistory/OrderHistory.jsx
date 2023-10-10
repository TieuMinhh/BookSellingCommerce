import { Link } from 'react-router-dom';
import './OrderHistory.scss';
import BookDemo from '../../../Assets/img/tienganh12.jpg';
import React, { useState, useEffect } from 'react';
import { getToken } from '../../../Services/Token';
import { checkToken } from '../../../api/UserServices';
import axios from 'axios';
import moment from 'moment';
import SidebarProfile from '../SidebarProfile/SidebarProfile';

export default function OrderHistory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, getUser] = useState([]);
    const [listOrderByAccount, setListOrderByAccount] = useState([]);
    const [detailOrderByStatus, setDetailOrderByStatus] = useState([]);
    const [change, setChange] = useState([]);
    const [statusCart, setStatusCart] = useState(1);

    const showModalDetail = (item) => {
        console.log('id order là :', item.id_order);
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    async function getOrderList() {
        // let token = await getToken();
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // let result = await axios.get('http://localhost:8081/api/v1/account/info');
        // getUser(result.data.userInfo);
        // console.log('Check token neeee:', result.data.userInfo);
        let token = await getToken();

        let data = await checkToken(token);

        let orderByAccount = await axios.get(
            `http://localhost:8081/api/v1/account/donhangtheotaikhoan/${data.userInfo.id_account}`,
        );
        setListOrderByAccount(orderByAccount?.data.listOrder);
        console.log(orderByAccount.data);
    }

    const getOrderByStatus = async (status) => {
        // let token = await getToken();
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // let result = await axios.get('http://localhost:8081/api/v1/account/info');
        // getUser(result.data.userInfo);
        // console.log('Check token neeee:', result.data.userInfo);
        let token = await getToken();

        let data = await checkToken(token);

        let orderByStatus = await axios.get(
            `http://localhost:8081/api/v1/account/lichsudathang/${data.userInfo.id_account}/${status}`,
        );
        setDetailOrderByStatus(orderByStatus?.data.listOrder);
        console.log(orderByStatus.data);
    };

    useEffect(() => {
        getOrderList();
        getOrderByStatus();
    }, [change]);

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
                                className="status-item"
                                style={{ borderLeft: '2px solid #ccc' }}
                                onClick={() => setStatusCart(1)}
                            >
                                <p className={statusCart === 1 ? 'count-of-status active' : 'count-of-status'}>99</p>
                                <p className={statusCart === 1 ? 'name-status active' : 'name-status'}>Tất cả</p>
                            </div>
                            <div className="status-item" onClick={() => setStatusCart(2)}>
                                <p className={statusCart === 2 ? 'count-of-status active' : 'count-of-status'}>37</p>
                                <p className={statusCart === 2 ? 'name-status active' : 'name-status'}>Chờ xác nhận</p>
                            </div>
                            <div className="status-item" onClick={() => setStatusCart(3)}>
                                <p className={statusCart === 3 ? 'count-of-status active' : 'count-of-status'}>12</p>
                                <p className={statusCart === 3 ? 'name-status active' : 'name-status'}>Đang giao</p>
                            </div>
                            <div className="status-item" onClick={() => setStatusCart(4)}>
                                <p className={statusCart === 4 ? 'count-of-status active' : 'count-of-status'}>10</p>
                                <p className={statusCart === 4 ? 'name-status active' : 'name-status'}>Hoàn tất</p>
                            </div>
                            <div
                                className="status-item"
                                style={{ borderRight: '2px solid #ccc' }}
                                onClick={() => setStatusCart(5)}
                            >
                                <p className={statusCart === 5 ? 'count-of-status active' : 'count-of-status'}>40</p>
                                <p className={statusCart === 5 ? 'name-status active' : 'name-status'}>Bị hủy</p>
                            </div>
                        </div>
                    </div>

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
                                listOrderByAccount.map((item, index) => {
                                    return (
                                        <div className="detail-title">
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
                                <p className="hightlight-status-wait">
                                    <span className="status-order-wait">Chờ xác nhận</span>
                                </p>
                                <p className="hightlight-status-delivery">
                                    <span className="status-order-cancel">Đang giao</span>
                                </p>
                                <p className="hightlight-status-done">
                                    <span className="status-order-cancel">Hoàn tất</span>
                                </p>
                                <p className="hightlight-status-cancel">
                                    <span className="status-order-cancel">Bị hủy</span>
                                </p>
                                <div className="modal-header-content">
                                    <div className="left-modal-content">
                                        <p className="code-order-label">
                                            Mã đơn hàng: <span className="code-order">103312781</span>
                                        </p>
                                        <p className="code-order-label">
                                            Ngày mua: <span className="code-order">03/10/2023</span>
                                        </p>
                                        <p className="code-order-label">
                                            Tổng tiền: <span className="code-order">85.000 đ</span>
                                        </p>
                                        <p className="code-order-label">
                                            Thông tin xuất hóa đơn: <span className="code-order">(Không có)</span>
                                        </p>
                                        <p className="code-order-label">
                                            GTGT: <span className="code-order">(Không có)</span>
                                        </p>
                                        <p className="code-order-label">
                                            Ghi chú: <span className="code-order">(Không có)</span>
                                        </p>
                                    </div>

                                    <div className="right-modal-content">
                                        <button className="btn-re-order">Đặt hàng lại</button>
                                        <button className="btn-cancel-order">Hủy đơn hàng</button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="modal-body-top">
                                    <div className="modal-info-receiver">
                                        <h5 className="modal-info-title">Thông tin người nhận</h5>
                                        <p className="modal-info-name">Xiao Ming</p>
                                        <p className="modal-info-address">
                                            200 Dương Đình Hội, Phường An Dương, Quận Lê Chân, Hải Phòng, Việt Nam
                                        </p>
                                        <p className="modal-info-tel">
                                            Tel: <span className="modal-phone-number">0966932267</span>
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
                                    <div className="body-bottom-inner">
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
                                    </div>
                                    {/* Kết thúc trạng thái hủy */}
                                </div>
                            </div>
                            <div className="modal-footer-order">
                                <h5>Danh sách sản phẩm</h5>
                                {/* <p className="code-order-label">
                                    Mã đơn hàng: <span className="code-order">103312781</span>
                                </p>
                                <p className="hightlight-status-wait">
                                    Đơn hàng <span className="status-order-wait">Chờ xác nhận</span>
                                </p>
                                <p className="hightlight-status-delivery">
                                    Đơn hàng <span className="status-order-cancel">Đang giao</span>
                                </p>
                                <p className="hightlight-status-done">
                                    Đơn hàng <span className="status-order-cancel">Hoàn tất</span>
                                </p>
                                <p className="hightlight-status-cancel">
                                    Đơn hàng <span className="status-order-cancel">Bị hủy</span>
                                </p>
                                <p className="code-order-label">
                                    Tổng tiền: <span className="code-order">56.500 đ</span>
                                </p>
                                <p className="code-order-label">
                                    Số lượng: <span className="code-order">1</span>
                                </p> */}

                                <div className="table-detail-order" style={{ display: 'table' }}>
                                    <div className="table-order-row" style={{ display: 'table-row' }}>
                                        <p style={{ fontWeight: 'bold' }} className="table-order-cell">
                                            Hình ảnh
                                        </p>
                                        <p style={{ fontWeight: 'bold' }} className="table-order-cell">
                                            Tên sản phẩm
                                        </p>
                                        <p style={{ fontWeight: 'bold' }} className="table-order-cell">
                                            Sku
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
                                    {/*start Product */}
                                    <div className="table-order-row">
                                        <p className="table-order-cell">
                                            <img src={BookDemo} alt="" className="footer-order-image" />
                                        </p>
                                        <p className="table-order-cell" style={{ maxWidth: '200px' }}>
                                            Tuyển chọn các đề thi vào lớp 10 chuyên môn Ngữ Văn
                                        </p>
                                        <p className="table-order-cell" style={{ whiteSpace: 'nowrap' }}>
                                            8936041300415
                                        </p>
                                        <p className="table-order-cell" style={{ whiteSpace: 'nowrap' }}>
                                            1.000.500 đ
                                            <span
                                                style={{
                                                    display: 'block',
                                                    textDecoration: 'line-through',
                                                    color: '#ccc',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                2.000.000.000 đ
                                            </span>
                                        </p>
                                        <p className="table-order-cell" style={{ minWidth: '80px' }}>
                                            100
                                        </p>
                                        <p className="table-order-cell" style={{ whiteSpace: 'nowrap' }}>
                                            1.000.500 đ
                                        </p>
                                    </div>

                                    <div className="table-order-row">
                                        <p className="table-order-cell">
                                            <img src={BookDemo} alt="" className="footer-order-image" />
                                        </p>
                                        <p className="table-order-cell" style={{ maxWidth: '200px' }}>
                                            Tuyển chọn các đề thi vào lớp 10 chuyên môn Ngữ Văn
                                        </p>
                                        <p className="table-order-cell" style={{ whiteSpace: 'nowrap' }}>
                                            8936041300415
                                        </p>
                                        <p className="table-order-cell" style={{ whiteSpace: 'nowrap' }}>
                                            1.000.500 đ
                                            <span
                                                style={{
                                                    display: 'block',
                                                    textDecoration: 'line-through',
                                                    color: '#ccc',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                2.000.000.000 đ
                                            </span>
                                        </p>
                                        <p className="table-order-cell" style={{ minWidth: '80px' }}>
                                            100
                                        </p>
                                        <p className="table-order-cell" style={{ whiteSpace: 'nowrap' }}>
                                            1.000.500 đ
                                        </p>
                                    </div>
                                    {/* End product */}
                                </div>

                                <div className="footer-count-money">
                                    <p className="code-order-label">
                                        Thành tiền: <span className="code-order">1.000.000.000 đ</span>
                                    </p>
                                    <p className="code-order-label">
                                        Phí vận chuyển: <span className="code-order">1.000.000.000 đ</span>
                                    </p>
                                    <p className="code-order-label">
                                        Tổng Số Tiền (gồm VAT): <span className="code-order">1.000.000.000 đ</span>
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
