import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './BookDetail.scss';
import axios from 'axios';

import Img from '../../../Assets/img/kgd.jpg';
import { toast } from 'react-toastify';

import { getToken } from '../../../Services/Token';
import { Link } from 'react-router-dom';

export default function BookDetail() {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState(1); //number of item
    const [quantity, setQuantity] = useState(1);
    const [isAddSuccess, setIsAddSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }, []);

    useEffect(() => {
        if (isAddSuccess === true) {
            setTimeout(() => {
                setIsAddSuccess(false);
            }, 6000);
        }
    }, [isAddSuccess]);

    const updateQuantity = (value) => {
        setNumber((prevState) => prevState + value);
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    async function getDetailProduct() {
        // const result = await axiosApiInstance.get(
        //   axiosApiInstance.defaults.baseURL + "/api/v1/hero/get"
        // );
        const result = await axios.get(`http://localhost:8081/api/v1/chiTiet?id=${id}`);
        setList(result?.data.listProduct);
        console.log(result.data);
        // console.log(list.price);
    }

    const handleIncrement = () => {
        updateQuantity(1);
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (number >= 1) updateQuantity(-1);
        if (quantity > 0) setQuantity(quantity - 1);
    };

    const handleAddToCart = async () => {
        let token = await getToken();
        // console.log('Token là ', token);
        let id_product = id;
        // let result = await AddToCart(token, id_product, quantity);

        // console.log(result.message);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // console.log('Add Cart: ', token, id_product, quantity);
        let result = await axios.post(`http://localhost:8081/api/v1/add-to-cart/${id_product}`, { quantity });
        console.log(result);
        // return response.data;

        if (result.status === 200) toast.success(result.data.message);
        if (result.status === 500) toast.error(result.data.message);
    };

    useEffect(() => {
        getDetailProduct();
    }, []);

    return (
        <div className="products-info">
            <div class="product-info">
                <div class="left-product">
                    <div class="big-image-product">
                        <img
                            src={`http://localhost:8081/image/${list && list[0]?.images}`}
                            alt=""
                            className="avatar-image"
                        />
                        {/* <img src={Img} alt=""></img> */}
                    </div>
                    <div class="images-product">
                        <div class="small-image-product">
                            <img
                                src={`http://localhost:8081/image/${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                        <div class="small-image-product">
                            <img
                                src={`http://localhost:8081/image/${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                        <div class="small-image-product">
                            <img
                                src={`http://localhost:8081/image/${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                        <div class="small-image-product">
                            <img
                                src={`http://localhost:8081/image/${list && list[0]?.images}`}
                                alt=""
                                className="avatar-image"
                            />
                        </div>
                    </div>
                </div>

                <div class="right-product">
                    <div class="product-name">{list && list[0]?.name_product}</div>
                    <div class="book-info">
                        <p className="product-nxb">Nhà xuất bản: {list && list[0]?.name_company}</p>
                        <p className="product-author"> Tác giả: {list && list[0]?.author}</p>
                    </div>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>

                    <div class="main-price">
                        <div class="price">
                            {list &&
                                list[0]?.price.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}{' '}
                            {/* 200.000 đ */}
                        </div>
                        <span>150.000đ</span>
                    </div>

                    <div className="time-delivery">
                        <div className="info-delivery">
                            <p>Thời gian giao hàng</p>
                            <p>Chính sách đổi trả</p>
                        </div>
                        <div>
                            <p>Dự kiến từ 1-3 ngày</p>
                            <p>Khui sách = miễn đổi trả</p>
                        </div>
                    </div>

                    <div class="quantity">
                        <p class="quantityName">Số lượng :</p>
                        <button class="counter">
                            <button class="btn-giam" onClick={handleDecrement}>
                                -
                            </button>
                            <p
                                style={{
                                    fontSize: '18px',
                                }}
                            >
                                {number}
                            </p>
                            <button class="btn-tang" onClick={handleIncrement}>
                                +
                            </button>
                        </button>
                    </div>

                    <div class="btn-box">
                        <div class="cart-btn">
                            <Button
                                id="add-btn"
                                variant="outline-danger"
                                onClick={() => {
                                    handleAddToCart();
                                    setIsAddSuccess(true);
                                }}
                            >
                                <i class="fa-solid fa-shopping-cart add-btn-box"></i>
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                        <div class="buy-btn">
                            <Link to="/cart">
                                <Button id="order-btn" variant="danger">
                                    <i class="fa-solid order-btn-box"></i>
                                    Mua ngay
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="product-related">
                <div class="product-related-title">
                    <p>Bạn có thể thích</p>
                </div>
                <div class=" product-related-content">
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="product-related-item">
                        <img src={Img} alt=""></img>
                    </div>
                </div>
            </div>

            <div class="line"></div>

            <div class="info-describe">
                <h4> Thông tin sản phẩm</h4>

                <div className="info-info">
                    <ul className="left-info">
                        <li>Mã hàng</li>
                        <li>Tên Nhà Cung Cấp </li>
                        <li>Tác giả</li>
                        <li>Người dịch</li>
                        <li>Nhà xuất bản</li>
                        <li>Năm xuất bản</li>
                    </ul>

                    <ul className="right-info">
                        <li>8935230009887</li>
                        <li>Cty Văn Hóa & Truyền Thông Trí Việt.</li>
                        <li>Hector Malot</li>
                        <li>Xiao Ming</li>
                        <li>Tân Đen Co.op publish</li>
                        <li>2023</li>
                    </ul>
                </div>

                <div class="line"></div>
                <p class="name-describe"> Không Gia Đình</p>
                <div class="detail-describe">
                    <p>
                        Thở xa lắm, giữa lòng nước Pháp thế kỷ XIX, có một câu chuyện... Câu chuyện về cậu bé bất hạnh
                        Rémi lang bạt trên dặm trường thiên lý, dấn thân giữa tất cả những bần cùng đói khổ và những xa
                        hoa lộng lẫy. Cậu thiếu niên nhỏ tuổi đã đi qua biết bao miền quê, thấy biết bao cảnh đời, mỗi
                        bước chân đều in dấu ấn của những câu chuyện kỳ lạ, có lúc hoan hỉ mừng vui, có khi thê lương
                        đau đớn nhưng luôn lấp lánh tình người. Cuộc hành trình của Rémi với đoàn xiếc khỉ, chó, với
                        những người thợ mỏ, với cậu bé hát rong người Ý đưa người đọc trải nghiệm mọi cung bậc cảm xúc:
                        thích thú, bất ngờ, hồi hộp, thương tâm, thậm chí cả tuyệt vọng và dạy cho ta - những người
                        chưa, đang, hay đã trưởng thành - những bài học thấm thía về ý chí, nghị lực và lao động chân
                        chính... Bàn về Không gia đình không cần bất cứ lời bình luận hoa mỹ nào khác, chỉ gói gọn trong
                        hai từ: Kinh điển!
                    </p>
                    <div className=""></div>
                </div>
            </div>

            {/* Start modal add cart success */}
            {isAddSuccess && (
                <div className="modal-add-success" onClick={() => setIsAddSuccess(false)}>
                    <div className="modal-container-success">
                        <div className="cover-icon-success">
                            <i
                                class="fa-solid fa-check detail-icon-success"
                                style={{ color: '#fff', lineHeight: '60px' }}
                            ></i>
                        </div>
                        <p className="sub-a-success" style={{ color: '#fff' }}>
                            Sản phẩm đã được thêm vào Giỏ hàng
                        </p>
                    </div>
                </div>
            )}
            {/* End modal add cart success */}
        </div>
    );
}
