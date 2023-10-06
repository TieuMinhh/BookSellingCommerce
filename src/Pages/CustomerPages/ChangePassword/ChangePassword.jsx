import { Link } from 'react-router-dom';
import './ChangePassword.scss';

export default function ChangePassword() {
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
                <div className="sidebar-item-info">
                    <div className="wrapper-change-profile">
                        <h5>ĐỔI MẬT KHẨU</h5>
                        <div className="wrapper-change-info">
                            <div className="cover-input">
                                <label htmlFor="">Mật khẩu hiện tại</label>
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    className="form-control-input"
                                    placeholder="Mật khẩu hiện tại..."
                                />
                            </div>
                            <div className="cover-input">
                                <label htmlFor="">Mật khẩu mới</label>
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    className="form-control-input"
                                    placeholder="Mật khẩu mới..."
                                />
                            </div>
                            <div className="cover-input">
                                <label htmlFor="">Nhập lại mật khẩu mới</label>
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    className="form-control-input"
                                    placeholder="Nhập lại mật khẩu mới..."
                                />
                            </div>
                            <div className="cover-btn">
                                <button className="update-btn">Lưu thay đổi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
