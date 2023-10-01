import React from 'react';
import './Header.scss';
import LogoPage from '../../Assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <div class="header">
            <div class="topbar row">
                <div class="topbar-left col">
                    <p> Mở cửa: 7h30 đến 21h30, T7 và Chủ nhật 8h đến 22h</p>
                </div>
                <div class="topbar-right col">
                    <div class="topbar-right-list">
                        <div class="topbar-right-list-item">
                            <i class="fa-solid fa-user"></i>
                            <Link to="/login">Đăng nhập</Link>
                        </div>
                        <div class="topbar-right-list-item">
                            <i class="fa-solid fa-star"></i>
                            <a href="https://www.thegioididong.com/mua-online-gia-re#game">Khuyến mãi hot</a>
                        </div>
                        <div class="topbar-right-list-item">
                            <i class="fa-solid fa-location-pin"></i>
                            <a href="https://www.thegioididong.com/sieu-thi-the-gioi-di-dong/ho-chi-minh">
                                {' '}
                                Hệ thống cửa hàng
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mid-header">
                <div class="container-header row grid wide">
                    <div class="container-header-1 col">
                        <Link to="/">
                            <img src={LogoPage} alt="" style={{ width: '200px' }}></img>
                        </Link>
                    </div>
                    <div class="container-header-2 col">
                        <div class="header-search">
                            <input type="text" placeholder="Nhập để tìm kiếm ..."></input>
                            <i class="icon fa fa-search"></i>
                        </div>
                    </div>
                    <div class="container-header-3 col">
                        <div class="header-list">
                            <i class="fa-solid fa-phone"></i>
                            <div class="header-discription">
                                <b>(028) 1234 4321 (10 line)</b>
                                <p>DĐ: 0966 932 267</p>
                            </div>
                        </div>
                        <div class="header-list">
                            <i href="" class="fa-solid fa-cart-shopping"></i>
                            <div class="header-discription">
                                <Link to="/cart">
                                    <b>(0) Sản phẩm</b>
                                </Link>
                                <p>Giỏ hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="header-menu">
                <div class="header-menu-nav row grid wide">
                    <div class="header-menu-nav-list">
                        <div class="header-menu-nav-list-item">
                            <NavLink to="/" class="header-menu-nav-item">
                                <p>TRANG CHỦ</p>
                            </NavLink>

                            <NavLink to="#" class="header-menu-nav-item">
                                <p>Danh mục sách</p>
                            </NavLink>

                            <NavLink to="/book-pages" class="header-menu-nav-item">
                                <p>Sách đang kinh doanh</p>
                            </NavLink>

                            <a href="!#" class="header-menu-nav-item">
                                <p>GIAO HÀNG tận nơi</p>
                            </a>

                            <NavLink to="/order-history" class="header-menu-nav-item">
                                <p>LỊCH SỬ ĐẶT HÀNG</p>
                            </NavLink>

                            <NavLink to="/profile" class="header-menu-nav-item">
                                <p>Thông tin cá nhân</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div class="header-bottom grid wide">
        <span>Trang chủ</span>
        <i class="fa-solid fa-angle-right"></i>
        <span>Premier League</span>
      </div> */}

            {/* <!-- <div class="football-area">
            <img id="football-img" onclick="changeImg()" class="header-img-center grid wide row col c-12" src="./assets/img/MU.jpg" alt="" >
                     
        </div> --> */}

            {/* <div id="image-slider">
        <div class="slider-img">
          <div class="slides-img">

            <input type="radio" name="radio-btn" id="radio1"></input>
            <input type="radio" name="radio-btn" id="radio2"></input>
            <input type="radio" name="radio-btn" id="radio3"></input>
            <input type="radio" name="radio-btn" id="radio4"></input>
            <input type="radio" name="radio-btn" id="radio5"></input>
            <input type="radio" name="radio-btn" id="radio6"></input>

            <div class="slide-image first">
              <img src="/assets/img/MU2.jpg" alt=""></img>{" "}
            </div>
            <div class="slide-image">
              <img src="/assets/img/chelsea-2023.jpg" alt=""></img>
            </div>
            <div class="slide-image">
              <img src="/assets/img/real2024.jpg" alt=""></img>
            </div>
            <div class="slide-image">
              <img src="/assets/img/brazil.jpg" alt=""></img>{" "}
            </div>
            <div class="slide-image">
              <img src="/assets/img/france1.jpg" alt=""></img>{" "}
            </div>
            <div class="slide-image">
              <img src="/assets/img/portugal.jpg" alt=""></img>
            </div>

            <div class="navigation-img-auto">
              <div class="auto-btn1 manual-btn"></div>
              <div class="auto-btn2 manual-btn"></div>
              <div class="auto-btn3 manual-btn"></div>
              <div class="auto-btn4 manual-btn"></div>
              <div class="auto-btn5 manual-btn"></div>
              <div class="auto-btn6 manual-btn"></div>
            </div>

          </div>
          <i class="img-narrow-left fa-solid fa-circle-arrow-left"></i>
          <i class="img-narrow-right fa-solid fa-circle-arrow-right"></i>
          
        </div>
      </div> */}

            {/* <!-- <img class="header-img-center grid wide row col c-12" src="./assets/img/rael2024.jpg" alt="" > --> */}
        </div>
    );
}
