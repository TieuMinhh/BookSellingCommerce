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
        let result = await axios.get(axios.defaults.baseURL + `/category?id=ALL`);
        setList(result?.data.listCategory);
        // console.log(result.data);
    }

    const [searchName, setSearchName] = useState('');

    const debouncedValue = useDebounce(searchName, 500);

    const navigate = useNavigate();

    const filterBookCate = (e) => {
        if (e.target.checked) {
            setSearchName(e.target.value);
        } else {
            setSearchName('');
        }
    };

    useEffect(() => {
        const searchProductByCategory = async () => {
            try {
                const result = await axios.post(axios.defaults.baseURL + '/search-product-by-category', {
                    name: debouncedValue,
                });

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
        <div className="sidebar_content col l-3 c-0 m-0">
            <h1>DANH MỤC</h1>
            <div className="brand-filter">
                <div className="brand-search">
                    <input
                        type="text"
                        placeholder="Lọc theo danh mục"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    ></input>
                    <i className="icon-search fa fa-search"></i>
                </div>
                <div className="list-filter">
                    <div className="filter-item">
                        <ul>
                            {list &&
                                list.map((item, index) => {
                                    return (
                                        <li key={item.id_category}>
                                            <input
                                                id={item.id_category}
                                                type="radio"
                                                name="category"
                                                value={item.name_category}
                                                onChange={filterBookCate}
                                            ></input>
                                            <label htmlFor={item.id_category}>{item.name_category}</label>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
            <h1>GIÁ SẢN PHẨM</h1>
            <div className="price-filter">
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
                    Tầm giá:{' '}
                    <span id="price">
                        {valueMoney.toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                </p>
            </div>
        </div>
    );
}
