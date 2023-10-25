import React, { useState, useEffect } from 'react';
import './ChangeInfo.scss';
import { toast } from 'react-toastify';
import { getToken } from '../../../Services/Token';
import { Link } from 'react-router-dom';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import axios from '../../../api/axios';

export default function ChangeInfo() {
    const [isUpdatePass, setIsUpdatePass] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [user, setUser] = useState([]);
    const [change, setChange] = useState([]);
    const [idAccount, setIdAccount] = useState('');
    const [isSuccess, setIsSuccess] = useState('');

    const getInfoUser = async () => {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get(axios.defaults.baseURL + '/account/info');
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
        try {
            const result = await axios.put(axios.defaults.baseURL + `/update_info/${idAccount}`, {
                name,
                phone,
                address,
            });
            setChange(!change);
            console.log(result);

            if (result.status === 200) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 3000);
            }
            if (result.status === 400) toast.warning(result.data.message);
            if (result.status === 200) toast.success(result.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getInfoUser();
    }, [change]);

    return (
        <div className="wrapper-profile ">
            <div className="container-profile ">
                <div className="sidebar-profile">
                    <div className="wrapper-sidebar">
                        <SidebarProfile />
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

            {/* Start modal add cart success */}
            {isSuccess && (
                <div className="modal-add-success" onClick={() => setIsSuccess(false)}>
                    <div className="modal-container-success">
                        <div className="cover-icon-success">
                            <i
                                class="fa-solid fa-check detail-icon-success"
                                style={{ color: '#fff', lineHeight: '60px' }}
                            ></i>
                        </div>
                        <p className="sub-a-success" style={{ color: '#fff' }}>
                            Ngài đã thay đổi thông tin thành công
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
