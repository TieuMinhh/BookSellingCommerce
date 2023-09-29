import React from "react";
import "./Home.scss";
import AoMU from "../../Assets/img/aoMU.jpg";

export default function Home() {
  return (
    <div class="content row grid wide">
      <div class="container_content">
        <div class="header-container">
          <h1 class="header-container-categories">Premier League</h1>
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

        <div class="main-content">
          <div class="main-list row">
            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>
                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Manchester United (Home)</p>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Manchester United (Away)</p>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Manchester United (Third)</p>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Manchester United (Tay dài)</p>
                </div>
                <div class="main-price">
                  <p>130.000đ</p>
                  <span>160.000đ</span>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Manchester City (Home)</p>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Manchester City (Away)</p>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Manchester City (Third)</p>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Manchester City (Tay dài)</p>
                </div>
                <div class="main-price">
                  <p>130.000đ</p>
                  <span>170.000đ</span>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Chelsea (Home)</p>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Chelsea (Away)</p>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Chelsea (Third)</p>
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

            <div class="main-list-item col l-3 m-4 c-12 mb-16">
              <a href="/components/product/product.html">
                <img src={AoMU} alt=""></img>

                <div class="main-discription mt-8 mb-8">
                  <p>Quần áo bóng đá câu lạc bộ Chelsea (Tay dài)</p>
                </div>
                <div class="main-price">
                  <p>130.000đ</p>
                  <span>170.000đ</span>
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
          <div class="end-page">
            <p>Trang cuối</p>
          </div>
        </div>
      </div>
    </div>
  );
}
