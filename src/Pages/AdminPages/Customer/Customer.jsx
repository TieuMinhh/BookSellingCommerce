import React, { useState, useEffect } from 'react';
import './Customer.scss';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from '../../../api/axios';
import moment from 'moment';
import config from '../../../api/base';
import { toast } from 'react-toastify';

export default function Customer() {
    const [list, setList] = useState([]);
    const [change, setChange] = useState([]);
    const [showBlock, setShowBlock] = useState(false);
    const [showUnBlock, setShowUnBlock] = useState(false);
    const [id, setID] = useState();

    async function getListCustomer() {
        const result = await axios.get(axios.defaults.baseURL + `/admin/account`);
        setList(result?.data.listAccount);
        // console.log(result.data);
    }

    const handleShowBlock = (item) => {
        console.log('id account là:', item.id_account);
        setID(item.id_account);
        setShowBlock(true);
    };

    const handleCloseBlock = () => {
        setShowBlock(false);
    };

    const handleShowUnBlock = (item) => {
        console.log('id account là:', item.id_account);
        setID(item.id_account);
        setShowUnBlock(true);
    };

    const handleCloseUnBlock = () => {
        setShowUnBlock(false);
    };

    async function BlockUser() {
        console.log('id_account là :', id);
        try {
            const reason = document.getElementById('exampleForm.ControlInput1').value;
            const result = await axios.post(axios.defaults.baseURL + `/admin/block-user/${id}`, {
                reason: reason,
            });
            setChange(!change);
            console.log(result);
            if (result.status === 400) toast.warning(result.data.message);
            if (result.status === 200) toast.success(result.data.message);
            setShowBlock(false);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function UnBlockUser() {
        console.log('id_account là :', id);
        try {
            const reason = document.getElementById('exampleForm.ControlInput2').value;
            const result = await axios.post(axios.defaults.baseURL + `/admin/unblock-user/${id}`, {
                reason: reason,
            });
            setChange(!change);
            console.log(result);
            if (result.status === 400) toast.warning(result.data.message);
            if (result.status === 200) toast.success(result.data.message);
            setShowUnBlock(false);
        } catch (error) {
            // toast.error(error.response.data.message);
            toast.error('Lỗi rồi');
        }
    }

    useEffect(() => {
        getListCustomer();
    }, [change]);

    return (
        <div className="account-main-container">
            <div className="d-flex justify-content-center title-account">Danh sách khách hàng</div>
            <div className="table-user-account">
                <table id="customers-account">
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Ảnh đại diện</th>
                            <th>Tên khách hàng</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>

                            <th>Địa chỉ</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>

                        {list &&
                            list.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={`${config.PUBLIC_IMAGE_URL}${item.avatar}`}
                                                alt="user-avatar"
                                                className="avatar-image"
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>

                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
                                        <td>{moment(item.created_time).format('llll')}</td>
                                        <td>
                                            {item.status === 0 ? (
                                                <button
                                                    className="btn btn-success lock-btn"
                                                    onClick={() => handleShowBlock(item)}
                                                >
                                                    <i>
                                                        <FaLock />
                                                    </i>
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-danger lock-btn"
                                                    onClick={() => handleShowUnBlock(item)}
                                                >
                                                    <i>
                                                        <FaUnlock />
                                                    </i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            {
                <Modal show={showBlock} onHide={handleCloseBlock}>
                    <Modal.Header closeButton>
                        <Modal.Title className="color-title text-center text-size-title">Khoá tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="text-black text-size-fit">Lí do khoá tài khoản</Form.Label>
                                <Form.Control as="textarea" rows={2} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={BlockUser}>
                            Khoá
                        </Button>
                        <Button variant="primary" onClick={handleCloseBlock}>
                            Huỷ
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
            {
                <Modal show={showUnBlock} onHide={handleCloseUnBlock}>
                    <Modal.Header closeButton>
                        <Modal.Title className="color-title text-center text-size-title">Mở khoá tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-black text-size-fit">
                        <Form>
                            <Form.Label>Ngài có chắc chắn muốn mở khoá tài khoản này ?</Form.Label>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label className="text-black text-size-fit">Lí do mở khoá tài khoản</Form.Label>
                                <Form.Control as="textarea" rows={2} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={UnBlockUser}>
                            Mở khoá
                        </Button>
                        <Button variant="secondary" onClick={handleCloseUnBlock}>
                            Huỷ
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    );
}
