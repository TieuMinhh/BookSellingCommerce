import React from 'react';
import './Footer.scss';

import DownLoad from '../../Assets/img/taixuong.png';
import VnPay from '../../Assets/img/vnpay_logo.png';
import ZaloPay from '../../Assets/img/ZaloPay-logo-130x83.png';
import MoMo from '../../Assets/img/momopay.png';
import ShopePay from '../../Assets/img/shopeepay_logo.png';
import Moca from '../../Assets/img/logo_moca_120.jpg';
import VnPost from '../../Assets/img/vnpost.png';
import Ahamove from '../../Assets/img/ahamove_logo.png';
import GHN from '../../Assets/img/icon_giao_hang_nhanh1.png';
import Snaapy from '../../Assets/img/icon_snappy1.png';
import Ninja from '../../Assets/img/Logo_ninjavan.png';
import GooglePlay from '../../Assets/img/android.png';
import AppStore from '../../Assets/img/appstore.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="grid wide">
                <div className="row">
                    <div className="col">
                        <h3 className="footer__heading">CHĂM SÓC KHÁCH HÀNG</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Trung Tâm Trợ Giúp{' '}
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    XiaoMing Blog
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    XiaoMing Mall
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Hướng Dẫn Mua Hàng
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Hướng Dẫn Bán Hàng
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Thanh Toán
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Vận Chuyển
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Chăm Sóc Khách Hàng
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Chính Sách Bảo Hành
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col ">
                        <h3 className="footer__heading">VỀ XIAO MING SHOP</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Giới Thiệu Về Xiao Ming shop
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Tuyển Dụng
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Điều Khoản
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Chính Sách Bảo Mật
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Flash Sale
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Kênh Người Bán
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="!#" className="footer-item-link">
                                    Liên Hệ Với Truyền Thông
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col ">
                        <h3 className="footer__heading" style={{ marginBottom: '54px' }}>
                            TẢI APP XIAO MING SHOP NGAY THÔI
                        </h3>
                        <div className="footer-download">
                            <img
                                style={{
                                    width: '180px',
                                    marginLeft: '20px',
                                    marginBottom: '12px',
                                }}
                                alt="down"
                                src={GooglePlay}
                                className="footer-download-img"
                            ></img>
                            <img
                                style={{ width: '180px', marginLeft: '20px' }}
                                alt="down"
                                src={AppStore}
                                className="footer-download-img"
                            ></img>
                        </div>
                    </div>

                    <div className="col 2" style={{ marginLeft: '10px' }}>
                        <h3 className="footer__heading">THANH TOÁN</h3>
                        <div className="footer-pay">
                            <img style={{ width: '120px' }} src={VnPay} className="footer-pay-img" alt="pay"></img>
                            <img style={{ width: '120px' }} src={ZaloPay} className="footer-pay-img" alt="pay"></img>
                            <img style={{ width: '50px' }} src={MoMo} className="footer-pay-img" alt="pay"></img>
                            <img style={{ width: '95px' }} src={ShopePay} className="footer-pay-img" alt="pay"></img>
                            <img style={{ width: '65px' }} src={Moca} className="footer-pay-img" alt="pay"></img>
                        </div>
                        <h3 className="footer__heading">ĐƠN VỊ VẬN CHUYỂN</h3>
                        <div className="footer-ship">
                            <img
                                style={{ width: '100px' }}
                                alt="transport"
                                src={VnPost}
                                className="footer-ship-img"
                            ></img>
                            <img
                                style={{ width: '138px' }}
                                alt="transport"
                                src={Ahamove}
                                className="footer-ship-img"
                            ></img>
                            <img style={{ width: '138px' }} alt="transport" src={GHN} className="footer-ship-img"></img>
                            <img
                                style={{ width: '138px' }}
                                alt="transport"
                                src={Snaapy}
                                className="footer-ship-img"
                            ></img>
                            <img
                                style={{ width: '138px' }}
                                alt="transport"
                                src={Ninja}
                                className="footer-ship-img"
                            ></img>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
