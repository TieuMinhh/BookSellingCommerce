import React from 'react';
import './Profile.scss';
import axios from '../../../api/axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../../Services/Token';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import Loading from '../../../Components/Loading';
import { TiCameraOutline } from 'react-icons/ti';
import config from '../../../api/base';
import { checkToken } from '../../../api/UserServices';
import { Button, Modal, Form } from 'react-bootstrap';
import Avatar from 'react-avatar-edit';
import { NotifyModalSuccess } from '../../../Components/NotifyModalSuccess/NotifyModalSuccess';
import { NotifyModalFail } from '../../../Components/NotifyModalFail/NotifyModalFail';

export default function Profile() {
    const [user, setUser] = useState([]);
    const [successfulOrders, setSuccessfulOrder] = useState([]);
    const [avatar, setAvatar] = useState('');
    const [imgCrop, setImgCrop] = useState(false);
    const [storeImage, setStoreImage] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [change, setChange] = useState([]);

    const [isNotiSuccess, setIsNotiSuccess] = useState(false);
    const [detailNoti, setDetailNoti] = useState('');
    const [isNotiFail, setIsNotiFail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    const getInfoUser = async () => {
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.get(axios.defaults.baseURL + '/account/info');
        setLoading(true);
        setUser(result?.data.userInfo);
    };

    const getSuccessfulOrder = async () => {
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.get(axios.defaults.baseURL + '/user/successful-orders');
        setSuccessfulOrder(result?.data.successfulOrders);
    };

    const profileImageShow = storeImage.map((item) => item.imgCrop);

    const onCrop = (view) => {
        console.log(view);
        setImgCrop(view);
    };
    const onClose = () => {
        setImgCrop(null);
    };

    const updateAvatar = async () => {
        try {
            setLoadingAction(true);
            console.log(storeImage, imgCrop);
            setStoreImage([...storeImage, { imgCrop }]);

            let token = await getToken();
            let data = await checkToken(token);

            const formData = new FormData();
            formData.append('avatar', avatar);

            let result = await axios.post(
                axios.defaults.baseURL + `/update-avatar/${data.userInfo.id_account}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            setLoadingAction(false);

            if (result.data.errCode === 0) {
                setIsNotiSuccess(true);
                setDetailNoti(result.data.message);
                setTimeout(() => {
                    setIsNotiSuccess(false);
                }, 5000);
                setChange(!change);
                setShow(false);
            }
            if (result.data.errCode === 1) {
                setIsNotiFail(true);
                setDetailNoti(result.data.message);
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInfoUser();
        getSuccessfulOrder();
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
                    <div className="wrapper-info-profile">
                        <h5>BẢNG ĐIỀU KHIỂN CỦA KHÁCH HÀNG</h5>
                        {loading ? (
                            <>
                                <div className="wrapper-detail-info">
                                    <div className="detail-info-profile">
                                        <p className="user-name-profile ">
                                            Họ và tên:{' '}
                                            <strong style={{ color: '#000' }}>
                                                {(user && user?.name) || 'SayMyName'}
                                            </strong>
                                        </p>
                                        <p className="user-email-profile ">
                                            Email: <strong style={{ color: '#000' }}>{user && user?.email}</strong>
                                        </p>
                                        <p className="user-level-profile ">
                                            Số điện thoại liên hệ:{' '}
                                            <strong style={{ color: '#000' }}>{user && user?.phone}</strong>
                                        </p>
                                        <div className="avatar-container">
                                            <img
                                                alt="avatar"
                                                src={
                                                    profileImageShow.length
                                                        ? profileImageShow
                                                        : `${config.PUBLIC_IMAGE_URL}${user && user?.avatar}`
                                                }
                                                className="img-avatar"
                                            />
                                        </div>
                                        <div className="camera" style={{ color: '#000', cursor: 'pointer' }}>
                                            <TiCameraOutline
                                                type="file"
                                                accept="image/*"
                                                onClick={handleShow}
                                                onChange={(Event) => {
                                                    const file = Event.target.files[0];
                                                    if (file && file.type.substring(0, 5) === 'image') {
                                                        setAvatar(file);
                                                    } else {
                                                        setAvatar(null);
                                                    }
                                                }}
                                            ></TiCameraOutline>
                                        </div>
                                        <h6>Thông tin tài khoản</h6>

                                        <p>
                                            Số đơn hàng thành công năm 2023{' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                {successfulOrders && successfulOrders[0]?.successful_orders}
                                            </span>
                                        </p>
                                        <p>
                                            Số tiền đã thanh toán năm 2023{' '}
                                            <span style={{ fontWeight: 'bold' }}>9.530.000 đ</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="user-detail-address">
                                    <h5>SỔ ĐỊA CHỈ</h5>
                                    <h6>ĐỊA CHỈ GIAO HÀNG MẶC ĐỊNH</h6>
                                    <p>{user && user?.address}</p>
                                </div>
                            </>
                        ) : (
                            <Loading pacman size={30} />
                        )}
                    </div>
                </div>
            </div>

            {
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className="bg-green">
                        <Modal.Title className="text-black">Cập nhật ảnh đại diện</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="flex justify-center items-center">
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                                type="file"
                                onChange={(Event) => {
                                    const file = Event.target.files[0];
                                    if (file && file.type.substring(0, 5) === 'image') {
                                        setAvatar(file);
                                    } else {
                                        setAvatar(null);
                                    }
                                }}
                            >
                                <Avatar
                                    width={300}
                                    height={300}
                                    onClose={onClose}
                                    onCrop={onCrop}
                                    shadingColor={'#474649'}
                                    backgroundColor={'#474649'}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={updateAvatar}>
                            Cập nhật
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
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
