import React from 'react';
import './Home.scss';

import AoMU from '../../Assets/img/aoMU.jpg';
import toan from '../../Assets/img/toan.png';
import tienganh12 from '../../Assets/img/tienganh12.jpg';
import Filter from '../../Components/FilterBook/Filter';

export default function Home() {
    return (
        <div class="content row grid wide">
            <div class="container_content">
                <div class="header-container">
                    <h1 class="header-container-categories">Book</h1>
                    <div class="header-container-icon">
                        <i class="fa-solid fa-bars"></i>
                        <i class="fa-solid fa-table-list"></i>
                    </div>
                    <div class="header-container-select">
                        <select id="cars" name="cars">
                            <option>Giá tăng dần</option>
                            <option>Mặc định</option>
                            <option>A → Z</option>
                            <option>Giá tăng dần</option>
                            <option>Giá giảm dần</option>
                            <option>Hàng mới nhất</option>
                            <option>Hàng cũ nhất</option>
                            <option>Giá tăng dần</option>
                        </select>
                    </div>
                </div>

                <div class="wrapper-content">
                    <Filter />

                    <div class="main-content">
                        <div class="main-list row">
                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Áo bóng đá CLB Manchester United Sân Nhà</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>

                            <div class="main-list-item">
                                <a href="/book-detail">
                                    <div class="main-discription mt-8 mb-8">
                                        <img src={toan} alt=""></img>
                                        <p class="item-desp ">Đột phá môn toán 8+</p>
                                    </div>
                                    <div class="main-price">
                                        <p>110.000đ</p>
                                        <span>150.000đ</span>
                                    </div>
                                    <div class="main-rate">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="last-container">
                    <div class="container-page">
                        <p>1</p>
                    </div>
                    <div class="container-page">
                        <p>2</p>
                    </div>
                    <div class="container-page">
                        <p>3</p>
                    </div>
                    <div class="container-page">
                        <p>.</p>
                    </div>
                    <div class="container-page">
                        <p>13</p>
                    </div>
                    <div class="container-page">
                        <p>Trang cuối</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
