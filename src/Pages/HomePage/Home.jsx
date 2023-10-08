import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';

import AoMU from '../../Assets/img/aoMU.jpg';
import toan from '../../Assets/img/toan.png';
import tienganh12 from '../../Assets/img/tienganh12.jpg';
import Filter from '../../Components/FilterBook/Filter';
import { Link } from 'react-router-dom';

export default function Home() {
    const [change, setChange] = useState(false);
    const [list, setList] = useState([]);

    async function getListProduct() {
        // const result = await axiosApiInstance.get(
        //   axiosApiInstance.defaults.baseURL + "/api/v1/hero/get"
        // );
        const result = await axios.get(`http://localhost:8081/api/v1/admin/product?id=ALL`);
        setList(result?.data.listProduct);
        // console.log(result.data);
    }
    useEffect(() => {
        getListProduct();
    }, [change]);

    return (
        <div class="content row grid wide">
            <div class="container_content">
                <div class="header-container">
                    {/* <h1 class="header-container-categories">Premier League</h1> */}
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
                            {list &&
                                list.map((item, index) => {
                                    return (
                                        <div class="main-list-item">
                                            <Link to={`/book/detail?id=${item.id_product}`}>
                                                <div class="main-discription mt-8 mb-8">
                                                    {/* <img
                            src={`http://localhost:8081/image/${item.images}`}
                            alt=""
                            className="avatar-image"
                          /> */}
                                                    <img src={toan} alt=""></img>
                                                    <p class="item-desp">{item.name_product}</p>
                                                </div>
                                                <div class="main-price">
                                                    <p>
                                                        {/* {item.price_reducing.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}{' '} */}
                                                        200.000 đ
                                                    </p>
                                                    <span>
                                                        {item.price.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </span>
                                                </div>
                                                <div class="main-rate">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-regular fa-star"></i>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
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
