import React, { useState, useEffect } from 'react';
import './Order.scss';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import axios from '../../../api/axios';

import moment from 'moment';
import config from '../../../api/base';
import Loading from '../../../Components/Loading';

export default function Order() {
    const [list, setList] = useState([]);
    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [change, setChange] = useState();
    const [showDetailOrder, setShowDetailOrder] = useState(false);
    const [id_order, setIDOrder] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    const handleShowDetailOrder = (item) => {
        setIDOrder(item);

        getListOrderDetail(item.id_order)
            .then(() => {
                setShowDetailOrder(true);
            })
            .catch();
    };

    const handleCloseDetailOrder = () => setShowDetailOrder(false);

    async function getListOrder() {
        const result = await axios.get(axios.defaults.baseURL + `/admin/get-orders`);
        setLoading(true);
        setList(result?.data.listOrder);
        // console.log(result.data);
    }

    async function getListOrderDetail(id_order) {
        const result = await axios.get(axios.defaults.baseURL + `/admin/detail-order/${id_order}`);
        setListOrderDetail(result?.data.listOrderDetail);
        console.log(result.data);
    }

    const handleConfirm = async (item) => {
        try {
            setLoadingAction(true);
            let result = await axios.post(axios.defaults.baseURL + `/admin/confirm-order/${item.id_order}`);
            setLoadingAction(false);
            console.log(result);
            setChange(!change);
            if (result.data.errCode === 0) toast.success(result.data.message);
        } catch (error) {
            toast.error(error);
        }
    };

    const handleComplete = async (item) => {
        try {
            setLoadingAction(true);
            let result = await axios.post(axios.defaults.baseURL + `/admin/complete-order/${item.id_order}`);
            setLoadingAction(false);
            console.log(result);
            setChange(!change);
            if (result.data.errCode === 0) toast.success(result.data.message);
        } catch (error) {
            toast.error(error);
        }
    };

    const handleCancel = async (item) => {
        try {
            setLoadingAction(true);
            let result = await axios.post(axios.defaults.baseURL + `/admin/cancel-order/${item.id_order}`);
            setLoadingAction(false);
            console.log(result);
            setChange(!change);
            if (result.data.errCode === 0) toast.success(result.data.message);
        } catch (error) {
            toast.error(error);
        }
    };

    let totalOriginalPrice = 0;
    let totalReducedPrice = 0;
    let feeShip = 20000;

    // Tính tổng giá trị sản phẩm trước khi giảm giá
    listOrderDetail[0]?.products?.forEach((item) => {
        totalOriginalPrice += item?.price * item?.quantity;
        totalReducedPrice += item?.price_reducing * item?.quantity;
    });

    // Tính số tiền giảm giá từ mã khuyến mãi
    const discountAmount =
        (((listOrderDetail && listOrderDetail[0]?.discount_percentage) || 0) / 100) * totalReducedPrice;

    // Tính tổng tiền sau khi giảm giá
    const totalAfterDiscount = totalReducedPrice - discountAmount + feeShip;

    useEffect(() => {
        getListOrder();
    }, [change]);

    return (
        <>
            {loading ? (
                <div className="order-main-container">
                    <div className="d-flex justify-content-center title-order">Danh sách đơn đặt hàng</div>
                    <div className="table-order">
                        <table id="main-order">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã đơn hàng</th>
                                    <th>Tên khách hàng</th>
                                    <th>Địa chỉ</th>
                                    <th>Thời gian đặt</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                    <th>Chi tiết</th>
                                </tr>

                                {list &&
                                    list.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>MH{item.id_order}</td>
                                                <td>{item.name}</td>
                                                <td>{item.address}</td>
                                                <td>{moment(item.order_time).format('llll')}</td>
                                                {item.status === 0 ? (
                                                    <>
                                                        {' '}
                                                        <td style={{ color: 'blue' }}>Đã hoàn thành</td> <td></td>{' '}
                                                    </>
                                                ) : item.status === 1 ? (
                                                    <>
                                                        <td style={{ color: '#FFD700' }}>Chờ xác nhận</td>{' '}
                                                        <td>
                                                            <button
                                                                className="btn-submit-book"
                                                                onClick={() => handleConfirm(item)}
                                                            >
                                                                Xác nhận
                                                            </button>
                                                            <button
                                                                className="btn-cancel-book"
                                                                onClick={() => handleCancel(item)}
                                                            >
                                                                Hủy đơn
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : item.status === 2 ? (
                                                    <>
                                                        <td style={{ color: 'green' }}>Đang giao</td>{' '}
                                                        <td>
                                                            <button
                                                                className="btn-complete btn-primary"
                                                                onClick={() => handleComplete(item)}
                                                            >
                                                                Hoàn thành
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td style={{ color: 'red' }}>Đã hủy</td>
                                                        <td></td>
                                                    </>
                                                )}
                                                <td>
                                                    <button
                                                        className="btn-detail"
                                                        onClick={() => handleShowDetailOrder(item)}
                                                    >
                                                        Xem chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                    {
                        <Modal size="m" show={showDetailOrder} onHide={handleCloseDetailOrder}>
                            <Modal.Header closeButton>
                                <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="ctm">
                                    <div className="ctm_name">
                                        Họ tên:{' '}
                                        <div className="pull-right">
                                            {listOrderDetail && listOrderDetail[0]?.name_receiver}
                                        </div>
                                    </div>
                                    <div className="ctm_phone">
                                        Điện thoại:{' '}
                                        <div className="pull-right">
                                            {listOrderDetail && listOrderDetail[0]?.phone_receiver}
                                        </div>
                                    </div>
                                    <div className="ctm_address">
                                        Địa chỉ:{' '}
                                        <div className="pull-right">
                                            {listOrderDetail && listOrderDetail[0]?.name_address}
                                        </div>
                                    </div>
                                </div>
                                <div className="detail_order overflow-auto w-100">
                                    {listOrderDetail &&
                                        listOrderDetail[0]?.products?.map((item) => (
                                            <div className="item_product">
                                                <div className="item_product_left">
                                                    <div className="item_img">
                                                        <img
                                                            src={`${config.PUBLIC_IMAGE_URL}${item?.images}`}
                                                            alt="anh"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="item_product_right">
                                                    <div className="item_name text-black">{item?.name_product}</div>
                                                    <div className="item_qty me-2 text-black">x{item?.quantity}</div>
                                                    <div className="item_price me-2 text-black">
                                                        {item?.price_reducing.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </div>
                                                    <div
                                                        className="item_price me-2 text-black"
                                                        style={{ textDecoration: 'line-through', color: 'red' }}
                                                    >
                                                        {item?.original_price.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                <div className="shipping_price">
                                    Phí vận chuyển{' '}
                                    <div className="pull-right">
                                        {feeShip?.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </div>
                                </div>

                                <div className="shipping_price">
                                    Giảm giá{' '}
                                    <div className="pull-right">
                                        {discountAmount.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </div>
                                </div>

                                <div className="total_price">
                                    Tổng Tiền{' '}
                                    <div className="pull-right">
                                        {totalAfterDiscount.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </div>
                                </div>
                            </Modal.Body>
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
