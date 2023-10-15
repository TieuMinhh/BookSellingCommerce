import React from 'react';
import './Filter.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useDebounce from '../../api/useDebounce';

export default function Filter() {
    const [valueMoney, setValueMoney] = useState(0);
    const [list, setList] = useState([]);

    async function getListCategory() {
        let result = await axios.get(axios.defaults.baseURL + `/api/v1/category?id=ALL`);
        setList(result?.data.listCategory);
        // console.log(result.data);
    }
    const [searchName, setSearchName] = useState('');

    const debouncedValue = useDebounce(searchName, 500);

    const navigate = useNavigate();

    useEffect(() => {
        const searchProductByCategory = async () => {
            try {
                const result = await axios.post(axios.defaults.baseURL + '/api/v1/search-product-by-category', {
                    name: debouncedValue,
                });
                console.log(result.data.message);

                // Chuyển hướng đến trang product cùng với kết quả tìm kiếm
                navigate('/product', { state: { searchResult2: result.data.message } });
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        searchProductByCategory();
    }, [debouncedValue]);

    useEffect(() => {
        getListCategory();
    }, []);

    return (
        <div class="sidebar_content col l-3 c-0 m-0">
            <h1>DANH MỤC</h1>
            <div class="brand-filter">
                <div class="brand-search">
                    <input
                        type="text"
                        placeholder="Lọc theo danh mục"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    ></input>
                    <i class="icon-search fa fa-search"></i>
                </div>
                <div class="list-filter">
                    <div class="filter-item">
                        <ul>
                            {list &&
                                list.map((item, index) => {
                                    return (
                                        <li>
                                            <input id={item.id_category} type="checkbox"></input>
                                            <label for={item.id_category}>{item.name_category}</label>
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
