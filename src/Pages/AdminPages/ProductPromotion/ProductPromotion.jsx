import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { FaTrash, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';

export default function ProductPromotion() {
    const [list, setList] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [form, setForm] = useState();
    const [change, setChange] = useState();
    const [percentage, setPercentage] = useState();
    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState();
    const [ID_discount, setIDDiscount] = useState();

    async function getListDiscount() {
        let result = await axios.get(axios.defaults.baseURL + `/admin/promotion-product?id=ALL`);
        setList(result?.data.listPromotionProduct);
        console.log(result.data);
    }

    const handleShowAdd = (e) => {
        setForm('add');
        setShowAdd(true);
    };

    const handleShowEdit = (item) => {
        setForm('edit');
        setIDDiscount(item.id_promotion);
        setPercentage(item.percentage);
        setStartDay(item.start_date);
        setEndDay(item.end_day);
        setShowEdit(true);
    };

    const handleShowDelete = (item) => {
        setIDDiscount(item.id_promotion);
        setPercentage(item.percentage);
        setStartDay(item.start_date);
        setEndDay(item.end_date);
        setShowDel(true);
    };

    const handleCloseAdd = () => setShowAdd(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDel = () => setShowDel(false);

    const handleSubmitAdd = async () => {
        const result = await axios.post(axios.defaults.baseURL + '/admin/create-promotion-product', {
            percentage: percentage,
            start_date: startDay,
            end_date: endDay,
        });

        console.log(percentage, startDay, endDay);

        console.log(result);

        setChange(!change);
        setPercentage(null);
        setStartDay(null);
        setEndDay(null);

        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.error(result.data.message);
        if (result.data.errCode === 2) toast.warning(result.data.message);
        setShowAdd(false);
    };

    const handleSubmitEdit = async () => {
        const result = await axios.post(axios.defaults.baseURL + `/admin/update-promotion-product/${ID_discount}`, {
            percentage: percentage,
            start_date: startDay,
            end_date: endDay,
        });

        console.log(result);

        setChange(!change);
        setPercentage(null);
        setStartDay(null);
        setEndDay(null);

        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.error(result.data.message);
        if (result.data.errCode === 2) toast.warning(result.data.message);
        setShowEdit(false);
    };

    const handleSubmitDel = async () => {
        const result = await axios.delete(axios.defaults.baseURL + `/admin/delete-promotion-product/${ID_discount}`);

        console.log(result);

        setChange(!change);

        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.error(result.data.message);
        setShowDel(false);
    };

    useEffect(() => {
        getListDiscount();
    }, [change]);

    return (
        <div className="promotion-main-container">
            <div className="d-flex justify-content-center promotion-title">Danh sách Sách giảm giá</div>
            <button className="btn btn-success add-promotion-btn" onClick={handleShowAdd}>
                <FaPlus />
            </button>
            <div className="table-promotion">
                <table id="main-promotion">
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>% khuyến mãi</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Thao tác</th>
                        </tr>

                        {list &&
                            list.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.percentage} %</td>
                                        <td>{moment(item.start_date).format('L')}</td>
                                        <td>{moment(item.end_date).format('L')}</td>
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
                        <Modal.Title className="color-title text-center text-size-title">Thêm khuyến mãi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formType">
                                <Form.Label className="text-black text-size-fit">Nhập % khuyến mãi</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="10%"
                                    value={percentage}
                                    onChange={(e) => setPercentage(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDayStart">
                                <Form.Label className="text-black text-size-fit">Chọn ngày bắt đầu</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="01/07/2023"
                                    value={startDay}
                                    onChange={(e) => setStartDay(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDayEnd">
                                <Form.Label className="text-black text-size-fit">Chọn ngày kết thúc</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="01/12/2023"
                                    value={endDay}
                                    onChange={(e) => setEndDay(e.target.value)}
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
                            Chỉnh sửa khuyến mãi
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formType">
                                <Form.Label className="text-black text-size-fit">Nhập % khuyến mãi</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="10%"
                                    value={percentage}
                                    onChange={(e) => setPercentage(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDayStart">
                                <Form.Label className="text-black text-size-fit">Chọn ngày bắt đầu</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="01/07/2023"
                                    value={startDay}
                                    onChange={(e) => setStartDay(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDayEnd">
                                <Form.Label className="text-black text-size-fit">Chọn ngày kết thúc</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="01/12/2023"
                                    value={endDay}
                                    onChange={(e) => setEndDay(e.target.value)}
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
                        <Modal.Title className="text-size-title">Xoá khuyễn mãi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-category-body text-center">
                            <div className="delete-container">
                                <label className="ban-co-muon-xoa text-black text-size-fit">
                                    Ngài có chắc chắn muốn xóa mã khuyến mãi này ?
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
