import './OrderHistory.scss';

export default function OrderHistory() {
    return (
        <div className="wrapper-profile ">
            <div className="container-profile ">
                <div className="sidebar-profile">
                    <div className="wrapper-sidebar">
                        <h3>Tài khoản</h3>
                        <ul className="items-sidebar">
                            <li>
                                <a href="profile">Bảng điều khiển tài khoản</a>
                            </li>
                            <li>
                                <a href="change-info">Thông tin tài khoản</a>
                            </li>
                            <li>
                                <a href="change-address">Sổ địa chỉ</a>
                            </li>
                            <li>
                                <a href="order-history">Đơn hàng của tôi</a>
                            </li>
                            <li>
                                <a href="my-voucher">Ví voucher</a>
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
                                <button className="detail-btn">Xem chi tiết</button>
                            </div>

                            <div className="detail-title">
                                <p>103312781</p>
                                <p>03/10/2023</p>
                                <p>Ming Xiao</p>
                                <p>85.000 đ</p>
                                <p>Bị hủy</p>
                                <button className="detail-btn">Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
