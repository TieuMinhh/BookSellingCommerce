import { useState } from 'react';
import './ChangeInfo.scss';
import { Link } from 'react-router-dom';

export default function ChangeInfo() {
    const [isUpdatePass, setIsUpdatePass] = useState(false);

    const handleInputPassword = (e) => {
        if (e.target.checked) {
            setIsUpdatePass(true);
        } else {
            setIsUpdatePass(false);
        }
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
                        <h5>THÔNG TIN TÀI KHOẢN</h5>
                        <div className="wrapper-change-info">
                            <div className="cover-input">
                                <label htmlFor="">Họ</label>

                                <input className="form-control-input" type="text" name="" id="" placeholder="Họ..." />
                            </div>

                            <div className="cover-input">
                                <label htmlFor="">Tên</label>
                                <input type="text" name="" id="" className="form-control-input" placeholder="Tên..." />
                            </div>

                            <div className="cover-input">
                                <label htmlFor="">Số điện thoại</label>
                                <input
                                    type="number"
                                    name=""
                                    id=""
                                    className="form-control-input"
                                    placeholder="SĐT..."
                                />
                            </div>

                            <div className="cover-input">
                                <label htmlFor="">Email</label>
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    className="form-control-input"
                                    placeholder="Email..."
                                />
                            </div>

                            <div className="cover-input">
                                <label htmlFor="">Địa chỉ</label>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="form-control-input"
                                    placeholder="Địa chỉ..."
                                />
                            </div>

                            <div className="cover-input">
                                <label htmlFor="">Birthday</label>
                                <div className="cover-input-birthday">
                                    <input
                                        style={{ textAlign: 'center' }}
                                        type="text"
                                        name=""
                                        id=""
                                        className="form-control-input"
                                        readOnly
                                        value="28"
                                    />
                                    <input
                                        style={{ textAlign: 'center' }}
                                        type="text"
                                        name=""
                                        id=""
                                        className="form-control-input"
                                        readOnly
                                        value="09"
                                    />
                                    <input
                                        style={{ textAlign: 'center' }}
                                        type="text"
                                        name=""
                                        id=""
                                        className="form-control-input"
                                        readOnly
                                        value="2001"
                                    />
                                </div>
                            </div>

                            <div className="cover-input">
                                <label htmlFor="">Đổi mật khẩu</label>
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    className="form-control-checkbox"
                                    onChange={handleInputPassword}
                                />
                            </div>

                            {isUpdatePass && (
                                <>
                                    {' '}
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
                                </>
                            )}

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
