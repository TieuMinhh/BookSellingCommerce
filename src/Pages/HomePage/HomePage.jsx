import './HomePage.scss';
import Banner1 from '../../Assets/img/banner1.png';
import Banner2 from '../../Assets/img/banner2.jpg';
import Banner3 from '../../Assets/img/banner3.jpg';
import Banner4 from '../../Assets/img/banner4.jpg';
import Banner5 from '../../Assets/img/banner5.jpg';
import Banner6 from '../../Assets/img/banner6.jpg';
import Banner7 from '../../Assets/img/banner7.jpg';

import Item1 from '../../Assets/img/item1.png';
import Item2 from '../../Assets/img/item2.png';
import Item3 from '../../Assets/img/item3.png';
import Item4 from '../../Assets/img/item4.png';
import Item5 from '../../Assets/img/item5.png';
import Item6 from '../../Assets/img/item6.png';
import Item7 from '../../Assets/img/item7.png';
import Item8 from '../../Assets/img/item8.png';
import Item9 from '../../Assets/img/item9.png';
import Item10 from '../../Assets/img/item10.png';

import Cate1 from '../../Assets/img/cate1.jpg';
import Cate2 from '../../Assets/img/cate2.jpg';
import Cate3 from '../../Assets/img/cate3.jpg';
import Cate4 from '../../Assets/img/cate4.jpg';
import Cate5 from '../../Assets/img/cate5.jpg';
import Cate6 from '../../Assets/img/cate6.jpg';
import Cate7 from '../../Assets/img/cate7.jpg';
import Cate8 from '../../Assets/img/cate8.jpg';
import Cate9 from '../../Assets/img/cate9.jpg';
import Cate10 from '../../Assets/img/cate10.jpg';

import TrendImg from '../../Assets/img/trend-buy.png';

import IconMenu from '../../Assets/img/icon-menu.png';

import BookTrend from '../../Assets/img/book_trend.jpg';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function HomePage() {
    const [numberCate, setNumberCate] = useState('1');

    return (
        <div className="wrapper-content-homepage">
            <div className="container-content-homepage">
                <div className="content-banner-homepage">
                    <div className="content-top-banner">
                        <div className="content-slider-banner">
                            <img src={Banner1} alt="" />
                        </div>
                        <div className="content-right-slider">
                            <div className="cover-right-img" style={{ paddingBottom: '10px', boxSizing: 'border-box' }}>
                                <img src={Banner2} alt="" />
                            </div>
                            <div className="cover-right-img">
                                <img src={Banner3} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="content-bottom-banner">
                        <div className="sub-bottom-banner" style={{ marginRight: '12px' }}>
                            <img src={Banner4} alt="" />
                        </div>
                        <div className="sub-bottom-banner" style={{ marginRight: '12px' }}>
                            <img src={Banner5} alt="" />
                        </div>
                        <div className="sub-bottom-banner" style={{ marginRight: '12px' }}>
                            <img src={Banner6} alt="" />
                        </div>
                        <div className="sub-bottom-banner">
                            <img src={Banner7} alt="" />
                        </div>
                    </div>
                </div>
                <div className="content-item-homepage">
                    <div className="cover-content-item">
                        <img src={Item1} alt="" />
                        <p>Sale Thứ 3</p>
                    </div>
                    <div className="cover-content-item">
                        <img src={Item2} alt="" />
                        <p>Phái đẹp</p>
                    </div>
                    <div className="cover-content-item">
                        <img src={Item3} alt="" />
                        <p>Flash Sale</p>
                    </div>
                    <div className="cover-content-item">
                        <img src={Item4} alt="" />
                        <p>Mã Giảm Giá</p>
                    </div>
                    <div className="cover-content-item">
                        <img src={Item5} alt="" />
                        <p>Đồ Chơi</p>
                    </div>
                    <div className="cover-content-item">
                        <img src={Item6} alt="" />
                        <p>Máy Tính</p>
                    </div>
                    <div className="cover-content-item">
                        <img src={Item7} alt="" />
                        <p>Thiếu Nhi</p>
                    </div>
                    <div className="cover-content-item">
                        <img src={Item8} alt="" />
                        <p>Sản Phẩm Mới</p>
                    </div>
                    <div className="cover-content-item">
                        <img src={Item9} alt="" />
                        <p>Manga</p>
                    </div>
                    <div className="cover-content-item">
                        <img src={Item10} alt="" />
                        <p>Phiên Chợ Sách cũ</p>
                    </div>
                </div>
                <div className="content-cate-homepage">
                    <div className="cover-title">
                        <img src={IconMenu} alt="" />
                        <p className="title-content-cate">Danh mục sản phẩm</p>
                    </div>

                    <div className="detail-cate-item">
                        <div className="cover-content-item">
                            <img src={Cate1} alt="" />
                            <p>Halloween</p>
                        </div>
                        <div className="cover-content-item">
                            <img src={Cate2} alt="" />
                            <p>Đồ chơi giáo dục</p>
                        </div>
                        <div className="cover-content-item">
                            <img src={Cate3} alt="" />
                            <p>Giấy photo</p>
                        </div>
                        <div className="cover-content-item">
                            <img src={Cate4} alt="" />
                            <p>Tâm linh luân hồn</p>
                        </div>
                        <div className="cover-content-item">
                            <img src={Cate5} alt="" />
                            <p>Ngôn tình</p>
                        </div>
                        <div className="cover-content-item">
                            <img src={Cate6} alt="" />
                            <p>Xu hướng kinh tế</p>
                        </div>
                        <div className="cover-content-item">
                            <img src={Cate7} alt="" />
                            <p>Tâm lý thao túng</p>
                        </div>
                        <div className="cover-content-item">
                            <img src={Cate8} alt="" />
                            <p>Thiếu nhi</p>
                        </div>
                        <div className="cover-content-item">
                            <img src={Cate9} alt="" />
                            <p>Văn học kinh điển</p>
                        </div>
                        <div className="cover-content-item">
                            <img src={Cate10} alt="" />
                            <p>Tiểu thuyết</p>
                        </div>
                    </div>
                </div>
                <div className="content-trend-homepage">
                    <div className="cover-top-trend">
                        <div className="title-trend">
                            <img src={TrendImg} alt="" />
                            <p>Xu hướng mua sắm</p>
                        </div>
                    </div>
                    <div className="cate-trend-content">
                        <NavLink to="/" onClick={() => setNumberCate(1)}>
                            <p className={numberCate === 1 ? 'item-cate-trend active' : 'item-cate-trend '}>
                                Xu hướng theo ngày
                            </p>
                        </NavLink>
                        <NavLink to="/" onClick={() => setNumberCate(2)}>
                            <p className={numberCate === 2 ? 'item-cate-trend active' : 'item-cate-trend '}>
                                Sách HOT - Giảm sốc
                            </p>
                        </NavLink>
                        <NavLink to="/" onClick={() => setNumberCate(3)}>
                            <p className={numberCate === 3 ? 'item-cate-trend active' : 'item-cate-trend '}>
                                Bestseller Ngoại Văn
                            </p>
                        </NavLink>
                    </div>
                    <div className="book-trend-content">
                        <div className="item-book-trend">
                            <img src={BookTrend} alt="" />
                            <p className="item-trend-name">Đất rừng Phương Nam - Phiên Bản Điện Ảnh</p>
                            <p class="item-trend-price">162.000 đ</p>
                            <p className="item-price-old">180.000đ</p>
                            <div class="main-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>

                        <div className="item-book-trend">
                            <img src={BookTrend} alt="" />
                            <p className="item-trend-name">Đất rừng Phương Nam - Phiên Bản Điện Ảnh</p>
                            <p class="item-trend-price">162.000 đ</p>
                            <p className="item-price-old">180.000đ</p>
                            <div class="main-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>

                        <div className="item-book-trend">
                            <img src={BookTrend} alt="" />
                            <p className="item-trend-name">Đất rừng Phương Nam - Phiên Bản Điện Ảnh</p>
                            <p class="item-trend-price">162.000 đ</p>
                            <p className="item-price-old">180.000đ</p>
                            <div class="main-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>

                        <div className="item-book-trend">
                            <img src={BookTrend} alt="" />
                            <p className="item-trend-name">Đất rừng Phương Nam - Phiên Bản Điện Ảnh</p>
                            <p class="item-trend-price">162.000 đ</p>
                            <p className="item-price-old">180.000đ</p>
                            <div class="main-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>

                        <div className="item-book-trend">
                            <img src={BookTrend} alt="" />
                            <p className="item-trend-name">Đất rừng Phương Nam - Phiên Bản Điện Ảnh</p>
                            <p class="item-trend-price">162.000 đ</p>
                            <p className="item-price-old">180.000đ</p>
                            <div class="main-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>

                        <div className="item-book-trend">
                            <img src={BookTrend} alt="" />
                            <p className="item-trend-name">Đất rừng Phương Nam - Phiên Bản Điện Ảnh</p>
                            <p class="item-trend-price">162.000 đ</p>
                            <p className="item-price-old">180.000đ</p>
                            <div class="main-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>

                        <div className="item-book-trend">
                            <img src={BookTrend} alt="" />
                            <p className="item-trend-name">Đất rừng Phương Nam - Phiên Bản Điện Ảnh</p>
                            <p class="item-trend-price">162.000 đ</p>
                            <p className="item-price-old">180.000đ</p>
                            <div class="main-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}