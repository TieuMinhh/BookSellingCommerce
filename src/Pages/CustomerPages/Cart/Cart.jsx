import React, { useEffect } from 'react';
import './Cart.scss';

import BookImg from '../../../Assets/img/toan.png';
import BookImg2 from '../../../Assets/img/tienganh12.jpg';
import { useState } from 'react';

export default function Cart() {
    const [selectedItem, setSelectedItem] = useState([]);

    const handleSelectAllCheckBox = (e) => {
        if (e.target.checked) {
            setSelectedItem([1, 2, 3]);
        } else {
            setSelectedItem([]);
        }
    };

    const handleSingleCheckBox = (e) => {
        const value = parseInt(e.target.value);

        if (e.target.checked) {
            setSelectedItem([...selectedItem, value]);
        } else {
            setSelectedItem((prevData) => {
                return prevData.filter((id) => {
                    return id !== value;
                });
            });
        }
    };

    return (
        <div className="container">
            <div class="cart-title">
                <h2 class="">GIỎ HÀNG</h2>
                <span class="font-16">{`(${3} sản phẩm)`}</span>
            </div>
            <div className="cart">
                <div className="products">
                    <div className="product-header">
                        <input
                            class="carts-check"
                            checked={selectedItem.length === 3}
                            type="checkbox"
                            onChange={handleSelectAllCheckBox}
                            name="select-all"
                            id=""
                        />{' '}
                        Chọn tất cả {`(${3} sản phẩm)`}
                    </div>
                    <div className="product">
                        <input
                            checked={selectedItem.includes(1)}
                            value="1"
                            onChange={handleSingleCheckBox}
                            class="carts-check"
                            type="checkbox"
                            name=""
                            id=""
                        />
                        <a href="/components/product/product.html">
                            <img src={BookImg} alt="book"></img>
                        </a>
                        <div className="product-info">
                            <h3 className="product-name">Đột phá 8+ môn toán</h3>
                            <h4 className="product-sub-name">Sách dành cho nhà giàu tiêu tiền không cần nhìn giá</h4>
                            <div className="main-price">
                                <div className="price">110.000đ</div>
                                <span>150.000đ</span>
                            </div>

                            <div className="quantity">
                                <p>Số lượng :</p>
                                <input type="number" min="1" defaultValue={1} name="" id=""></input>
                            </div>
                            <p id="remove-product" className="product-remove">
                                <i className="fa fa-trash fa-color" aria-hidden="true"></i>
                                <span className="remove">Xoá</span>
                            </p>
                        </div>
                    </div>

                    <div className="product">
                        <input
                            checked={selectedItem.includes(2)}
                            value="2"
                            onChange={handleSingleCheckBox}
                            class="carts-check"
                            type="checkbox"
                            name=""
                            id=""
                        />
                        <a href="/components/product/product.html">
                            <img src={BookImg2} alt="book"></img>
                        </a>
                        <div className="product-info">
                            <h3 className="product-name">Ôn tập và kiểm tra tiếng anh 12</h3>
                            <h4 className="product-sub-name">Sách dành cho nhà giàu tiêu tiền không cần nhìn giá</h4>
                            <div className="main-price">
                                <div className="price">110.000đ</div>
                                <span>150.000đ</span>
                            </div>

                            <div className="quantity">
                                <p>Số lượng :</p>
                                <input type="number" min="1" defaultValue={1} name="" id=""></input>
                            </div>
                            <p id="remove-product" className="product-remove">
                                <i className="fa fa-trash fa-color" aria-hidden="true"></i>
                                <span className="remove">Xoá</span>
                            </p>
                        </div>
                    </div>

                    <div className="product">
                        <input
                            checked={selectedItem.includes(3)}
                            value="3"
                            onChange={handleSingleCheckBox}
                            class="carts-check"
                            type="checkbox"
                            name=""
                            id=""
                        />
                        <a href="/components/product/product.html">
                            <img src={BookImg2} alt="book"></img>
                        </a>
                        <div className="product-info">
                            <h3 className="product-name">Ôn tập và kiểm tra tiếng anh 12</h3>
                            <h4 className="product-sub-name">Sách dành cho nhà giàu tiêu tiền không cần nhìn giá</h4>
                            <div className="main-price">
                                <div className="price">110.000đ</div>
                                <span>150.000đ</span>
                            </div>

                            <div className="quantity">
                                <p>Số lượng :</p>
                                <input type="number" min="1" defaultValue={1} name="" id=""></input>
                            </div>
                            <p id="remove-product" className="product-remove">
                                <i className="fa fa-trash fa-color" aria-hidden="true"></i>
                                <span className="remove">Xoá</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="cart-total">
                    <div class="price-content">
                        <span class="total-price-title">Thành tiền</span>
                        <span class="price-cart">220.000đ</span>
                    </div>
                    <div id="order" className="order">
                        <a href="order-cart">
                            <i className="fa-solid fa-shopping-cart fa-shopping"></i>Thanh toán
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
