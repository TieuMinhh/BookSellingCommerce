import React, { useEffect } from 'react';
import './Cart.scss';
import axios from '../../../api/axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../../Services/Token';
import config from '../../../api/base';
import { NotifyModalSuccess } from '../../../Components/NotifyModalSuccess/NotifyModalSuccess';
import { NotifyModalFail } from '../../../Components/NotifyModalFail/NotifyModalFail';

function formatMoney(price) {
    return price
        ? price.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
          })
        : '0 đ';
}

export default function Cart() {
    const [selectedItem, setSelectedItem] = useState([]);

    const [number, setNumber] = useState(1); //number of item
    const updateQuantity = (value) => {
        setNumber((prevState) => prevState + value);
    };

    const [quantity, setQuantity] = useState('1');
    const [change, setChange] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState('0');
    const [isNotiSuccess, setIsNotiSuccess] = useState(false);
    const [isNotiFail, setIsNotiFail] = useState(false);
    const [detailNoti, setDetailNoti] = useState('');

    let shipFee = 20000;

    async function getListProduct() {
        let token = await getToken();
        // console.log('accessToken là : ', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.post(axios.defaults.baseURL + `/api/v1/account/cart`);
        setList(result?.data.list);
    }

    async function RemoveProductFromCart(item) {
        try {
            // console.log('id là :', item.id_product);
            let token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const result = await axios.delete(axios.defaults.baseURL + `/api/v1/remove-from-cart/${item.id_product}`);
            setChange(!change);

            if (result.status === 200) {
                setIsNotiSuccess(true);
                setDetailNoti(result.data.message);
                setTimeout(() => {
                    setIsNotiSuccess(false);
                }, 3000);
            } else if (result.status === 500) {
                setIsNotiFail(true);
                setDetailNoti(result.data.message);
                setTimeout(() => {
                    setIsNotiFail(false);
                }, 3000);
            }
        } catch (error) {
            setIsNotiFail(true);
            setDetailNoti(error);
        }
    }

    async function IncrementProductFromCart(item) {
        try {
            let token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const result = await axios.put(
                axios.defaults.baseURL + `/api/v1/account/increment-product-from-cart/${item.id_product}`,
                {
                    quantity: item.quantity,
                },
            );
            setChange(!change);
        } catch (error) {
            setIsNotiFail(true);
            setDetailNoti(error);
        }
    }

    async function DecrementProductFromCart(item) {
        try {
            console.log('id là :', item.id_product);
            let token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const result = await axios.put(
                axios.defaults.baseURL + `/api/v1/account/decrement-product-from-cart/${item.id_product}`,
                {
                    quantity: item.quantity,
                },
            );

            console.log(result);
            setChange(!change);
        } catch (error) {
            setIsNotiFail(true);
            setDetailNoti(error);
        }
    }

    const handleSelectAllCheckBox = (e, list) => {
        if (e.target.checked) {
            const allId = list.map((item) => item.id_product);
            setSelectedItem(allId);
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
    // Hàm tính tổng tiền dựa trên danh sách sản phẩm được chọn

    const navigate = useNavigate();
    const goToOrderPage = () => {
        navigate('/order-pay', {
            state: {
                selectedItems: list.filter((item) => selectedItem.includes(item.id_product)),
            },
        });
    };

    useEffect(() => {
        getListProduct();
        const calculateTotal = () => {
            let totalPrice = 0;
            // Duyệt qua danh sách các sản phẩm đã chọn
            selectedItem.forEach((selectedProductId) => {
                // Tìm sản phẩm trong danh sách gốc bằng id_product
                const selectedProduct = list.find((item) => item.id_product === selectedProductId);
                // Nếu sản phẩm được tìm thấy, thì cộng giá vào tổng tiền
                if (selectedProduct) {
                    totalPrice += selectedProduct.price_reducing * selectedProduct.quantity;
                }
            });
            // Lưu tổng tiền khi danh sách sản phẩm được chọn thay đổi
            setTotal(totalPrice);
        };
        calculateTotal();
    }, [change, list, selectedItem]);

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
                            type="checkbox"
                            onChange={(e) => handleSelectAllCheckBox(e, list)}
                            id="check-all"
                        />
                        <label style={{ cursor: 'pointer', width: '100%' }} htmlFor="check-all">
                            Chọn tất cả {`(${(list && list?.length) || 0} sản phẩm)`}
                        </label>
                    </div>

                    {list &&
                        list.map((item, index) => {
                            return (
                                <div className="product" key={item.id_product}>
                                    <input
                                        type="checkbox"
                                        value={item.id_product}
                                        checked={selectedItem.includes(item.id_product)}
                                        onChange={handleSingleCheckBox}
                                    />
                                    <Link to="/cart">
                                        <img
                                            src={`${config.PUBLIC_IMAGE_URL}${item && item?.images}`}
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
                                                    item?.price_reducing.toLocaleString('vi', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}{' '}
                                            </div>
                                            <span>
                                                {item &&
                                                    item?.price.toLocaleString('vi', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}{' '}
                                            </span>
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
                        <div className="cover-total-money">
                            <span class="total-price-title">
                                <i class="fa-regular fa-credit-card"></i> Tổng tiền
                            </span>
                            <span class="price-cart">{formatMoney(total && total)}</span>
                        </div>
                        <div
                            className="cover-total-money"
                            style={{ borderBottom: '1px solid #ccc', paddingBottom: '18px' }}
                        >
                            <span class="total-price-title">
                                <i class="fa-solid fa-truck-fast"></i> Phí vận chuyển
                            </span>
                            <span class="price-cart">{formatMoney(shipFee)}</span>
                        </div>
                        <div className="cover-total-money">
                            <span class="total-price-title">
                                <i class="fa-regular fa-money-bill-1"></i> Thành tiền
                            </span>
                            <span class="price-cart">{formatMoney(total + shipFee)}</span>
                        </div>
                    </div>

                    <div id="order" className="order" onClick={goToOrderPage}>
                        <Link>
                            <i className="fa-solid fa-shopping-cart fa-shopping"></i>Thanh toán
                        </Link>
                    </div>
                </div>
            </div>
            <div onClick={() => setIsNotiFail(false)}>
                <NotifyModalFail isFail={isNotiFail} detailNoti={detailNoti} />
            </div>
            <div onClick={() => setIsNotiSuccess(false)}>
                <NotifyModalSuccess isSuccess={isNotiSuccess} detailNoti={detailNoti} />
            </div>
        </div>
    );
}
