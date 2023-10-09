import React, { useEffect } from 'react';
import './Cart.scss';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getToken } from '../../../Services/Token';

function formatMoney(price) {
    return price
        ? price.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
          })
        : '0 đ';
}

export default function Cart(props) {
    const [selectedItem, setSelectedItem] = useState([]);

    const [number, setNumber] = useState(1); //number of item
    const updateQuantity = (value) => {
        setNumber((prevState) => prevState + value);
    };

    const [quantity, setQuantity] = useState('1');
    const [change, setChange] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState('0');

    async function getListProduct() {
        // const result = await axiosApiInstance.get(
        //   axiosApiInstance.defaults.baseURL + "/api/v1/hero/get"
        // );
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.post(`http://localhost:8081/api/v1/account/cart`);
        setList(result?.data.list);
        setTotal(result?.data.total);
        console.log(result.data.total);
    }

    async function RemoveProductFromCart(item) {
        // const result = await axiosApiInstance.get(
        //   axiosApiInstance.defaults.baseURL + "/api/v1/hero/get"
        // );
        console.log('id là :', item.id_product);

        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const result = await axios.delete(`http://localhost:8081/api/v1/remove-from-cart/${item.id_product}`);
        // setList(result?.data.list);
        // setTotal(result?.data.total);
        setChange(!change);
        console.log(result);

        if (result.status === 200) toast.success(result.data.message);
        if (result.status === 500) toast.error(result.data.message);
    }

    async function IncrementProductFromCart(item) {
        console.log('id là :', item.id_product);
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.put(
            `http://localhost:8081/api/v1/account/increment-product-from-cart/${item.id_product}`,
            {
                quantity: item.quantity,
            },
        );

        console.log(result);
        setChange(!change);
    }

    async function DecrementProductFromCart(item) {
        console.log('id là :', item.id_product);
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.put(
            `http://localhost:8081/api/v1/account/decrement-product-from-cart/${item.id_product}`,
            {
                quantity: item.quantity,
            },
        );

        console.log(result);
        setChange(!change);
    }

    useEffect(() => {
        getListProduct();
    }, [change]);

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
                <span class="font-16">({list?.length} sản phẩm)</span>
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
                        Chọn tất cả {`(${list && list.length} sản phẩm)`}
                    </div>

                    {list &&
                        list.map((item, index) => {
                            return (
                                <div className="product">
                                    <input
                                        checked={selectedItem.includes(1)}
                                        value=""
                                        onChange={handleSingleCheckBox}
                                        class="carts-check"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <Link to="/">
                                        <img
                                            src={`http://localhost:8081/image/${item && item?.images}`}
                                            alt=""
                                            className="avatar-image"
                                        />
                                    </Link>
                                    <div className="product-info">
                                        <h3 className="product-name">{item && item?.name_product}</h3>
                                        <h4 className="product-sub-name">{item && item?.detail}</h4>
                                        <div className="main-price">
                                            <div className="price">
                                                {item &&
                                                    item?.price.toLocaleString('vi', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}{' '}
                                            </div>
                                            <span>150.000đ</span>
                                        </div>

                                        <div class="quantity">
                                            <p class="quantityName">Số lượng :</p>
                                            <div class="counter">
                                                <button class="btn-giam" onClick={() => DecrementProductFromCart(item)}>
                                                    -
                                                </button>
                                                <p
                                                    style={{
                                                        fontSize: '18px',
                                                    }}
                                                >
                                                    {item && item?.quantity}
                                                </p>
                                                <button class="btn-tang" onClick={() => IncrementProductFromCart(item)}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            id="remove-product"
                                            className="product-remove"
                                            onClick={() => RemoveProductFromCart(item)}
                                        >
                                            <i className="fa fa-trash fa-color" aria-hidden="true"></i>
                                            <span className="remove">Xoá</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <div className="cart-total">
                    <div class="price-content">
                        <span class="total-price-title">Thành tiền</span>
                        <span class="price-cart">{formatMoney(total && total)}</span>
                    </div>
                    <div id="order" className="order">
                        <Link to="/order-pay" href="order-cart">
                            <i className="fa-solid fa-shopping-cart fa-shopping"></i>Thanh toán
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
