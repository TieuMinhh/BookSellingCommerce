import './MyVoucher.scss';
import CuponIcon from '../../../Assets/svg/ico_coupon.svg';
import { Link } from 'react-router-dom';

export default function MyVoucher() {
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
                                <Link to="/change-address">Sổ địa chỉ</Link>
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
