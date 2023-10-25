import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import './Book.scss';
import axios from '../../../api/axios';
import { toast } from 'react-toastify';
import config from '../../../api/base';

export default function Book() {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [list, setList] = useState([]);
    const [listCategory, setListCategory] = useState(false);
    const [listNXB, setListNXB] = useState(false);
    const [listDiscount, setListDiscount] = useState(false);
    const [change, setChange] = useState(false);
    const [form, setForm] = useState();
    const [selectedImage, setSelectedImage] = useState(null);

    const [content, setContent] = useState();
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [author, setAuthor] = useState();
    const [yearPublish, setyearPublish] = useState();
    const [price, setPrice] = useState();
    const [detail, setDetail] = useState();
    const [id_category, setIDCategory] = useState();
    const [id_product, setIDProduct] = useState();
    const [id_company, setIDCompany] = useState();
    const [id_promotion, setIDPromotion] = useState();

    const handleShowAdd = (e) => {
        setForm('add');
        setShowAdd(true);
    };
    const handleCloseAdd = () => setShowAdd(false);

    const handleShowEdit = (item) => {
        setIDProduct(item.id_product);
        setName(item.name_product);
        setDetail(item.detail);
        setPrice(item.price);
        setIDCategory(item.id_category);
        setImage(item.images);
        setAuthor(item.author);
        setContent(item.content);
        setIDCompany(item.id_company);
        setIDPromotion(item.id_promotion);
        setyearPublish(item.year_publish);
        // console.log("Id product: ", item.id_product);
        // console.log("Id category: ", item.id_category);
        setShowEdit(true);
    };
    const handleCloseEdit = () => setShowEdit(false);

    const handleShowDelete = (item) => {
        setIDProduct(item.id_product);
        // console.log("Id product: ", item);
        setShowDel(true);
    };

    const handleCloseDel = () => setShowDel(false);

    async function getListProduct() {
        const result = await axios.get(axios.defaults.baseURL + `/admin/product?id=ALL`);
        setList(result?.data.listProduct);
        // console.log(result.data);
    }

    async function getListCategory() {
        let result = await axios.get(axios.defaults.baseURL + `/category?id=ALL`);
        setListCategory(result?.data.listCategory);
        // console.log(result.data);
    }

    async function getListNXB() {
        let result = await axios.get(axios.defaults.baseURL + `/admin/publishing-company?id=ALL`);
        setListNXB(result?.data.listNXB);
        // console.log(result.data);
    }

    async function getListDiscount() {
        let result = await axios.get(axios.defaults.baseURL + `/admin/promotion-product?id=ALL`);
        setListDiscount(result?.data.listPromotionProduct);
        console.log(result.data);
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
        formData.append('name_product', name);
        formData.append('images', image);
        formData.append('detail', detail);
        formData.append('price', price);
        formData.append('content', content);
        formData.append('author', author);
        formData.append('year_publish', yearPublish);
        formData.append('id_category', id_category);
        formData.append('id_company', id_company);
        formData.append('id_promotion', id_promotion);

        console.log(name, image, detail, price, id_category, content, author, yearPublish, id_company, id_promotion);

        const result = await axios.post(axios.defaults.baseURL + '/admin/createNewProduct', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log(result);

        setChange(!change);

        setImage(null);
        setSelectedImage(null);
        setName(null);
        setDetail(null);
        setPrice(null);
        setAuthor(null);
        setContent(null);
        setyearPublish(null);
        setIDCategory(null);
        setIDCompany(null);
        setIDPromotion(null);

        setShowAdd(false);

        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.error(result.data.message);
        if (result.data.errCode === 2) toast.warning(result.data.message);
    };

    const handleSubmitEdit = async () => {
        const formData = new FormData();
        formData.append('name_product', name);
        formData.append('images', image);
        formData.append('detail', detail);
        formData.append('price', price);
        formData.append('content', content);
        formData.append('author', author);
        formData.append('year_publish', yearPublish);
        formData.append('id_category', id_category);
        formData.append('id_company', id_company);
        formData.append('id_promotion', id_promotion);

        console.log(name, image, detail, price, content, author, yearPublish, id_category, id_company, id_promotion);

        const result = await axios.post(axios.defaults.baseURL + `/admin/updateProduct/${id_product}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        // console.log(result);

        setChange(!change);
        setImage(null);
        setSelectedImage(null);
        setName(null);
        setDetail(null);
        setPrice(null);
        setAuthor(null);
        setContent(null);
        setyearPublish(null);
        setIDCategory(null);
        setIDCompany(null);
        setIDPromotion(null);

        setShowEdit(false);

        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.warning(result.data.message);
    };

    const handleSubmitDel = async () => {
        const result = await axios.delete(axios.defaults.baseURL + `/admin/deleteProduct/${id_product}`, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        // console.log(name, image);
        setChange(!change);
        setImage(null);
        setSelectedImage(null);
        setName(null);
        setDetail(null);
        setPrice(null);
        setAuthor(null);
        setContent(null);
        setyearPublish(null);
        setIDCategory(null);
        setIDCompany(null);
        setIDPromotion(null);
        setShowDel(false);

        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.error(result.data.message);
    };

    useEffect(() => {
        getListCategory();
        getListProduct();
        getListNXB();
        getListDiscount();
    }, [change]);

    return (
        <div className="product-main-container">
            <div className="d-flex justify-content-center title-product">Danh sách sản phẩm</div>
            {/* <SearchProduct /> */}
            <button className="btn btn-success add-product-btn" onClick={handleShowAdd}>
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
                            <th>Tác giả</th>
                            <th>Nhà xuất bản</th>
                            <th>Năm xuất bản</th>
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
                                                src={`${config.PUBLIC_IMAGE_URL}${item.images}`}
                                                alt=""
                                                className="avatar-image"
                                            />
                                        </td>

                                        <td>{item.name_product}</td>
                                        <td>
                                            {item.price.toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}{' '}
                                        </td>
                                        <td>{item.author}</td>
                                        <td>{item.name_company}</td>
                                        <td>{item.year_publish}</td>
                                        <td>{item.name_category}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => handleShowEdit(item)}>
                                                <FaPencilAlt />
                                            </button>
                                            <button className="btn-delete" onClick={() => handleShowDelete(item)}>
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
                        <Modal.Title className="color-title text-center text-size-title">Thêm sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formName">
                                        <Form.Label className="text-black text-size-fit">Nhập tên</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Truyện cười Việt Nam"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formPrice">
                                        <Form.Label className="text-black text-size-fit">Nhập giá</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="150.000 đ"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formImage">
                                        <Form.Label className="text-black text-size-fit">Chọn ảnh</Form.Label>
                                        <Form.Control type="file" onChange={(e) => handleOnChangeImage(e)} />
                                        {selectedImage && (
                                            // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                            <img
                                                src={selectedImage}
                                                alt="Selected Image"
                                                height={90}
                                                width={90}
                                                className="mt-3"
                                            />
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formDetail">
                                        <Form.Label className="text-black text-size-fit">Nhập năm xuất bản</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="2023"
                                            value={yearPublish}
                                            onChange={(e) => setyearPublish(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formDetail">
                                        <Form.Label className="text-black text-size-fit">Nhập chi tiết</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Đọc cười bệnh"
                                            value={detail}
                                            onChange={(e) => setDetail(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formDetail">
                                        <Form.Label className="text-black text-size-fit">Nhập tên tác giả</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Xiao Ming"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-2" controlId="formDetail">
                                <Form.Label className="text-black text-size-fit">Nhập nội dung</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Đọc cười bệnh"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formCategory">
                                        <Form.Label className="text-black text-size-fit">Chọn danh mục</Form.Label>
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
                                                                {item.name_category}
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formCategory">
                                        <Form.Label className="text-black text-size-fit">Chọn nhà xuất bản</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={id_company}
                                            onChange={(e) => setIDCompany(e.target.value)}
                                        >
                                            <option>Chọn nhà xuất bản</option>
                                            {listNXB &&
                                                listNXB.map((item, index) => {
                                                    return (
                                                        <>
                                                            <option key={item.id} value={item.id_company}>
                                                                {item.name_company}
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formCategory">
                                        <Form.Label className="text-black text-size-fit">Chọn mã giảm giá</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={id_promotion}
                                            onChange={(e) => setIDPromotion(e.target.value)}
                                        >
                                            <option>Chọn mã giảm giá</option>
                                            {listDiscount &&
                                                listDiscount.map((item, index) => {
                                                    return (
                                                        <>
                                                            <option key={item.id} value={item.id_promotion}>
                                                                {item.percentage} %
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
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
                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formName">
                                        <Form.Label className="text-black text-size-fit">Nhập tên</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Truyện cười Việt Nam"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formPrice">
                                        <Form.Label className="text-black text-size-fit">Nhập giá</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="150.000 đ"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formImage">
                                        <Form.Label className="text-black text-size-fit">Chọn ảnh</Form.Label>
                                        <Form.Control type="file" onChange={(e) => handleOnChangeImage(e)} />
                                        {selectedImage && (
                                            // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                            <img
                                                src={selectedImage}
                                                alt="Selected Image"
                                                height={90}
                                                width={90}
                                                className="mt-3"
                                            />
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formDetail">
                                        <Form.Label className="text-black text-size-fit">Nhập năm xuất bản</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="2023"
                                            value={yearPublish}
                                            onChange={(e) => setyearPublish(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formDetail">
                                        <Form.Label className="text-black text-size-fit">Nhập chi tiết</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Đọc cười bệnh"
                                            value={detail}
                                            onChange={(e) => setDetail(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formDetail">
                                        <Form.Label className="text-black text-size-fit">Nhập tên tác giả</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Xiao Ming"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-2" controlId="formDetail">
                                <Form.Label className="text-black text-size-fit">Nhập nội dung</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Đọc cười bệnh"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formCategory">
                                        <Form.Label className="text-black text-size-fit">Chọn danh mục</Form.Label>
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
                                                                {item.name_category}
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formCategory">
                                        <Form.Label className="text-black text-size-fit">Chọn nhà xuất bản</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={id_company}
                                            onChange={(e) => setIDCompany(e.target.value)}
                                        >
                                            <option>Chọn nhà xuất bản</option>
                                            {listNXB &&
                                                listNXB.map((item, index) => {
                                                    return (
                                                        <>
                                                            <option key={item.id} value={item.id_company}>
                                                                {item.name_company}
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" controlId="formCategory">
                                        <Form.Label className="text-black text-size-fit">Chọn mã giảm giá</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={id_promotion}
                                            onChange={(e) => setIDPromotion(e.target.value)}
                                        >
                                            <option>Chọn mã giảm giá</option>
                                            {listDiscount &&
                                                listDiscount.map((item, index) => {
                                                    return (
                                                        <>
                                                            <option key={item.id} value={item.id_promotion}>
                                                                {item.percentage} %
                                                            </option>
                                                        </>
                                                    );
                                                })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleSubmitEdit}>
                            Đồng ý
                        </Button>
                        <Button variant="success" onClick={handleCloseEdit}>
                            Không
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
                                <img src={`${config.PUBLIC_IMAGE_URL}${image}`} height={150} width={150} alt="img" />
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
