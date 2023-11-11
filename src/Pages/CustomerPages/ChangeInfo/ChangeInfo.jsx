import React, { useState, useEffect } from 'react';
import './ChangeInfo.scss';
import { toast } from 'react-toastify';
import { getToken } from '../../../Services/Token';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import axios from '../../../api/axios';
import Loading from '../../../Components/Loading';
import { NotifyModalSuccess } from '../../../Components/NotifyModalSuccess/NotifyModalSuccess';
import { NotifyModalFail } from '../../../Components/NotifyModalFail/NotifyModalFail';

export default function ChangeInfo() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [user, setUser] = useState([]);
    const [change, setChange] = useState([]);
    const [idAccount, setIdAccount] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(false);

    const [isNotiSuccess, setIsNotiSuccess] = useState(false);
    const [detailNoti, setDetailNoti] = useState('');
    const [isNotiFail, setIsNotiFail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    const getInfoUser = async () => {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get(axios.defaults.baseURL + '/account/info');
        setLoading(true);
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

    const [initialPhone, setInitialPhone] = useState('');
    function handleOnChangePhone(e) {
        const inputPhone = e.target.value;
        const isValidPhone = /^0\d{9}$/.test(inputPhone);
        setPhone(inputPhone);
        setIsValidPhone(isValidPhone);
        if (initialPhone === '') {
            setInitialPhone(inputPhone); // Lưu số điện thoại ban đầu
        }
    }

    function handleBlurPhone() {
        setIsValidPhone(phone === '' || /^0\d{9}$/.test(phone));
    }

    async function ChangeInfo() {
        try {
            setLoadingAction(true);
            const result = await axios.put(axios.defaults.baseURL + `/update_info/${idAccount}`, {
                name,
                phone,
                address,
            });
            setLoadingAction(false);
            console.log(result);

            if (result.data.errCode === 0) {
                setIsNotiSuccess(true);
                setDetailNoti(result.data.message);
                setTimeout(() => {
                    setIsNotiSuccess(false);
                }, 5000);
                setChange(!change);
            }
            if (result.data.errCode === 1) {
                setIsNotiFail(true);
                setDetailNoti(result.data.message);
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 5000);
            }
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
                        {loading ? (
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
                                        onChange={handleOnChangePhone}
                                        onBlur={handleBlurPhone}
                                    />
                                </div>
                                {initialPhone !== '' && initialPhone !== phone && phone && !isValidPhone && (
                                    <span style={{ color: 'red', marginLeft: '180px' }}>
                                        Số điện thoại không hợp lệ
                                    </span>
                                )}

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
                        ) : (
                            <Loading pacman size={30} />
                        )}
                    </div>
                </div>
            </div>
            {/* Start modal add cart success */}
            <div onClick={() => setIsNotiSuccess(false)}>
                <NotifyModalSuccess isSuccess={isNotiSuccess} detailNoti={detailNoti} />
            </div>
            <div onClick={() => setIsNotiFail(false)}>
                <NotifyModalFail isFail={isNotiFail} detailNoti={detailNoti} />
            </div>
            {loadingAction && <Loading fade size={30} />}
        </div>
    );
}
