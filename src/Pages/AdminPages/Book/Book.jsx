import React, { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";

import "./Book.scss";
// import SearchProduct from "../../Components/SearchProduct/SearchProduct";
import axios from "axios";
import { toast } from "react-toastify";

export default function Book() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [list, setList] = useState([]);
  const [listCategory, setListCategory] = useState(false);
  const [change, setChange] = useState(false);
  const [form, setForm] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [detail, setDetail] = useState();
  const [id_category, setIDCategory] = useState();
  const [id_product, setIDProduct] = useState();

  const handleShowAdd = (e) => {
    setForm("add");
    setShowAdd(true);
  };
  const handleCloseAdd = () => setShowAdd(false);

  const handleShowEdit = (item) => {
    setName(item.name_product);
    setDetail(item.detail);
    setPrice(item.price);
    setIDProduct(item.id_product);
    setIDCategory(item.id_category);
    setImage(item.images);
    // console.log("Id product: ", item.id_product);
    // console.log("Id category: ", item.id_category);
    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);

  const handleShowDelete = (item) => {
    setName(item.name_product);
    setIDProduct(item.id_product);
    setImage(item.images);
    // console.log("Id product: ", item);
    setShowDel(true);
  };

  const handleCloseDel = () => setShowDel(false);

  async function getListProduct() {
    // const result = await axiosApiInstance.get(
    //   axiosApiInstance.defaults.baseURL + "/api/v1/hero/get"
    // );
    const result = await axios.get(
      `http://localhost:8081/api/v1/admin/product?id=ALL`
    );
    setList(result?.data.listProduct);
    // console.log(result.data);
  }

  async function getListCategory() {
    // const result = await axiosApiInstance.get(
    //   axiosApiInstance.defaults.baseURL + "/api/v1/category?id=ALL"
    // );
    let result = await axios.get(
      `http://localhost:8081/api/v1/category?id=ALL`
    );
    setListCategory(result?.data.listCategory);
    // console.log(result.data);
  }

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setImage(null);
      setSelectedImage(null);
    }
  };

  const handleSubmitAdd = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("images", image);
    formData.append("detail", detail);
    formData.append("price", price);
    formData.append("id_category", id_category);

    console.log(name, image, detail, price, id_category);

    const result = await axios.post(
      "http://localhost:8081/api/v1/admin/createNewProduct",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log(result);

    setChange(!change);
    setImage(null);
    setSelectedImage(null);
    setName(null);
    setDetail(null);
    setPrice(null);
    setShowAdd(false);

    if (result.data.errCode === 0) toast.success(result.data.message);
    if (result.data.errCode === 2) toast.warning(result.data.message);
  };

  const handleSubmitEdit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("images", image);
    formData.append("detail", detail);
    formData.append("price", price);
    formData.append("id_category", id_category);

    // console.log(name, image, detail, price, id_category);

    const result = await axios.post(
      `http://localhost:8081/api/v1/admin/updateProduct/${id_product}/${id_category}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // console.log(result);

    setChange(!change);
    setImage(null);
    setSelectedImage(null);
    setName(null);
    setDetail(null);
    setPrice(null);
    setShowEdit(false);

    if (result.data.errCode === 0) toast.success(result.data.message);
    if (result.data.errCode === 1) toast.warning(result.data.message);
  };

  const handleSubmitDel = async () => {
    const result = await axios.delete(
      `http://localhost:8081/api/v1/admin/deleteProduct/${id_product}`,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // console.log(name, image);
    setChange(!change);
    setImage(null);
    setSelectedImage(null);
    setShowDel(false);

    if (result.data.errCode === 0) toast.success(result.data.message);
    if (result.data.errCode === 1) toast.error(result.data.message);
  };

  useEffect(() => {
    getListCategory();
    getListProduct();
  }, [change]);

  return (
    <div className="product-main-container">
      <div className="d-flex justify-content-center title-product">
        Danh sách sản phẩm
      </div>

      {/* <SearchProduct /> */}
      <button
        className="btn btn-success add-product-btn"
        onClick={handleShowAdd}
      >
        <FaPlus />
      </button>
      <div className="table-product">
        <table id="main-product">
          <tbody>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Thao tác</th>
            </tr>

            {list &&
              list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:8081/image/${item.images}`}
                        alt=""
                        className="avatar-image"
                      />
                    </td>

                    <td>{item.name_product}</td>
                    <td>
                      {item.price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleShowEdit(item)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="btn-delete"
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
              Thêm sản phẩm
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2" controlId="formName">
                <Form.Label className="text-black text-size-fit">
                  Nhập tên sản phẩm
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Áo bóng đá Manchester United"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formImage">
                <Form.Label className="text-black text-size-fit">
                  Chọn ảnh sản phẩm:
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => handleOnChangeImage(e)}
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    height={90}
                    width={90}
                    className="mt-3"
                  />
                )}
              </Form.Group>

              <Form.Group className="mb-2" controlId="formDetail">
                <Form.Label className="text-black text-size-fit">
                  Nhập chi tiết sản phẩm
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Áo bóng đá CLB Manchester United sân nhà"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formPrice">
                <Form.Label className="text-black text-size-fit">
                  Nhập giá sản phẩm
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="150.000 đ"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formCategory">
                <Form.Label className="text-black text-size-fit">
                  Chọn danh mục sản phẩm
                </Form.Label>
                <Form.Control
                  as="select"
                  value={id_category}
                  onChange={(e) => setIDCategory(e.target.value)}
                >
                  <option>Chọn danh mục</option>
                  {listCategory &&
                    listCategory.map((item, index) => {
                      return (
                        <>
                          <option key={item.id} value={item.id_category}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </Form.Control>
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
              Chỉnh sửa sản phẩm
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2" controlId="formName">
                <Form.Label className="text-black text-size-fit">
                  Nhập tên sản phẩm
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Áo bóng đá Manchester United"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formImage">
                <Form.Label className="text-black text-size-fit">
                  Chọn ảnh sản phẩm:
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => handleOnChangeImage(e)}
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    height={90}
                    width={90}
                    className="mt-3"
                  />
                )}
              </Form.Group>

              <Form.Group className="mb-2" controlId="formDetail">
                <Form.Label className="text-black text-size-fit">
                  Nhập chi tiết sản phẩm
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Áo bóng đá CLB Manchester United sân nhà"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formPrice">
                <Form.Label className="text-black text-size-fit">
                  Nhập giá sản phẩm
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="150.000 đ"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formCategory">
                <Form.Label className="text-black text-size-fit">
                  Chọn danh mục sản phẩm
                </Form.Label>
                <Form.Control
                  as="select"
                  value={id_category}
                  onChange={(e) => setIDCategory(e.target.value)}
                >
                  <option>Chọn danh mục</option>
                  {listCategory &&
                    listCategory.map((item, index) => {
                      return (
                        <>
                          <option key={item.id} value={item.id_category}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                </Form.Control>
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
            <Modal.Title>Xoá sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-category-body text-center">
              <div className="delete-container">
                <label className="ban-co-muon-xoa text-black text-size-fit">
                  Ngài có chắc chắn muốn xóa sản phẩm : {name}
                  {/* {categoryDelete.name} */}
                </label>
                <img
                  src={`http://localhost:8081/image/${image}`}
                  height={150}
                  width={150}
                  alt="img"
                />
                {/* <input type='file' onChange={(event) => this.fileSelectedHandle(event)}></input> */}
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
