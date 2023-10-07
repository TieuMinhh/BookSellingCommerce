import { Link } from 'react-router-dom';
import './Profile.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../../Services/Token';

export default function Profile() {
    const [user, getUser] = useState([]);
    const [change, setChange] = useState([]);

    const getInfoUser = async () => {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get('http://localhost:8081/api/v1/account/info');
        getUser(result.data.userInfo);
        console.log('Check token neeee:', result.data.userInfo);
    };

    useEffect(() => {
        getInfoUser();
    }, [change]);

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
                    <div className="wrapper-info-profile">
                        <h5>BẢNG ĐIỀU KHIỂN CỦA KHÁCH HÀNG</h5>
                        <div className="wrapper-detail-info">
                            <div className="detail-info-profile">
                                <p className="user-name-profile ">
                                    Họ và tên: <strong>{user && user?.name}</strong>
                                </p>
                                <p className="user-email-profile ">
                                    Email: <strong>{user && user?.email}</strong>
                                </p>
                                <p className="user-level-profile ">
                                    Cấp độ thành viên: <strong>Thân Thiết</strong>
                                </p>
                                <h6>Thông tin tài khoản</h6>

                                <p>
                                    Số đơn hàng thành công năm 2023 <span>9</span>
                                </p>
                                <p>
                                    Số tiền đã thanh toán năm 2023 <span>9</span>
                                </p>
                            </div>
                        </div>

                        <div className="user-detail-address">
                            <h5>SỔ ĐỊA CHỈ</h5>
                            <h6>ĐỊA CHỈ GIAO HÀNG MẶC ĐỊNH</h6>
                            <p>{user && user?.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
