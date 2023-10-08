import React from 'react';
import './Filter.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Filter() {
    const [valueMoney, setValueMoney] = useState(0);
    const [list, setList] = useState([]);

    async function getListCategory() {
        // const result = await axiosApiInstance.get(
        //   axiosApiInstance.defaults.baseURL + "/api/v1/category?id=ALL"
        // );
        let result = await axios.get(`http://localhost:8081/api/v1/category?id=ALL`);
        setList(result?.data.listCategory);
        // console.log(result.data);
    }

    useEffect(() => {
        getListCategory();
    }, []);

    return (
        <div class="sidebar_content col l-3 c-0 m-0">
            <h1>DANH MỤC</h1>
            <div class="brand-filter">
                <div class="brand-search">
                    <input type="text" placeholder="Lọc theo danh mục"></input>
                    <i class="icon-search fa fa-search"></i>
                </div>
                <div class="list-filter">
                    <div class="filter-item">
                        <ul>
                            {list &&
                                list.map((item, index) => {
                                    return (
                                        <li>
                                            <input id="1" type="checkbox"></input>
                                            <label for="1">{item.name}</label>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
            <h1>GIÁ SẢN PHẨM</h1>
            <div class="price-filter">
                <input
                    id="slider-money"
                    type="range"
                    min="0"
                    max="10000000"
                    step="1"
                    value={valueMoney}
                    onChange={(e) => setValueMoney(e.target.value)}
                ></input>
                <p>
                    Tầm giá: <span id="price">{valueMoney.toLocaleString()}</span>
                </p>
            </div>
        </div>
    );
}
