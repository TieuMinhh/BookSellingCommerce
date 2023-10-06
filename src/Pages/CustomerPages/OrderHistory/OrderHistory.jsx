import { Link } from 'react-router-dom';
import './OrderHistory.scss';
import BookDemo from '../../../Assets/img/tienganh12.jpg';
import { useState } from 'react';

export default function OrderHistory() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="wrapper-profile ">
            <div className="container-profile ">
                <div className="sidebar-profile">
                    <div className="wrapper-sidebar">
                        <h3>Tài khoản</h3>
                        <ul className="items-sidebar">
                            <li>
                                <Link to="/profile">Bảng điều khiển tài khoản</Link>
                            </li>
                            <li>
                                <Link to="/change-info">Thông tin tài khoản</Link>
                            </li>
                            <li>
                                <Link to="/change-password">Đổi mật khẩu</Link>
                            </li>
                            <li>
                                <Link to="/order-history">Đơn hàng của tôi</Link>
                            </li>
                            <li>
                                <Link to="/my-voucher">Ví voucher</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sidebar-cart-info">
                    <div className="wrapper-header-myorder">
                        <h5>ĐƠN HÀNG CỦA TÔI</h5>
                        <div className="lists-status-cart">
                            <div className="status-item" style={{ borderLeft: '2px solid #ccc' }}>
                                <p className="count-of-status">99</p>
                                <p className="name-status">Tất cả</p>
                            </div>
                            <div className="status-item">
                                <p className="count-of-status">37</p>
                                <p className="name-status">Chờ xác nhận</p>
                            </div>
                            <div className="status-item">
                                <p className="count-of-status">12</p>
                                <p className="name-status">Đang giao</p>
                            </div>
                            <div className="status-item">
                                <p className="count-of-status">10</p>
                                <p className="name-status">Hoàn tất</p>
                            </div>
                            <div className="status-item" style={{ borderRight: '2px solid #ccc' }}>
                                <p className="count-of-status">40</p>
                                <p className="name-status">Bị hủy</p>
                            </div>
                        </div>
                    </div>

                    <div className="wrapper-info-myorder">
                        <div className="more-info-myorder">
                            <div className="title-more-info">
                                <p>Mã đơn hàng</p>
                                <p>Ngày mua</p>
                                <p>Người nhận</p>
                                <p>Tổng tiền</p>
                                <p>Trạng thái</p>
                                <p></p>
                            </div>

                            <div className="detail-title">
                                <p>103312781</p>
                                <p>03/10/2023</p>
                                <p>Ming Xiao</p>
                                <p>85.000 đ</p>
                                <p>Bị hủy</p>
                                <button onClick={showModal} className="detail-btn">
                                    Xem chi tiết
                                </button>
                            </div>

                            <div className="detail-title">
                                <p>103312781</p>
                                <p>03/10/2023</p>
                                <p>Ming Xiao</p>
                                <p>85.000 đ</p>
                                <p>Bị hủy</p>
                                <button onClick={showModal} className="detail-btn">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Start: Modal */}
            {isModalOpen && (
                <div className="modal-order-wrapper">
                    <div className="modal-order-container">
                        <div className="close-modal-btn" onClick={hideModal}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className="modal-order-inner">
                            <div className="modal-header-order">
                                <h6 className="modal-header-title">CHI TIẾT ĐƠN HÀNG</h6>
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
