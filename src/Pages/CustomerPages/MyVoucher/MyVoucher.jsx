import './MyVoucher.scss';
import CuponIcon from '../../../Assets/svg/ico_coupon.svg';

export default function MyVoucher() {
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
                <div className="sidebar-voucher">
                    <div className="wrapper-header-voucher">
                        <h5>VÍ VOUCHER</h5>
                        <p>Voucher của tôi</p>
                        <div className="line-under"></div>
                    </div>
                    <div className="wrapper-content-voucher">
                        <div className="container-content-voucher">
                            <div className="header-content-voucher">
                                <img src={CuponIcon} alt="" />
                                <h6>KHUYẾN MÃI</h6>
                            </div>
                            <div className="detail-content-voucher">
                                <p className="title-voucher">MÃ GIẢM 30K - ĐƠN HÀNG TỪ 270K</p>
                                <p className="voucher-time">ÁP DỤNG TỪ THỨ 2 ĐẾN THỨ 4 HÀNG TUẦN</p>
                                <p className="detail-voucher">Chi tiết</p>
                            </div>

                            <div className="detail-content-voucher">
                                <p className="title-voucher">MÃ GIẢM 30K - ĐƠN HÀNG TỪ 270K</p>
                                <p className="voucher-time">ÁP DỤNG TỪ THỨ 2 ĐẾN THỨ 4 HÀNG TUẦN</p>
                                <p className="detail-voucher">Chi tiết</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
