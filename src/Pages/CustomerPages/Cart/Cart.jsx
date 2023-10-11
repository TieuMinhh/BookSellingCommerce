import React, { useEffect } from 'react';
import './Cart.scss';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const [selectedItems, setSelectedItems] = useState([]); // Danh sách các sản phẩm được chọn
    let shipFee = 20000;

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
        try {
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
        } catch (error) {
            toast.error(error);
        }
    }

    async function IncrementProductFromCart(item) {
        try {
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
        } catch (error) {
            toast.error(error);
        }
    }

    async function DecrementProductFromCart(item) {
        try {
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
        } catch (error) {
            toast.error(error);
        }
    }

    // const handleSelectAllCheckBox = (e) => {
    //   if (e.target.checked) {
    //     setSelectedItem([1, 2, 3]);
    //   } else {
    //     setSelectedItem([]);
    //   }
    // };

    // const handleSingleCheckBox = (e) => {
    //   const value = parseInt(e.target.value);

    //   if (e.target.checked) {
    //     setSelectedItem([...selectedItem, value]);
    //   } else {
    //     setSelectedItem((prevData) => {
    //       return prevData.filter((id) => {
    //         return id !== value;
    //       });
    //     });
    //   }
    // };

    // Hàm xử lý khi ấn vào ô input tick text
    // const handleToggleSelect = (item) => {
    //     // Kiểm tra xem sản phẩm đã được chọn chưa
    //     if (selectedItems.some((selectedItem) => selectedItem.id_product === item.id_product)) {
    //         // Nếu đã chọn, loại bỏ sản phẩm khỏi danh sách
    //         setSelectedItems((prevSelectedItems) =>
    //             prevSelectedItems.filter((selectedItem) => selectedItem.id_product !== item.id_product),
    //         );
    //     } else {
    //         // Nếu chưa chọn, thêm sản phẩm vào danh sách
    //         setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    //     }

    //     // Sau khi thay đổi danh sách selectedItems, tính tổng tiền
    //     calculateTotal();
    // };

    const handleToggleSelect = (item) => {
        // Kiểm tra xem sản phẩm đã được chọn chưa
        if (selectedItems.some((selectedItem) => selectedItem.id_product === item.id_product)) {
            // Nếu đã chọn, loại bỏ sản phẩm khỏi danh sách
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((selectedItem) => selectedItem.id_product !== item.id_product),
            );
        } else {
            // Nếu chưa chọn, thêm sản phẩm vào danh sách
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
        }
        // console.log('dssp:', selectedItems);

        // Sau khi thay đổi danh sách selectedItems, tính tổng tiền
        calculateTotal();
    };

    // const handleSelectAll = (list) => {
    //     // Kiểm tra nếu đã chọn tất cả thì bỏ chọn tất cả, ngược lại chọn tất cả
    //     if (selectedItems.length === list.length) {
    //         setSelectedItems([]);
    //     } else {
    //         // Gán toàn bộ danh sách sản phẩm vào selectedItems
    //         setSelectedItems(list.map((item) => item.id_product));
    //     }
    //     // Sau khi thay đổi danh sách selectedItems, tính tổng tiền
    //     calculateTotal();
    // };

    const handleSelectAll = (list) => {
        // Kiểm tra nếu đã chọn tất cả thì bỏ chọn tất cả, ngược lại chọn tất cả
        if (selectedItems.length === list.length) {
            setSelectedItems([]);
        } else {
            // Gán toàn bộ danh sách sản phẩm vào selectedItems
            setSelectedItems(list.map((item) => item.id_product));
        }
        // Sau khi thay đổi danh sách selectedItems, tính tổng tiền
        calculateTotal();
    };

    const addToSelectedItems = (item) => {
        setSelectedItems([...selectedItems, item]);
        // console.log('Danh sách sản phẩm là : ', selectedItems);
    };
    // const addToSelectedItems = (item) => {
    //     // Chỉ thêm sản phẩm nếu nó chưa có trong danh sách
    //     if (!selectedItems.some((selectedItem) => selectedItem.id_product === item.id_product)) {
    //         setSelectedItems([...selectedItems, item]);
    //     }
    // };

    // Hàm tính tổng tiền dựa trên danh sách sản phẩm được chọn
    const calculateTotal = () => {
        let totalPrice = 0;
        // Duyệt qua danh sách các sản phẩm đã chọn
        selectedItems.forEach((selectedProductId) => {
            // Tìm sản phẩm trong danh sách gốc bằng id_product
            const selectedProduct = list.find((item) => item.id_product === selectedProductId);
            // Nếu sản phẩm được tìm thấy, thì cộng giá vào tổng tiền
            if (selectedProduct) {
                totalPrice += selectedProduct.price_reducing * selectedProduct.quantity;
            }
        });
        // Lưu tổng tiền khi danh sách sản phẩm được chọn thay đổi
        console.log('Danh sách sp là :', selectedItems);
        setTotal(totalPrice);
    };

    const navigate = useNavigate();
    const goToOrderPage = () => {
        // Sử dụng `selectedItems` để truyền danh sách đã chọn khi chuyển trang
        navigate('/order-pay', { state: { selectedItems: selectedItems } });
    };

    useEffect(() => {
        getListProduct();
        calculateTotal();
    }, [change, selectedItems]);

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
                            checked={setSelectedItems.length === list && list.length}
                            type="checkbox"
                            onChange={() => handleSelectAll(list)}
                            // onClick={() => addToSelectedItems(list)}
                            id="check-all"
                        />{' '}
                        <label style={{ cursor: 'pointer', width: '100%' }} htmlFor="check-all">
                            {' '}
                            Chọn tất cả {`(${(list && list?.length) || 0} sản phẩm)`}
                        </label>
                    </div>

                    {/* Test */}

                    {/* End Test */}

                    {list &&
                        list.map((item, index) => {
                            return (
                                <div className="product" key={list.id_product}>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id_product)}
                                        onChange={() => handleToggleSelect(item)}
                                        // onClick={() => addToSelectedItems(item)}
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
                            <span class="price-cart">{formatMoney(total && shipFee)}</span>
                        </div>
                    </div>

                    <div id="order" className="order" onClick={goToOrderPage}>
                        <Link>
                            <i className="fa-solid fa-shopping-cart fa-shopping"></i>Thanh toán
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
