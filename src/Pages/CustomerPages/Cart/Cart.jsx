import React from "react";
import "./Cart.scss";

import BookImg from "../../../Assets/img/book.png";
import BookImg2 from "../../../Assets/img/book2.jpg";

export default function Cart() {
  return (
    <div className="container">
      <div className="cart">
        <div className="products">
          <div className="product">
            <a href="/components/product/product.html">
              <img src={BookImg} alt="book"></img>
            </a>
            <div className="product-info">
              <h3 className="product-name">Đột phá 8+ môn toán</h3>
              <h4 className="product-sub-name">
                Sách dành cho nhà giàu tiêu tiền không cần nhìn giá
              </h4>
              <div className="main-price">
                <div className="price">110.000đ</div>
                <span>150.000đ</span>
              </div>
              {/* <div className="size">
                <p>Size :</p>
                <div className="size-product active">S</div>
                <div className="size-product">M</div>
                <div className="size-product">L</div>
                <div className="size-product">XL</div>
                <div className="size-product">XXL</div>
              </div> */}
              <div className="quantity">
                <p>Số lượng :</p>
                <input
                  type="number"
                  min="1"
                  //   max="5"
                  defaultValue={1}
                  name=""
                  id=""
                ></input>
              </div>
              <p id="remove-product" className="product-remove">
                <i className="fa fa-trash fa-color" aria-hidden="true"></i>
                <span className="remove">Xoá</span>
              </p>
            </div>
          </div>

          <div className="product">
            <a href="/components/product/product.html">
              <img src={BookImg2} alt="book"></img>
            </a>
            <div className="product-info">
              <h3 className="product-name">Ôn tập và kiểm tra tiếng anh 12</h3>
              <h4 className="product-sub-name">
                Sách dành cho nhà giàu tiêu tiền không cần nhìn giá
              </h4>
              <div className="main-price">
                <div className="price">110.000đ</div>
                <span>150.000đ</span>
              </div>
              {/* <div className="size">
                <p>Size :</p>
                <div className="size-product">S</div>
                <div className="size-product">M</div>
                <div className="size-product active">L</div>
                <div className="size-product">XL</div>
                <div className="size-product">XXL</div>
              </div> */}
              <div className="quantity">
                <p>Số lượng :</p>
                <input
                  type="number"
                  min="1"
                  defaultValue={1}
                  name=""
                  id=""
                ></input>
              </div>
              <p id="remove-product" className="product-remove">
                <i className="fa fa-trash fa-color" aria-hidden="true"></i>
                <span className="remove">Xoá</span>
              </p>
            </div>
          </div>

          <div className="product">
            <a href="/components/product/product.html">
              <img src={BookImg2} alt="book"></img>
            </a>
            <div className="product-info">
              <h3 className="product-name">Ôn tập và kiểm tra tiếng anh 12</h3>
              <h4 className="product-sub-name">
                Sách dành cho nhà giàu tiêu tiền không cần nhìn giá
              </h4>
              <div className="main-price">
                <div className="price">110.000đ</div>
                <span>150.000đ</span>
              </div>
              {/* <div className="size">
                <p>Size :</p>
                <div className="size-product">S</div>
                <div className="size-product">M</div>
                <div className="size-product active">L</div>
                <div className="size-product">XL</div>
                <div className="size-product">XXL</div>
              </div> */}
              <div className="quantity">
                <p>Số lượng :</p>
                <input
                  type="number"
                  min="1"
                  defaultValue={1}
                  name=""
                  id=""
                ></input>
              </div>
              <p id="remove-product" className="product-remove">
                <i className="fa fa-trash fa-color" aria-hidden="true"></i>
                <span className="remove">Xoá</span>
              </p>
            </div>
          </div>
        </div>

        <div className="cart-total">
          <p>
            <span>Tổng tiền</span>
            <span>220.000đ</span>
          </p>
          <p>
            <span>Giảm giá</span>
            <span>20.000</span>
          </p>
          <p>
            <span>Phí giao hàng</span>
            <span>20.000</span>
          </p>
          <p>
            <span>Thành tiền</span>
            <span>220.000đ</span>
          </p>
          <div id="order" className="order">
            <i className="fa-solid fa-shopping-cart fa-shopping"></i>
            <a href="#">Đặt hàng</a>
          </div>
        </div>
      </div>
    </div>
  );
}
