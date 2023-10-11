import { Link } from 'react-router-dom';
import './ChangePassword.scss';
import { useState } from 'react';
import { getToken } from '../../../Services/Token';
import { toast } from 'react-toastify';
import axios from 'axios';
import SidebarProfile from '../SidebarProfile/SidebarProfile';

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [change, setChange] = useState('');

    async function ChangePassword() {
        try {
            let token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const result = await axios.post(`http://localhost:8081/api/v1/change-password`, {
                oldPassword: password,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            });
            setChange(!change);
            console.log(result);

            if (result.status === 200) toast.success(result.data.message);
            if (result.status === 201) toast.error(result.data.message);
            if (result.status === 202) toast.error(result.data.message);
            if (result.status === 500) toast.warning(result.data.message);
        } catch (error) {
            console.log(error);
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
                    <div className="wrapper-change-profile">
                        <h5>ĐỔI MẬT KHẨU</h5>
                        <div className="wrapper-change-info">
                            <div className="cover-input">
                                <label htmlFor="">Mật khẩu hiện tại</label>
                                <input
                                    type="password"
                                    name=""
                                    id=""
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
                                    id=""
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
                                    id=""
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
        </div>
    );
}
