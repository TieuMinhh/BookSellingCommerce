import React, { useState, useEffect } from "react";
import "./Promotion.scss";
import axios from "axios";
// import { Link } from "react-router-dom";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";

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

  // const originalValue = "2023-08-06T17:00:00.000Z";
  // // Chuyển đổi thành định dạng 'yyyy-MM-dd'
  // const formattedValue = new Date(originalValue).toISOString().slice(0, 10);
  // console.log(formattedValue); // Output: "2023-08-06"

  async function getListDiscount() {
    // const result = await axiosApiInstance.get(
    //   axiosApiInstance.defaults.baseURL + "/api/v1/category?id=ALL"
    // );
    let result = await axios.get(
      `http://localhost:8081/api/v1/discount?id=ALL`
    );
    setList(result?.data.listDiscount);
    // console.log(result.data);
  }

  const handleShowAdd = (e) => {
    setForm("add");
    setShowAdd(true);
  };

  const handleShowEdit = (item) => {
    setForm("edit");
    setIDDiscount(item.discount_id);
    setCode(item.discount_code);
    setPercentage(item.percentage);
    // setStartDay(Date(item.start_date).toISOString().slice(0, 10));
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
    const result = await axios.post(
      "http://localhost:8081/api/v1/admin/createDiscount",
      {
        discount_code: code,
        percentage: percentage,
        start_date: startDay,
        end_date: endDay,
        description: description,
      }
    );

    console.log(code, percentage, startDay, endDay, description);

    console.log(result);

    setChange(!change);
    setCode(null);
    setPercentage(null);
    setStartDay(null);
    setEndDay(null);
    setDescription(null);

    if (result.data.errCode === 0) toast.success(result.data.message);
    if (result.data.errCode === 2) toast.warning(result.data.message);
    setShowAdd(false);
  };

  const handleSubmitEdit = async () => {
    const result = await axios.post(
      `http://localhost:8081/api/v1/admin/updateDiscount/${ID_discount}`,
      {
        discount_code: code,
        percentage: percentage,
        start_date: startDay,
        end_date: endDay,
        description: description,
      }
    );

    console.log(result);

    setChange(!change);
    setCode(null);
    setPercentage(null);
    setStartDay(null);
    setEndDay(null);
    setDescription(null);

    if (result.data.errCode === 0) toast.success(result.data.message);
    if (result.data.errCode === 1) toast.warning(result.data.message);
    setShowEdit(false);
  };

  const handleSubmitDel = async () => {
    const result = await axios.delete(
      `http://localhost:8081/api/v1/admin/deleteDiscount/${ID_discount}`
    );

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
      <div className="d-flex justify-content-center promotion-title">
        Danh sách khuyến mãi
      </div>
      <button
        className="btn btn-success add-promotion-btn"
        onClick={handleShowAdd}
      >
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
                    <td>{moment(item.start_date).format("L")}</td>
                    <td>{moment(item.end_date).format("L")}</td>
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
                      onChange={(e) => setPercentage(e.target.value)}
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
                      onChange={(e) => setStartDay(e.target.value)}
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
            <Button variant="secondary" onClick={handleCloseDel}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      }

      {
        <Modal size="m" show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header className="background-header" closeButton>
            <Modal.Title className="color-title text-center text-size-title">
              Chỉnh khuyến mãi
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
                      onChange={(e) => setPercentage(e.target.value)}
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
                      onChange={(e) => setStartDay(e.target.value)}
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
            <Button variant="secondary" onClick={handleCloseDel}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      }

      {
        <Modal size="m" show={showDel} onHide={handleCloseDel}>
          <Modal.Header closeButton>
            <Modal.Title className="text-size-title">
              Xoá khuyễn mãi
            </Modal.Title>
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
  );
}
