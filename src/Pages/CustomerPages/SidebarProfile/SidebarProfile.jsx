import { Link } from 'react-router-dom';
import './SidebarProfile';

export default function SidebarProfile() {
    return (
        <>
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
        </>
    );
}
