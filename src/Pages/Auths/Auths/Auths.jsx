import React, { useContext, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { setToken } from '../../../Services/Token';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { NotifyModalSuccess } from '../../../Components/NotifyModalSuccess/NotifyModalSuccess';
import { NotifyModalFail } from '../../../Components/NotifyModalFail/NotifyModalFail';
import { AuthContext } from '../../../Components/AuthProvider/AuthProvider';
import { useEffect } from 'react';
import Loading from '../../../Components/Loading';

function MyLoginModal({ active, isLogin, show, handleClose, handleLoginSuccess }) {
    const [activeTab, setActiveTab] = useState('tab3');
    const [username, setUserName] = useState('');
    const [isValidUser, setIsValidUser] = useState(true);
    const [password, setPassWord] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isValidPass, setIsValidPass] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isValidNewPassword, setIsValidNewPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [isNotiSuccess, setIsNotiSuccess] = useState(false);
    const [detailNoti, setDetailNoti] = useState('');
    const [isNotiFail, setIsNotiFail] = useState(false);

    const [OTP, setOTP] = useState();
    const [idAccount, setIdAccount] = useState();
    const [isSendOTP, setIsSendOTP] = useState(false);
    const [messageSendOTP, setMessageSendOTP] = useState();
    const [isSuccessOTP, setIsSuccessOTP] = useState(false);
    const [messageConfirmOTP, setMessageConfirmOTP] = useState();
    const [isMatchPassword, setIsMatchPassword] = useState(true);
    const [isDisableInputPass, setIsDisableInputPass] = useState(true);

    const [loading, setLoading] = useState(false);

    const handleResetModal = () => {
        setIsSendOTP(false);
        setMessageSendOTP('');
        setIsSuccessOTP(false);
        setMessageConfirmOTP('');
        setIsMatchPassword(true);
        setIsDisableInputPass(true);
    };

    useEffect(() => {
        if (!active) {
            setActiveTab('tab1');
        } else {
            setActiveTab(active);
        }
    }, [active]);

    const navigate = useNavigate();

    //Use Context
    const authContext = useContext(AuthContext);

    const handleLogin = () => {
        (async () => {
            setLoading(true);
            let result = (
                await axios.post(axios.defaults.baseURL + `/login`, {
                    email: username,
                    password,
                })
            ).data;
            setLoading(false);
            if (result.errCode === 0) {
                // setToken(result.accessToken, result.refreshToken);
                setToken(result.accessToken);
                setTimeout(() => {
                    authContext.handleChangeRole();
                    if (result.role_id === 1) {
                        navigate('/admin');
                    }
                }, 500);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 3000);

                handleLoginSuccess();
            } else if (result.errCode === 1) {
                setIsNotiFail(true);
                setDetailNoti(result.message);
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 3000);
            } else {
                setIsNotiFail(true);
                setDetailNoti(result.message);
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 3000);
            }
        })().catch((error) => {
            console.log(error.response.data);
            setLoading(false);
        });
    };

    const handleSignup = () => {
        (async () => {
            setLoading(true);
            const data = (
                await axios.post(axios.defaults.baseURL + '/account/signup', {
                    email: username,
                    password,
                    phone,
                })
            ).data;
            setLoading(false);
            if (data.errCode === 1) {
                setIsNotiFail(true);
                setDetailNoti(data.message);
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 3000);
            } else if (data.errCode === 2) {
                setIsNotiFail(true);
                setDetailNoti(data.message);
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 3000);
            } else {
                setIsNotiSuccess(true);
                setDetailNoti(data.message);
                setTimeout(() => {
                    setIsNotiSuccess(false);
                }, 3000);
                setActiveTab('tab1');
            }
        })().catch((err) => {
            setIsNotiFail(true);
            setDetailNoti('Có lỗi xảy ra: ', err);
            setLoading(false);
            setTimeout(() => {
                setIsNotiFail(false);
            }, 3000);
            setActiveTab('tab2');
        });
    };

    function handleOnChangeEmail(e) {
        const inputEmail = e.target.value;
        setUserName(inputEmail);
        const emailPattern = /\S+@\S+\.\S+/; // Pattern kiểm tra email hợp lệ
        setIsValidUser(emailPattern.test(inputEmail)); // Sử dụng test method để kiểm tra
    }

    function handleOnChangePassword(e) {
        const inputPassword = e.target.value;
        setPassWord(inputPassword);
        // Kiểm tra password chứa ít nhất 3 ký tự
        setIsValidPass(inputPassword.length >= 3);
    }

    const handleNewPassword = (e) => {
        const inputPassword = e.target.value;
        // Kiểm tra password chứa ít nhất 4 ký tự
        setIsValidNewPassword(inputPassword.length >= 3);
        setNewPassword(inputPassword);
    };

    function handleOnChangePhone(e) {
        const inputPhone = e.target.value;
        const isValidPhone = /^0\d{9}$/.test(inputPhone);
        setPhone(inputPhone);
        setIsValidPhone(isValidPhone);
    }

    const SendOTP = async () => {
        if (!username) {
            setIsSendOTP(false);
            setMessageSendOTP('Vui lòng nhập email!');
        } else {
            try {
                const result = await axios.post(axios.defaults.baseURL + '/forgot-password', {
                    email: username,
                });

                if (result.data.errCode === 0) {
                    setIdAccount(result.data.id_account);
                    setIsSendOTP(true);
                    setMessageSendOTP(result.data.message);
                } else {
                    setIsSendOTP(false);
                    setMessageSendOTP(result.data.message);
                }
            } catch (error) {
                setLoading(false);
            }
        }
    };

    const confirmOTP = async (res) => {
        if (!OTP) {
            setIsSuccessOTP(false);
            setMessageConfirmOTP('Vui lòng nhập OTP');
        } else {
            try {
                const result = await axios.post(axios.defaults.baseURL + `/confirm/${idAccount}`, {
                    code: OTP,
                });
                if (result.data.errCode === 0) {
                    setIsSuccessOTP(true);
                    setMessageConfirmOTP(result.data.message);
                    setIsDisableInputPass(false);
                } else {
                    setIsSuccessOTP(false);
                    setMessageConfirmOTP(result.data.message);
                }
            } catch (error) {
                setIsSuccessOTP(false);
                setMessageConfirmOTP('Mã xác thực không chính xác');
            }
        }
    };

    const handleConfirmPasswordChange = async () => {
        if (password === newPassword) {
            setLoading(true);
            const result = await axios.post(axios.defaults.baseURL + `/change-password-new/${idAccount}`, {
                newPassword: password,
                newPassword2: newPassword,
            });
            setLoading(false);
            if (result) {
                setIsNotiSuccess(true);
                setDetailNoti(result.data.message);
                setActiveTab('tab1');

                setIsSendOTP(false);
                setMessageSendOTP('');
                setIsSuccessOTP(false);
                setMessageConfirmOTP('');
                setIsMatchPassword(true);
                setIsDisableInputPass(true);
            } else {
                setIsNotiFail(true);
                setDetailNoti(result.data.message);
            }
        } else {
            setIsMatchPassword(false);
        }
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    handleClose();
                    handleResetModal();
                }}
                className="mt-5"
            >
                {loading && <Loading fade size={30} />}

                <Modal.Header>
                    <ul className="tabs">
                        <li
                            className={activeTab === 'tab1' ? 'active' : ''}
                            onClick={() => {
                                handleTabClick('tab1');
                                authContext.handleChangeRole();
                            }}
                        >
                            <div className="title text-black">Đăng nhập</div>
                        </li>

                        <li className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>
                            <div className="title text-black">Đăng ký</div>
                        </li>
                    </ul>
                </Modal.Header>
                <Modal.Body className="mt-2">
                    {activeTab === 'tab1' && (
                        <Form>
                            {!isLogin && (
                                <p
                                    style={{
                                        textAlign: ' center',
                                        fontWeight: '700',
                                        marginBottom: 0,
                                        color: '#2489f4',
                                    }}
                                    className="title-need-login"
                                >
                                    Ngài cần phải đăng nhập trước khi mua hàng!
                                </p>
                            )}

                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label className="text-black text-size-fit mx-3">Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập email"
                                    className="mx-3"
                                    style={{ width: '430px' }}
                                    name="name"
                                    value={username}
                                    onChange={handleOnChangeEmail}
                                />
                                {username.length !== 0 ? (
                                    isValidUser ? (
                                        <span style={{ color: 'green' }}></span>
                                    ) : (
                                        <span style={{ color: 'red', marginLeft: '20px' }}>Email không hợp lệ</span>
                                    )
                                ) : null}
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formImg">
                                <Form.Label className="text-black text-size-fit mx-3">Mật khẩu</Form.Label>
                                <Form.Control
                                    className="mb-2 mx-3 "
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    style={{ width: '430px' }}
                                    name="password"
                                    value={password}
                                    onChange={handleOnChangePassword}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleLogin();
                                            authContext?.handleChangeRole();
                                        }
                                    }}
                                />
                                {password.length !== 0 ? (
                                    isValidPass ? null : (
                                        <span style={{ color: 'red', marginLeft: '20px' }}>Mật khẩu không hợp lệ</span>
                                    )
                                ) : null}
                                <Form.Label
                                    style={{ cursor: 'pointer' }}
                                    className="text-right color-red mx-4 text-black"
                                    onClick={() => handleTabClick('tab3')}
                                >
                                    Quên mật khẩu ?
                                </Form.Label>
                            </Form.Group>

                            <Form.Group className="mt-5 mb-3 d-flex justify-content-center align-items-center">
                                <Button
                                    // variant="danger"
                                    style={{
                                        width: '50%',
                                        backgroundColor: '#C92127',
                                        color: '#fff',
                                        border: 'none',
                                    }}
                                    disabled={!isValidUser || !isValidPass}
                                    onClick={handleLogin}
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Group>

                            <Form.Group className="mt-2 d-flex justify-content-center align-items-center">
                                <Button
                                    onClick={handleClose}
                                    // variant="outline-danger"
                                    style={{
                                        width: '50%',
                                        color: '#C92127',
                                        backgroundColor: '#fff',
                                        borderColor: '#C92127',
                                        fontWeight: '600',
                                    }}
                                >
                                    Bỏ qua
                                </Button>
                            </Form.Group>

                            <Form.Group className="mt-3 d-flex justify-content-center align-items-center">
                                <Button
                                    // variant="outline-danger"
                                    style={{
                                        width: '50%',
                                        backgroundColor: '#2489F4',
                                        color: ' white',
                                        border: '1px solid #2489F4',
                                    }}
                                >
                                    <i
                                        className="fa fa-facebook"
                                        style={{
                                            color: '#2489F4',
                                            backgroundColor: '#fff',
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            marginRight: '4px',
                                            lineHeight: '20px',
                                        }}
                                    ></i>
                                    Đăng nhập bằng Facebook
                                </Button>
                            </Form.Group>
                        </Form>
                    )}

                    {activeTab === 'tab2' && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label className="text-black text-size-fit mx-3">Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập email"
                                    className="mb-2 mx-3"
                                    style={{ width: '430px' }}
                                    name="name"
                                    value={username}
                                    onChange={handleOnChangeEmail}
                                    required={true}
                                />
                                {username.length !== 0 ? (
                                    isValidUser ? (
                                        <span style={{ color: 'green' }}></span>
                                    ) : (
                                        <span style={{ color: 'red', marginLeft: '20px' }}>Email không hợp lệ</span>
                                    )
                                ) : null}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formImg">
                                <Form.Label className="text-black text-size-fit mx-3">Mật khẩu</Form.Label>
                                <Form.Control
                                    className="mb-2 mx-3"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    style={{ width: '430px' }}
                                    name="password"
                                    value={password}
                                    onChange={handleOnChangePassword}
                                />
                                {password.length !== 0 ? (
                                    isValidPass ? null : (
                                        <span style={{ color: 'red', marginLeft: '20px' }}>Mật khẩu không hợp lệ</span>
                                    )
                                ) : null}
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formImg">
                                <Form.Label className="text-black text-size-fit mx-3">Số điện thoại</Form.Label>
                                <Form.Control
                                    className="mb-2 mx-3 "
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    style={{ width: '430px' }}
                                    name="phone"
                                    value={phone}
                                    onChange={handleOnChangePhone}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSignup();
                                        }
                                    }}
                                />
                                {phone.length !== 0 ? (
                                    isValidPhone ? null : (
                                        <span style={{ color: 'red', marginLeft: '20px' }}>
                                            Số điện thoại không hợp lệ
                                        </span>
                                    )
                                ) : null}
                            </Form.Group>

                            <Form.Group className="mt-4 mb-3 d-flex justify-content-center align-items-center">
                                <Button
                                    // variant="danger"
                                    style={{
                                        width: '50%',
                                        backgroundColor: '#C92127',
                                        color: '#fff',
                                        border: 'none',
                                    }}
                                    disabled={!isValidUser || !isValidPass}
                                    onClick={handleSignup}
                                >
                                    Đăng ký
                                </Button>
                            </Form.Group>

                            <Form.Group className="mt-2 d-flex justify-content-center align-items-center">
                                <Button
                                    // variant="outline-danger"
                                    style={{
                                        width: '50%',
                                        color: '#C92127',
                                        backgroundColor: '#fff',
                                        borderColor: '#C92127',
                                        fontWeight: '600',
                                    }}
                                    onClick={handleClose}
                                >
                                    Bỏ qua
                                </Button>
                            </Form.Group>

                            <Form.Group className="mt-4">
                                <div className="text-black text-center text-13">
                                    Bằng việc đăng ký, bạn đã đồng ý với Fahasa.com về
                                </div>
                                <div className="text-center">
                                    <a href="!#" className="text-center text-13">
                                        Điều khoản dịch vụ &
                                    </a>
                                    <a href="!#" className="text-center text-13">
                                        Chính sách bảo mật{' '}
                                    </a>
                                </div>
                            </Form.Group>
                        </Form>
                    )}

                    {activeTab === 'tab3' && (
                        <>
                            <Modal.Title className="text-center text-black">KHÔI PHỤC MẬT KHẨU</Modal.Title>

                            <Form>
                                <Form.Group className="mb-4" controlId="formName">
                                    <Form.Label className="text-black text-size-fit mx-3">Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập email"
                                        className="mb-2 mx-3"
                                        style={{ width: '430px' }}
                                        name="name"
                                        value={username}
                                        onChange={handleOnChangeEmail}
                                        onClick={() => {
                                            setIsSendOTP(false);
                                            setMessageSendOTP('');
                                        }}
                                    />
                                    {username.length !== 0 ? (
                                        isValidUser ? (
                                            <span style={{ color: 'green' }}></span>
                                        ) : (
                                            <span style={{ color: 'red', marginLeft: '20px' }}>Email không hợp lệ</span>
                                        )
                                    ) : null}
                                    {isSendOTP && (
                                        <p
                                            className=""
                                            style={{
                                                marginLeft: '20px',
                                                color: '#2489f4',
                                                marginBottom: 0,
                                                position: 'absolute',
                                            }}
                                        >
                                            {messageSendOTP}
                                        </p>
                                    )}
                                    {!isSendOTP && (
                                        <p
                                            className=""
                                            style={{
                                                marginLeft: '20px',
                                                color: 'red',
                                                marginBottom: 0,
                                                position: 'absolute',
                                            }}
                                        >
                                            {messageSendOTP}
                                        </p>
                                    )}

                                    <div
                                        onClick={SendOTP}
                                        style={{
                                            display: 'block',
                                            position: 'absolute',
                                            right: '50px',
                                            bottom: '418px',
                                            color: '#2489F4',
                                            cursor: 'pointer',
                                            fontSize: '15px',
                                        }}
                                    >
                                        Gửi mã OTP
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formImg">
                                    <Form.Label className="text-black text-size-fit mx-3">Nhập mã OTP</Form.Label>
                                    <Form.Control
                                        className="mb-2 mx-3"
                                        type="number"
                                        placeholder="Nhập mã OTP"
                                        style={{ width: '430px' }}
                                        name="password"
                                        onChange={(e) => setOTP(e.target.value)}
                                        onClick={() => {
                                            setIsSuccessOTP(false);
                                            setMessageConfirmOTP('');
                                        }}
                                    />
                                    {isSuccessOTP && (
                                        <p
                                            className=""
                                            style={{
                                                marginLeft: '20px',
                                                position: 'absolute',
                                                color: '#2489f4',
                                                marginBottom: 0,
                                            }}
                                        >
                                            {messageConfirmOTP}
                                        </p>
                                    )}
                                    {!isSuccessOTP && (
                                        <p
                                            className=""
                                            style={{
                                                marginLeft: '20px',
                                                position: 'absolute',
                                                color: 'red',
                                                marginBottom: 0,
                                            }}
                                        >
                                            {messageConfirmOTP}
                                        </p>
                                    )}

                                    <div
                                        onClick={confirmOTP}
                                        style={{
                                            display: 'block',
                                            position: 'absolute',
                                            right: '50px',
                                            bottom: '324px',
                                            color: '#2489F4',
                                            cursor: 'pointer',
                                            fontSize: '15px',
                                        }}
                                    >
                                        Xác nhận OTP
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formImg">
                                    <Form.Label className="text-black text-size-fit mx-3">Nhập mật khẩu mới</Form.Label>
                                    <Form.Control
                                        className="mb-2 mx-3 "
                                        type="tel"
                                        placeholder="Nhập mật khẩu mới"
                                        style={{ width: '430px' }}
                                        name="phone"
                                        onChange={handleOnChangePassword}
                                        disabled={isDisableInputPass}
                                        onClick={() => setIsMatchPassword(true)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="formImg">
                                    <Form.Label className="text-black text-size-fit mx-3">Xác nhận mật khẩu</Form.Label>
                                    <Form.Control
                                        className="mb-2 mx-3 "
                                        type="tel"
                                        placeholder="Xác nhận mật khẩu"
                                        style={{ width: '430px' }}
                                        name="phone"
                                        onChange={handleNewPassword}
                                        disabled={isDisableInputPass}
                                        onClick={() => setIsMatchPassword(true)}
                                    />
                                    {!isMatchPassword && (
                                        <p
                                            className=""
                                            style={{
                                                marginLeft: '20px',
                                                position: 'absolute',
                                                color: 'red',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Mật khẩu không khớp vui lòng nhập lại!
                                        </p>
                                    )}
                                </Form.Group>

                                <Form.Group className="mt-4 mb-3 d-flex justify-content-center align-items-center">
                                    <Button
                                        // variant="danger"
                                        style={{
                                            width: '50%',
                                            backgroundColor: '#C92127',
                                            color: '#fff',
                                            border: 'none',
                                        }}
                                        disabled={!isValidUser || !isValidPass || !isValidNewPassword}
                                        onClick={handleConfirmPasswordChange}
                                    >
                                        Xác nhận
                                    </Button>
                                </Form.Group>

                                <Form.Group className="mt-2 d-flex justify-content-center align-items-center">
                                    <Button
                                        // variant="outline-danger"
                                        style={{
                                            width: '50%',
                                            color: '#C92127',
                                            backgroundColor: '#fff',
                                            borderColor: '#C92127',
                                            fontWeight: '600',
                                        }}
                                        onClick={() => {
                                            handleResetModal();
                                            handleClose();
                                        }}
                                    >
                                        Bỏ qua
                                    </Button>
                                </Form.Group>
                            </Form>
                        </>
                    )}
                </Modal.Body>
            </Modal>
            {/* Start modal add cart success */}
            {isSuccess && (
                <div className="modal-add-success" onClick={() => setIsSuccess(false)}>
                    <div className="modal-container-success">
                        <div className="cover-icon-success">
                            <i
                                className="fa-solid fa-check detail-icon-success"
                                style={{ color: '#fff', lineHeight: '60px' }}
                            ></i>
                        </div>
                        <p className="sub-a-success" style={{ color: '#fff' }}>
                            Ngài đã đăng nhập thành công
                        </p>
                    </div>
                </div>
            )}

            <div onClick={() => setIsNotiSuccess(false)}>
                <NotifyModalSuccess isSuccess={isNotiSuccess} detailNoti={detailNoti} />
            </div>
            <div onClick={() => setIsNotiFail(false)}>
                <NotifyModalFail isFail={isNotiFail} detailNoti={detailNoti} />
            </div>
        </>
    );
}

export default MyLoginModal;
