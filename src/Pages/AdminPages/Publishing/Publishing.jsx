import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { FaTrash, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Publishing() {
    const [list, setList] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [form, setForm] = useState();
    const [change, setChange] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [IDCompany, setIDCompany] = useState();

    async function getListNXB() {
        let result = await axios.get(axios.defaults.baseURL + `/admin/publishing-company?id=ALL`);
        setList(result?.data.listNXB);
        // console.log(result.data);
    }

    const handleShowAdd = (e) => {
        setForm('add');
        setShowAdd(true);
    };

    const handleShowEdit = (item) => {
        setForm('edit');
        setIDCompany(item.id_company);
        setName(item.name_company);
        setAddress(item.address_company);
        setPhone(item.phone_company);
        setEmail(item.email_company);
        setShowEdit(true);
    };

    const handleShowDelete = (item) => {
        setIDCompany(item.id_company);
        setName(item.name_company);
        setAddress(item.address_company);
        setPhone(item.phone_company);
        setEmail(item.email_company);
        setShowDel(true);
    };

    const handleCloseAdd = () => setShowAdd(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDel = () => setShowDel(false);

    const handleSubmitAdd = async () => {
        const result = await axios.post(axios.defaults.baseURL + '/admin/create-nxb', {
            name_company: name,
            email_company: email,
            phone_company: phone,
            address_company: address,
        });

        console.log(name, email, phone, address);

        console.log(result);

        setChange(!change);
        setName(null);
        setEmail(null);
        setPhone(null);
        setAddress(null);

        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.error(result.data.message);
        if (result.data.errCode === 2) toast.warning(result.data.message);
        setShowAdd(false);
    };

    const handleSubmitEdit = async () => {
        const result = await axios.post(axios.defaults.baseURL + `/admin/update-nxb/${IDCompany}`, {
            name_company: name,
            email_company: email,
            phone_company: phone,
            address_company: address,
        });

        console.log(result);

        setChange(!change);
        setName(null);
        setEmail(null);
        setPhone(null);
        setAddress(null);

        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.error(result.data.message);
        if (result.data.errCode === 2) toast.warning(result.data.message);
        setShowEdit(false);
    };

    const handleSubmitDel = async () => {
        const result = await axios.delete(axios.defaults.baseURL + `/admin/delete-nxb/${IDCompany}`);

        console.log(result);

        setChange(!change);

        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.error(result.data.message);
        setShowDel(false);
    };

    useEffect(() => {
        getListNXB();
    }, [change]);

    return (
        <div className="promotion-main-container">
            <div className="d-flex justify-content-center promotion-title">Danh sách nhà xuất bản</div>
            <button className="btn btn-success add-promotion-btn" onClick={handleShowAdd}>
                <FaPlus />
            </button>
            <div className="table-promotion">
                <table id="main-promotion">
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Tên nhà xuất bản</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Thao tác</th>
                        </tr>

                        {list &&
                            list.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name_company}</td>
                                        <td>{item.phone_company}</td>
                                        <td>{item.email_company}</td>
                                        <td>{item.address_company}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn-edit"
                                                // id={item.id_category}
                                                // title={item.name}
                                                onClick={() => handleShowEdit(item)}
                                            >
                                                <FaPencilAlt />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-delete"
                                                // id={item.id_category}
                                                // title={item.name}
                                                onClick={() => handleShowDelete(item)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            {
                <Modal size="m" show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header className="background-header" closeButton>
                        <Modal.Title className="color-title text-center text-size-title">Thêm nhà xuất bản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label className="text-black text-size-fit">Nhập tên nhà xuất bản</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tân Đen"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formType">
                                <Form.Label className="text-black text-size-fit">
                                    Nhập số điện thoại nhà xuất bản
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="0123456789"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDayStart">
                                <Form.Label className="text-black text-size-fit">Nhập Email nhà xuất bản</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="tandenthui@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDayEnd">
                                <Form.Label className="text-black text-size-fit">Nhập địa chỉ nhà xuất bản</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Hà Nội"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleSubmitAdd}>
                            Thêm
                        </Button>
                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

            {
                <Modal size="m" show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header className="background-header" closeButton>
                        <Modal.Title className="color-title text-center text-size-title">
                            Chỉnh sửa nhà xuất bản
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label className="text-black text-size-fit">Nhập tên nhà xuất bản</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tân đen"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formType">
                                <Form.Label className="text-black text-size-fit">
                                    Nhập số điện thoại nhà xuất bản
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="0123456789"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDayStart">
                                <Form.Label className="text-black text-size-fit">Nhập email nhà xuất bản</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="tandenthui@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDayEnd">
                                <Form.Label className="text-black text-size-fit">Nhập địa chỉ nhà xuất bản</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Hà Nội"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleSubmitEdit}>
                            Cập nhật
                        </Button>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

            {
                <Modal size="m" show={showDel} onHide={handleCloseDel}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-size-title">Xoá nhà xuất bản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-category-body text-center">
                            <div className="delete-container">
                                <label className="ban-co-muon-xoa text-black text-size-fit">
                                    Ngài có chắc chắn muốn xóa mã khuyến mãi :
                                </label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleSubmitDel}>
                            Đồng ý
                        </Button>
                        <Button variant="success" onClick={handleCloseDel}>
                            Không
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    );
}
