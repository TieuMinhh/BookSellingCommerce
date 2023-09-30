import React from "react";
import "./BookDetail.scss";
import Img from "../../../Assets/img/aoMU.jpg";

export default function BookDetail() {
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
          <div class="product-name">
            Quần áo bóng đá câu lạc bộ Manchester United
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
          <div class="size">
            <p>Size :</p>
            <div class="size-product active">S</div>
            <div class="size-product">M</div>
            <div class="size-product">L</div>
            <div class="size-product">XL</div>
            <div class="size-product">XXL</div>
          </div>
          <div class="quantity">
            <p>Số lượng :</p>
            <input
              type="number"
              min="1"
              max="5"
              value="1"
              name=""
              id=""
            ></input>
          </div>
          <div class="btn-box">
            <button id="add-btn" class="cart-btn">
              <i class="fa-solid fa-plus add-btn-box"></i>
              Thêm
            </button>
            <button id="order-btn" class="buy-btn">
              <i class="fa-solid fa-shopping-cart order-btn-box"></i>
              Đặt hàng
            </button>
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
    </div>
  );
}
