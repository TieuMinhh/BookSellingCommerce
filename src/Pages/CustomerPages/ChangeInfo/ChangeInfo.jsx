import React, { useState, useEffect } from 'react';
import './ChangeInfo.scss';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getToken } from '../../../Services/Token';

export default function ChangeInfo() {
    const [isUpdatePass, setIsUpdatePass] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [user, setUser] = useState([]);
    const [change, setChange] = useState([]);
    const [idAccount, setIdAccount] = useState('');

    const handleInputPassword = (e) => {
        if (e.target.checked) {
            setIsUpdatePass(true);
        } else {
            setIsUpdatePass(false);
        }
    };

    const getInfoUser = async () => {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get('http://localhost:8081/api/v1/account/info');
        setUser(result.data.userInfo);
        // console.log('Check token neeee:', result.data.userInfo);

        if (result?.data.userInfo) {
            let data = result.data.userInfo;
            setName(data.name);
            setPhone(data.phone);
            setAddress(data.address);
            setIdAccount(data.id_account);
            // console.log(idAccount, name, phone, address);
        }
    };

    async function ChangeInfo() {
        // console.log('id account là :', idAccount);
        // console.log(idAccount, name, phone, address);
        const result = await axios.put(`http://localhost:8081/api/v1/update_info/${idAccount}`, {
            name,
            phone,
            address,
        });
        setChange(!change);
        console.log(result);

        if (result.status === 200) toast.success(result.data.message);
        if (result.status === 400) toast.warning(result.data.message);
    }

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
                    <div className="wrapper-change-profile">
                        <h5>THÔNG TIN TÀI KHOẢN</h5>
                        <div className="wrapper-change-info">
                            <div className="cover-input">
                                <label htmlFor="">Họ Tên</label>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="form-control-input"
                                    placeholder="Họ tên..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="cover-input">
                                <label htmlFor="">Số điện thoại</label>
                                <input
                                    type="number"
                                    name=""
                                    id=""
                                    className="form-control-input"
                                    placeholder="SĐT..."
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        
                            <div className="cover-btn" onClick={ChangeInfo}>
                                <button className="update-btn">Lưu thay đổi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
