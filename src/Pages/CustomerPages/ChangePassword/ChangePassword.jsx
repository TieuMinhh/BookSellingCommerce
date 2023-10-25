import { Link } from 'react-router-dom';
import './ChangePassword.scss';
import { useState } from 'react';
import { getToken } from '../../../Services/Token';
import { toast } from 'react-toastify';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import axios from '../../../api/axios';

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [change, setChange] = useState('');
    const [isSuccess, setIsSuccess] = useState('');

    async function ChangePassword() {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.post(axios.defaults.baseURL + `/change-password`, {
            oldPassword: password,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        });
        setChange(!change);
        // console.log(result);

        if (result.status === 200) {
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        }
        if (result.status === 201) toast.error(result.data.message);
        if (result.status === 202) toast.error(result.data.message);
        if (result.status === 500) toast.warning(result.data.message);
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
                            Ngài đã thay đổi mật khẩu thành công
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
