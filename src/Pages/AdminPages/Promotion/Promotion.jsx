import React, { useState, useEffect } from 'react';
import './Promotion.scss';
import axios from '../../../api/axios';
import { FaTrash, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import Loading from '../../../Components/Loading';

export default function Promotion() {
    const [list, setList] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [form, setForm] = useState();
    const [change, setChange] = useState();
    const [code, setCode] = useState();
    const [percentage, setPercentage] = useState();
    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState();
    const [description, setDescription] = useState();
    const [ID_discount, setIDDiscount] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    async function getListDiscount() {
        let result = await axios.get(axios.defaults.baseURL + `/discount?id=ALL`);
        setLoading(true);
        setList(result?.data.listDiscount);
        // console.log(result.data);
    }

    const handleShowAdd = (e) => {
        setForm('add');
        setShowAdd(true);
    };

    const handleShowEdit = (item) => {
        setForm('edit');
        setIDDiscount(item.discount_id);
        setCode(item.discount_code);
        setPercentage(item.percentage);
        setStartDay(item.start_date);
        setEndDay(item.end_day);
        setDescription(item.description);
        setShowEdit(true);
    };

    const handleShowDelete = (item) => {
        setIDDiscount(item.discount_id);
        setCode(item.discount_code);
        setPercentage(item.percentage);
        setStartDay(item.start_date);
        setEndDay(item.end_date);
        setDescription(item.description);
        setShowDel(true);
    };

    const handleCloseAdd = () => setShowAdd(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDel = () => setShowDel(false);

    const handleSubmitAdd = async () => {
        try {
            setLoadingAction(true);
            const result = await axios.post(axios.defaults.baseURL + '/admin/create-discount', {
                discount_code: code,
                percentage: percentage,
                start_date: startDay,
                end_date: endDay,
                description: description,
            });
            setLoadingAction(false);

            console.log(code, percentage, startDay, endDay, description);

            console.log(result);

            if (result.data.errCode === 0) {
                setChange(!change);
                setCode(null);
                setPercentage(null);
                setStartDay(null);
                setEndDay(null);
                setDescription(null);
                toast.success(result.data.message);
                setShowAdd(false);
            }

            if (result.data.errCode === 1) toast.warning(result.data.message);
            if (result.data.errCode === 2) toast.error(result.data.message);
        } catch (error) {
            toast.error(error);
        }
    };

    const handleSubmitEdit = async () => {
        try {
            setLoadingAction(true);
            const result = await axios.post(axios.defaults.baseURL + `/admin/update-discount/${ID_discount}`, {
                discount_code: code,
                percentage: percentage,
                start_date: startDay,
                end_date: endDay,
                description: description,
            });
            setLoadingAction(false);
            console.log(result);

            if (result.data.errCode === 0) {
                setChange(!change);
                setCode(null);
                setPercentage(null);
                setStartDay(null);
                setEndDay(null);
                setDescription(null);
                toast.success(result.data.message);
                setShowEdit(false);
            }
            if (result.data.errCode === 1) toast.warning(result.data.message);
            if (result.data.errCode === 2) toast.error(result.data.message);
        } catch (error) {
            toast.error(error);
        }
    };

    const handleSubmitDel = async () => {
        try {
            setLoadingAction(true);
            const result = await axios.delete(axios.defaults.baseURL + `/admin/delete-discount/${ID_discount}`);
            setLoadingAction(false);
            console.log(result);

            if (result.data.errCode === 0) {
                setShowDel(false);
                setChange(!change);
                toast.success(result.data.message);
            }
            if (result.data.errCode === 1) toast.error(result.data.message);
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getListDiscount();
    }, [change]);

    return (
        <>
            {loading ? (
                <div className="promotion-main-container">
                    <div className="d-flex justify-content-center promotion-title">Danh sách khuyến mãi</div>
                    <button className="btn btn-success add-promotion-btn" onClick={handleShowAdd}>
                        <FaPlus />
                    </button>
                    <div className="table-promotion">
                        <table id="main-promotion">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã khuyến mãi</th>
                                    <th>% khuyến mãi</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Chi tiết khuyến mãi</th>
                                    <th>Thao tác</th>
                                </tr>

                                {list &&
                                    list.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.discount_code}</td>
                                                <td>{item.percentage} %</td>
                                                <td>{moment(item.start_date).format('L')}</td>
                                                <td>{moment(item.end_date).format('L')}</td>
                                                <td>{item.description}</td>
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
                                <Modal.Title className="color-title text-center text-size-title">
                                    Thêm khuyến mãi
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formName">
                                                <Form.Label className="text-black text-size-fit">
                                                    Nhập mã khuyến mãi
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="KHUYENMAI"
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formType">
                                                <Form.Label className="text-black text-size-fit">
                                                    Nhập % khuyến mãi
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="10%"
                                                    value={percentage}
                                                    onChange={(e) => {
                                                        const inputPrice = e.target.value;
                                                        if (inputPrice > 0) {
                                                            setPercentage(inputPrice);
                                                        } else {
                                                            toast.warning('Vui lòng nhập giá trị dương');
                                                            setPercentage('');
                                                        }
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formDayStart">
                                                <Form.Label className="text-black text-size-fit">
                                                    Chọn ngày bắt đầu
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    placeholder="01/07/2023"
                                                    value={startDay}
                                                    onChange={(e) => {
                                                        const selectedDate = new Date(e.target.value);
                                                        const today = new Date();
                                                        today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây của ngày hiện tại về 0 để so sánh chính xác

                                                        if (selectedDate < today) {
                                                            toast.warning('Vui lòng chọn ngày lớn hơn ngày hiện tại');
                                                            // hoặc setStartDay(today.toISOString().split('T')[0]); // Cài đặt ngày hiện tại nếu không hợp lệ
                                                        } else {
                                                            setStartDay(selectedDate.toISOString().split('T')[0]);
                                                        }
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formDayEnd">
                                                <Form.Label className="text-black text-size-fit">
                                                    Chọn ngày kết thúc
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    placeholder="01/12/2023"
                                                    value={endDay}
                                                    onChange={(e) => setEndDay(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="formDetail">
                                        <Form.Label className="text-black text-size-fit">
                                            Nhập chi tiết khuyến mãi
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Giảm 50% giá trị tất cả đơn hàng"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
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
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formName">
                                                <Form.Label className="text-black text-size-fit">
                                                    Nhập mã khuyến mãi
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="KHUYENMAI"
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formType">
                                                <Form.Label className="text-black text-size-fit">
                                                    Nhập % khuyến mãi
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="10%"
                                                    value={percentage}
                                                    onChange={(e) => {
                                                        const inputPrice = e.target.value;
                                                        if (inputPrice > 0) {
                                                            setPercentage(inputPrice);
                                                        } else {
                                                            toast.warning('Vui lòng nhập giá trị dương');
                                                            setPercentage('');
                                                        }
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formDayStart">
                                                <Form.Label className="text-black text-size-fit">
                                                    Chọn ngày bắt đầu
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    placeholder="01/07/2023"
                                                    value={startDay}
                                                    onChange={(e) => {
                                                        const selectedDate = new Date(e.target.value);
                                                        const today = new Date();
                                                        today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây của ngày hiện tại về 0 để so sánh chính xác

                                                        if (selectedDate < today) {
                                                            toast.warning('Vui lòng chọn ngày lớn hơn ngày hiện tại');
                                                            // hoặc setStartDay(today.toISOString().split('T')[0]); // Cài đặt ngày hiện tại nếu không hợp lệ
                                                        } else {
                                                            setStartDay(selectedDate.toISOString().split('T')[0]);
                                                        }
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formDayEnd">
                                                <Form.Label className="text-black text-size-fit">
                                                    Chọn ngày kết thúc
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    placeholder="01/12/2023"
                                                    value={endDay}
                                                    onChange={(e) => setEndDay(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="formDetail">
                                        <Form.Label className="text-black text-size-fit">
                                            Nhập chi tiết khuyến mãi
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Giảm 50% giá trị tất cả đơn hàng"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
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
                                            Ngài có chắc chắn muốn xóa mã khuyến mãi : {code}
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
            ) : (
                <Loading beat size={20} />
            )}
            {loadingAction && <Loading fade size={30} />}
        </>
    );
}
