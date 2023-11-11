import React, { useState, useEffect } from 'react';
import './Revenue.scss';
import axios from '../../../api/axios';
import { Line } from 'react-chartjs-2';

export default function Revenue() {
    const [list, setList] = useState([]);
    const [listMonth, setListMonth] = useState([]);
    const [year, setYear] = useState('2023');
    const [month, setMonth] = useState('1');

    async function getListRevenueByMonth(year) {
        const result = await axios.get(axios.defaults.baseURL + `/admin/revenue-year/${year}`);

        const revenueByMonth = new Array(12).fill(0);

        result?.data.listRevenue.forEach((item) => {
            const month = item.months - 1; // Trừ 1 để chuyển tháng từ 1-based sang 0-based
            const revenue = parseFloat(item.total_revenue);
            revenueByMonth[month] = revenue;
        });
        setList([
            ...revenueByMonth.map((item, index) => {
                return {
                    id: index + 1,
                    name: `Tháng ${index + 1}`,
                    total: item,
                };
            }),
        ]);
        console.log(result.data);
    }

    async function getListRevenueByDate(month) {
        console.log('năm:', year, 'tháng :', month);
        const result = await axios.get(axios.defaults.baseURL + `/admin/revenue-month/${month}/${year}`);
        const revenueByDate = new Array(31).fill(0);

        result?.data.listRevenueByMonths.forEach((item) => {
            const day = item.day - 1; // Trừ 1 để chuyển ngày từ 1-based sang 0-based
            const revenue = parseFloat(item.total_revenue);
            revenueByDate[day] = revenue;
        });
        console.log('minh: ', revenueByDate);
        setListMonth([
            ...revenueByDate.map((item, index) => {
                return {
                    id: index + 1,
                    name: ` ${index + 1}`,
                    total: item,
                };
            }),
        ]);
    }

    useEffect(() => {
        getListRevenueByMonth(year);
        getListRevenueByDate(month, year);
    }, []);

    return (
        <div className="revenue-main-container">
            <div className="d-flex justify-content-center revenue-title">Thống kê doanh thu</div>

            <div className="select-view">
                <div className="select-years">
                    <div className="years">Năm</div>
                    <input
                        className="selected-years"
                        type="number"
                        min={2021}
                        max={2023}
                        value={year}
                        onChange={(e) => {
                            getListRevenueByMonth(e.target.value);
                            setYear(e.target.value);
                        }}
                    ></input>
                </div>

                <div className="select-months">
                    <div className="months">Tháng</div>
                    <input
                        className="selected-months"
                        type="number"
                        min={1}
                        max={12}
                        value={month}
                        onChange={(e) => {
                            getListRevenueByDate(e.target.value);
                            setMonth(e.target.value);
                        }}
                    ></input>
                </div>
            </div>

            <div className="line">
                <div className="data-line">
                    {/* <Line
                        data={{
                            labels: list && list.map((data) => data.name),
                            datasets: [
                                {
                                    label: 'Doanh thu theo tháng đ',
                                    data: list && list.map((data) => data.total),
                                    backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                                    borderColor: '#000',
                                    borderWidth: 2,
                                },
                            ],
                        }}
                        options={{
                            scales: {
                                y: {
                                    type: 'linear', // Đặt kiểu scale là 'linear' cho trục y
                                    ticks: {
                                        font: {
                                            size: 10,
                                        },
                                        min: 0,
                                    },
                                },
                                x: {
                                    type: 'category', // Đặt kiểu scale là 'category' cho trục x
                                    ticks: {
                                        font: {
                                            size: 10,
                                        },
                                    },
                                },
                            },
                        }}
                    /> */}
                    ;
                </div>

                <div className="data-line">
                    {/* <Line
                        data={{
                            labels: listMonth && listMonth.map((data) => data.name),
                            datasets: [
                                {
                                    label: 'Doanh thu theo ngày đ',
                                    data: listMonth && listMonth.map((data) => data.total),
                                    backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                                    borderColor: '#000',
                                    borderWidth: 2,
                                },
                            ],
                        }}
                        options={{
                            scales: {
                                y: {
                                    type: 'linear', // Đặt kiểu scale là 'linear' cho trục y
                                    ticks: {
                                        font: {
                                            size: 10,
                                        },
                                    },
                                },
                                x: {
                                    type: 'category', // Đặt kiểu scale là 'category' cho trục x
                                    ticks: {
                                        font: {
                                            size: 10,
                                        },
                                    },
                                },
                            },
                        }}
                    /> */}
                    ;
                </div>
            </div>
        </div>
    );
}
