import { NavLink } from 'react-router-dom';
import './SidebarProfile.scss';

export default function SidebarProfile() {
    return (
        <>
            <h3>Tài khoản</h3>
            <ul className="items-sidebar">
                <li>
                    <NavLink to="/profile">Bảng điều khiển tài khoản</NavLink>
                </li>
                <li>
                    <NavLink to="/change-info">Thông tin tài khoản</NavLink>
                </li>
                <li>
                    <NavLink to="/change-password">Đổi mật khẩu</NavLink>
                </li>
                <li>
                    <NavLink to="/order-history">Đơn hàng của tôi</NavLink>
                </li>
                <li>
                    <NavLink to="/my-voucher">Ví voucher</NavLink>
                </li>
            </ul>
        </>
    );
}
