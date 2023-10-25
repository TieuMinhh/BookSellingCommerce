import React, { useState, useEffect } from 'react';
// import SearchCategory from "../../Components/SearchCategory/SearchCategory";
import './Category.scss';
import { FaTrash, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from '../../../api/axios';
import { toast } from 'react-toastify';
import config from '../../../api/base';

export default function Category() {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [form, setForm] = useState();
    const [list, setList] = useState([]);
    const [change, setChange] = useState([]);
    const [name, setName] = useState('');
    const [id, setID] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState();

    const handleShowAdd = (e) => {
        setForm('add');
        setShowAdd(true);
    };
    const handleCloseAdd = () => setShowAdd(false);

    const handleShowEdit = (item) => {
        setForm('edit');
        setName(item.name_category);
        setID(item.id_category);
        // console.log("Id category: ", item);
        setShowEdit(true);
    };
    const handleCloseEdit = () => setShowEdit(false);

    const handleShowDelete = (item) => {
        setName(item.name_category);
        setID(item.id_category);
        setImage(item.logo);
        // console.log("Id category: ", item);
        setShowDel(true);
    };
    const handleCloseDel = () => setShowDel(false);

    async function getListCategory() {
        const result = await axios.get(axios.defaults.baseURL + '/category?id=ALL');
        setList(result?.data.listCategory);
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
        formData.append('name_category', name);
        formData.append('logo', image);

        const result = await axios.post(axios.defaults.baseURL + '/admin/create-category', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(result);

        // console.log(name, image);
        setChange(!change);
        setShowAdd(false);
        setName(null);
        setImage(null);
        setSelectedImage(null);
        if (result.data.errCode === 0) toast.success(result.data.message);
        if (result.data.errCode === 1) toast.error(result.data.message);
        if (result.data.errCode === 2) toast.warning(result.data.message);
    };

    const handleSubmitEdit = async () => {
        // console.log("Id_category: ", id);
        const formData = new FormData();
        formData.append('name_category', name);
        formData.append('logo', image);

        const result = await axios.post(axios.defaults.baseURL + `/admin/update-category?id=${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log(result);
        // console.log(name, image);
        setChange(!change);
        setShowEdit(false);
        setImage(null);
        setSelectedImage(null);

        if (result.status === 200) toast.success(result.data.message);
    };

    const handleSubmitDel = async () => {
        const result = await axios.delete(axios.defaults.baseURL + `/admin/delete-category?id_category=${id}`, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        // console.log(name, image);
        console.log(result);
        setChange(!change);
        setImage(null);
        setSelectedImage(null);
        setShowDel(false);
        if (result.status === 200) toast.success(result.data.message);
        if (result.status === 201) toast.error(result.data.message);
    };

    useEffect(() => {
        getListCategory();
    }, [change]);

    return (
        <div className="category-main-container">
            <div className="title-category">Danh mục sản phẩm</div>

            {/* <SearchCategory className="search-category" /> */}

            <button className="btn btn-success add-category-btn" onClick={handleShowAdd}>
                <FaPlus />
            </button>
            <div className="table-category">
                <table id="main-category">
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Ảnh</th>
                            <th>Tên danh mục</th>
                            <th>Thao tác</th>
                        </tr>

                        {list &&
                            list.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={`${config.PUBLIC_IMAGE_URL}${item && item?.logo}`}
                                                alt=""
                                                className="avatar-image"
                                            />
                                        </td>

                                        <td>{item.name_category}</td>

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
                        <Modal.Title className="color-title text-center text-size-title">Thêm danh mục</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label className="text-black text-size-fit">Nhập tên danh mục</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Áo bóng đá"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formImg">
                                <Form.Label className="text-black text-size-fit">Chọn ảnh danh mục</Form.Label>
                                <Form.Control
                                    className="text-black"
                                    type="file"
                                    placeholder="Chọn ảnh danh mục"
                                    onChange={(e) => handleOnChangeImage(e)}
                                />
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
                            Chỉnh sửa danh mục
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label className="text-black text-size-fit">Nhập tên danh mục</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Áo bóng đá"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formImg">
                                <Form.Label className="text-black text-size-fit">Chọn ảnh danh mục</Form.Label>
                                <Form.Control
                                    className="text-black"
                                    type="file"
                                    placeholder="Chọn ảnh danh mục"
                                    onChange={(e) => handleOnChangeImage(e)}
                                />
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
                        <Modal.Title className="text-size-title">Xoá danh mục</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-category-body text-center">
                            <div className="delete-container">
                                <label className="ban-co-muon-xoa text-black text-size-fit">
                                    Ngài có chắc chắn muốn xóa danh mục :{name}
                                </label>
                                <img src={`${config.PUBLIC_IMAGE_URL}/${image}`} height={150} width={150} alt="img" />
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
