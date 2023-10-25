import React, { useState, useEffect } from 'react';
import './MyVoucher.scss';
import CuponIcon from '../../../Assets/svg/ico_coupon.svg';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';
import moment from 'moment';
import SidebarProfile from '../SidebarProfile/SidebarProfile';

export default function MyVoucher() {
    const [change, setChange] = useState(false);
    const [list, setList] = useState([]);

    async function getListProduct() {
        const result = await axios.get(axios.defaults.baseURL + `/discount?id=ALL`);
        setList(result?.data.listDiscount);
    }
    useEffect(() => {
        getListProduct();
    }, [change]);

    return (
        <div className="wrapper-profile ">
            <div className="container-profile ">
                <div className="sidebar-profile">
                    <div className="wrapper-sidebar">
                        <SidebarProfile />
                    </div>
                </div>
                <div className="sidebar-voucher">
                    <div className="wrapper-header-voucher">
                        <h5>VÍ VOUCHER</h5>
                        <p>Voucher của tôi</p>
                        <div className="line-under"></div>
                    </div>
                    <div className="wrapper-content-voucher">
                        <div className="container-content-voucher">
                            <div className="header-content-voucher">
                                <img src={CuponIcon} alt="" />
                                <h6>KHUYẾN MÃI</h6>
                            </div>

                            {list &&
                                list.map((item, index) => {
                                    return (
                                        <div className="detail-content-voucher" key={item.discount_code}>
                                            <p className="title-code">Code : {item.discount_code}</p>
                                            <p className="title-voucher">{item.description}</p>
                                            <p className="voucher-time">
                                                ÁP DỤNG TỪ {moment(item.start_date).format('L')} ĐẾN{' '}
                                                {moment(item.end_date).format('L')}
                                            </p>
                                            <p className="detail-voucher">Chi tiết</p>
                                        </div>
                                    );
                                })}

                            {/* <div className="detail-content-voucher">
                                <p className="title-voucher">MÃ GIẢM 30K - ĐƠN HÀNG TỪ 270K</p>
                                <p className="voucher-time">ÁP DỤNG TỪ THỨ 2 ĐẾN THỨ 4 HÀNG TUẦN</p>
                                <p className="detail-voucher">Chi tiết</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
