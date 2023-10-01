import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './BookDetail.scss';
import Img from '../../../Assets/img/kgd.jpg';

export default function BookDetail() {
    const [number, setNumber] = useState(1); //number of item
    const updateQuantity = (value) => {
        setNumber((prevState) => prevState + value);
    };
    return (
        <div className="products-info">
            <div class="product-info">
                <div class="left-product">
                    <div class="big-image-product">
                        <img src={Img} alt=""></img>
                    </div>
                    <div class="images-product">
                        <div class="small-image-product">
                            <img src={Img} alt="" onclick="showImage(this.src)"></img>
                        </div>
                        <div class="small-image-product">
                            <img src={Img} alt="" onclick="showImage(this.src)"></img>
                        </div>
                        <div class="small-image-product">
                            <img src={Img} alt="" onclick="showImage(this.src)"></img>
                        </div>
                        <div class="small-image-product">
                            <img src={Img} alt="" onclick="showImage(this.src)"></img>
                        </div>
                    </div>
                </div>

                <div class="right-product">
                    <div class="product-name">Không Gia Đình</div>
                    <div class="book-info">
                        <p className="product-nxb">Nhà xuất bản: Kim Đồng</p>
                        <p className="product-author"> Tác giả: Hector Malot</p>
                    </div>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <div class="main-price">
                        <div class="price">110.000đ</div>
                        <span>150.000đ</span>
                    </div>
                    <div class="time-delivery">
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
                            <button class="btn-giam" onClick={() => updateQuantity(-1)}>
                                -
                            </button>
                            <p
                                style={{
                                    fontSize: '18px',
                                    marginTop: '-3px',
                                }}
                            >
                                {number}
                            </p>
                            <button class="btn-tang" onClick={() => updateQuantity(1)}>
                                +
                            </button>
                        </button>
                    </div>
                    <div class="btn-box">
                        <div class="cart-btn">
                            <Button id="add-btn" variant="outline-danger">
                                <i class="fa-solid fa-shopping-cart add-btn-box"></i>
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                        <div class="buy-btn">
                            <Button id="order-btn" variant="danger">
                                <i class="fa-solid order-btn-box"></i>
                                Mua ngay
                            </Button>
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
                </div>
            </div>
        </div>
    );
}