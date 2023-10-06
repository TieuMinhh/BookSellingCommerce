import { Link } from 'react-router-dom';
import './ChangeAddress.scss';

export default function ChangeAddress() {
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
                <div className="sidebar-item-info">
                    <h5>THÊM ĐỊA CHỈ MỚI</h5>
                    <div className="wrapper-change-address">
                        <div className="wrapper-info-contact">
                            <h6>Thông tin liên hệ</h6>
                            <div className="cover-input-address">
                                <input type="text" name="" id="" className="form-controll-contact" placeholder="Tên" />
                            </div>
                            <div className="cover-input-address">
                                <input type="text" name="" id="" className="form-controll-contact" placeholder="Họ" />
                            </div>
                            <div className="cover-input-address">
                                <input
                                    type="number"
                                    name=""
                                    id=""
                                    className="form-controll-contact"
                                    placeholder="Ex: 0972xxxx"
                                />
                            </div>
                            <div className="cover-input-address">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="form-controll-contact"
                                    placeholder="Địa chỉ"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>

                    <div className="cover-btn-save">
                        <button className="btn-save">LƯU ĐỊA CHỈ</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
