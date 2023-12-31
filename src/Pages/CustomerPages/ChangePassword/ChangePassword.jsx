import { Link } from 'react-router-dom';
import './ChangePassword.scss';
import { useState } from 'react';
import { getToken } from '../../../Services/Token';
import { toast } from 'react-toastify';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import axios from '../../../api/axios';
import { NotifyModalSuccess } from '../../../Components/NotifyModalSuccess/NotifyModalSuccess';
import { NotifyModalFail } from '../../../Components/NotifyModalFail/NotifyModalFail';
import Loading from '../../../Components/Loading';

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [change, setChange] = useState('');
    const [isNotiSuccess, setIsNotiSuccess] = useState(false);
    const [detailNoti, setDetailNoti] = useState('');
    const [isNotiFail, setIsNotiFail] = useState(false);

    const [loading, setLoading] = useState(false);

    async function ChangePassword() {
        try {
            setLoading(true);
            let token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const result = await axios.post(axios.defaults.baseURL + `/change-password`, {
                oldPassword: password,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            });
            setLoading(false);
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
            if (result.data.errCode === 2) {
                setIsNotiFail(true);
                setDetailNoti(result.data.message);
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 5000);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <div className="wrapper-profile ">
            <div className="container-profile ">
                <div className="sidebar-profile">
                    <div className="wrapper-sidebar">
                        <SidebarProfile />
                    </div>
                </div>
                <div className="sidebar-item-info">
                    {loading && <Loading dot />}
                    <div className="wrapper-change-profile">
                        <h5>ĐỔI MẬT KHẨU</h5>
                        <div className="wrapper-change-info">
                            <div className="cover-input">
                                <label htmlFor="">Mật khẩu hiện tại</label>
                                <input
                                    type="password"
                                    name=""
                                    className="form-control-input"
                                    placeholder="Mật khẩu hiện tại..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="cover-input">
                                <label htmlFor="">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    name=""
                                    className="form-control-input"
                                    placeholder="Mật khẩu mới..."
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="cover-input">
                                <label htmlFor="">Nhập lại mật khẩu mới</label>
                                <input
                                    type="password"
                                    name=""
                                    className="form-control-input"
                                    placeholder="Nhập lại mật khẩu mới..."
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="cover-btn" onClick={ChangePassword}>
                                <button className="update-btn">Lưu thay đổi</button>
                            </div>
                        </div>
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
        </div>
    );
}
