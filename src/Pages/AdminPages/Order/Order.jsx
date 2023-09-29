import React, { useState, useEffect } from "react";
import "./Order.scss";
// import axiosApiInstance from "../../Configs/interceptor";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import axios from "axios";
import moment from "moment";

const feeShip = 20000;

export default function Order() {
  const [list, setList] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [change, setChange] = useState();
  const [showDetailOrder, setShowDetailOrder] = useState(false);
  const [id_order, setIDOrder] = useState();
  let total = 0;

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
    // const result = await axiosApiInstance.get(
    //   axiosApiInstance.defaults.baseURL + "/api/v1/hero/get"
    // );
    const result = await axios.get(
      `http://localhost:8081/api/v1/admin/getorders`
    );

    setList(result?.data.listOrder);
    // console.log(result.data);
  }

  async function getListOrderDetail(id_order) {
    // const result = await axiosApiInstance.get(
    //   axiosApiInstance.defaults.baseURL + "/api/v1/hero/get"
    // );
    const result = await axios.get(
      `http://localhost:8081/api/v1/admin/detailorder/${id_order}`
    );

    setListOrderDetail(result?.data.listOrderDetail);
    console.log(result.data);
  }
  // getListOrderDetail();

  const handleConfirm = async (item) => {
    let result = await axios.post(
      `http://localhost:8081/api/v1/admin/xacnhandonhang/${item.id_order}`
    );
    console.log(result);
    setChange(!change);
    if (result.data.errCode === 0) toast.success(result.data.message);
  };

  const handleComplete = async (item) => {
    let result = await axios.post(
      `http://localhost:8081/api/v1/admin/hoanthanhdonhang/${item.id_order}`
    );
    console.log(result);
    setChange(!change);
    if (result.data.errCode === 0) toast.success(result.data.message);
  };

  const handleCancel = async (item) => {
    let result = await axios.post(
      `http://localhost:8081/api/v1/admin/huydonhang/${item.id_order}`
    );
    console.log(result);
    setChange(!change);
    if (result.data.errCode === 0) toast.success(result.data.message);
  };

  useEffect(() => {
    // getListOrderDetail();
    getListOrder();
  }, [change]);

  return (
    <div className="order-main-container">
      <div className="d-flex justify-content-center title-order">
        Danh sách đơn đặt hàng
      </div>
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

            {
              //0 đã hoàn thành
              //1 chờ xác nhận
              //2 đang giao
              //3 Đã hủy           =>Xóa luôn đơn
              list &&
                list.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>MH{item.id_order}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>
                        {/* {item.created_time.Format('DD-MM-YYYY')} */}

                        {/* {moment(item.order_time).format("DD-MM-YYYY ")} */}
                        {moment(item.order_time).format("llll")}
                      </td>
                      {/* <td>{item.status && item.status == 0 && Đã hoàn thành}</td> */}
                      {item.status === 0 ? (
                        <>
                          {" "}
                          <td style={{ color: "blue" }}>Đã hoàn thành</td>{" "}
                          <td></td>{" "}
                        </>
                      ) : item.status === 1 ? (
                        <>
                          <td style={{ color: "#FFD700" }}>Chờ xác nhận</td>{" "}
                          <td>
                            <button
                              className="btn-submit btn-primary"
                              onClick={() => handleConfirm(item)}
                            >
                              Xác nhận
                            </button>
                            <button
                              className="btn-cancel btn-primary"
                              onClick={() => handleCancel(item)}
                            >
                              Hủy đơn
                            </button>
                          </td>
                        </>
                      ) : item.status === 2 ? (
                        <>
                          <td style={{ color: "green" }}>Đang giao</td>{" "}
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
                          <td style={{ color: "red" }}>Đã hủy</td>
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
                })
            }
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
                Họ tên:{" "}
                <div className="pull-right">
                  {listOrderDetail && listOrderDetail[0]?.name}
                </div>
                {/* Họ tên: <div className="pull-right">Xiao Ming</div> */}
              </div>
              <div className="ctm_phone">
                Điện thoại:{" "}
                <div className="pull-right">
                  {listOrderDetail && listOrderDetail[0]?.phone}
                </div>
                {/* Điện thoại: <div className="pull-right">0966932267</div> */}
              </div>
              <div className="ctm_address">
                Địa chỉ:{" "}
                <div className="pull-right">
                  {listOrderDetail && listOrderDetail[0]?.address}
                </div>
                {/* Địa chỉ: <div className="pull-right">Hồ Chí Minh</div> */}
              </div>
            </div>
            <div className="detail_order overflow-auto w-100">
              {listOrderDetail &&
                listOrderDetail.map((item) => (
                  <div className="item_product">
                    {/*<div className="item_id">{item.id}</div>*/}
                    <div className="item_product_left">
                      <div className="item_img">
                        <img
                          src={`http://localhost:8081/image/${item?.images}`}
                          alt="anh"
                        />
                      </div>
                    </div>
                    <div className="item_product_right">
                      <div className="item_name text-black">
                        {item?.name_product}
                      </div>
                      <div className="item_size text-black">
                        Size : &nbsp;
                        {item.size === 360
                          ? "S"
                          : item.size === 500
                          ? "M"
                          : "L"}
                      </div>
                      <div className="item_qty me-2 text-black">
                        x{item?.amount}
                      </div>
                      <div className="item_price me-2 text-black">
                        {item?.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                      <div style={{ display: "none", color: "#000" }}>
                        {" "}
                        {(total += item?.amount * item?.price)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="shipping_price">
              Phí vận chuyển{" "}
              <div className="pull-right">
                {feeShip?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>

            <div className="shipping_price">
              Giảm giá{" "}
              <div className="pull-right">
                {(
                  ((listOrderDetail[0]?.percentage || 0) / 100) *
                  total
                ).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>

            <div className="total_price">
              Tổng Tiền{" "}
              <div className="pull-right">
                {(
                  feeShip +
                  total -
                  ((listOrderDetail[0]?.percentage || 0) / 100) * total
                )?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
}
