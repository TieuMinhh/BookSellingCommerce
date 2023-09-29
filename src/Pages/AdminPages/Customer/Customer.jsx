import React, { useState, useEffect } from "react";
import "./Customer.scss";
import { FaLock, FaUnlock } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";
// import axiosApiInstance from "../../Configs/interceptor";
import axios from "axios";
import moment from "moment";

export default function Customer() {
  const [list, setList] = useState([]);
  const [change, setChange] = useState([]);
  const [showBlock, setShowBlock] = useState(false);
  const [showUnBlock, setShowUnBlock] = useState(false);

  const handleShowBlock = () => {
    setShowBlock(true);
  };

  const handleCloseBlock = () => {
    setShowBlock(false);
  };

  const handleShowUnBlock = () => {
    setShowUnBlock(true);
  };

  const handleCloseUnBlock = () => {
    setShowUnBlock(false);
  };

  async function getListCustomer() {
    // const result = await axiosApiInstance.get(
    //   axiosApiInstance.defaults.baseURL + "/api/v1/admin/account"
    // );
    const result = await axios.get(
      `http://localhost:8081/api/v1/admin/account`
    );
    setList(result?.data.listAccount);
    // console.log(result.data);
  }

  useEffect(() => {
    getListCustomer();
  }, [change]);

  return (
    <div className="account-main-container">
      <div className="d-flex justify-content-center title-account">
        Danh sách khách hàng
      </div>
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
                        src={`http://localhost:8081/image/${item.avatar}`}
                        alt="user-avatar"
                        className="avatar-image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>

                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{moment(item.created_time).format("llll")}</td>
                    <td>
                      {0 === 0 ? (
                        <button
                          className="btn btn-success lock-btn"
                          onClick={handleShowBlock}
                        >
                          <i>
                            <FaLock />
                          </i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger lock-btn"
                          onClick={handleShowUnBlock}
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
            <Modal.Title className="color-title text-center text-size-title">
              Khoá tài khoản
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="text-black text-size-fit">
                  Lí do khoá tài khoản
                </Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseBlock}>
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
            <Modal.Title className="color-title text-center text-size-title">
              Mở khoá tài khoản
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-black text-size-fit">
            Ngài có chắc chắn muốn mở khoá tài khoản này ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseUnBlock}>
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
