import React from 'react';
import './Filter.scss';
import { useState } from 'react';

export default function Filter() {
    const [valueMoney, setValueMoney] = useState(0);

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
                            <li>
                                <input id="1" type="checkbox"></input>
                                <label for="1">Sách tiếng việt</label>
                            </li>
                            <li>
                                <input id="2" type="checkbox"></input>
                                <label for="2">Sách tiếng anh</label>
                            </li>
                            <li>
                                <input id="3" type="checkbox"></input>
                                <label for="3">Tiểu thuyết</label>
                            </li>
                            <li>
                                <input id="4" type="checkbox"></input>
                                <label for="4">Trinh thám</label>
                            </li>
                            <li>
                                <input id="5" type="checkbox"></input>
                                <label for="5">Văn học</label>
                            </li>
                            <li>
                                <input type="checkbox"></input>
                                <span>Toán học</span>
                            </li>
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
