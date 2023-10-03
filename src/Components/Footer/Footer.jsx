import React from "react";
import "./Footer.scss";

import DownLoad from "../../Assets/img/taixuong.png";
import VnPay from "../../Assets/img/vnpay_logo.png";
import ZaloPay from "../../Assets/img/ZaloPay-logo-130x83.png";
import MoMo from "../../Assets/img/momopay.png";
import ShopePay from "../../Assets/img/shopeepay_logo.png";
import Moca from "../../Assets/img/logo_moca_120.jpg";
import VnPost from "../../Assets/img/vnpost.png";
import Ahamove from "../../Assets/img/ahamove_logo.png";
import GHN from "../../Assets/img/icon_giao_hang_nhanh1.png";
import Snaapy from "../../Assets/img/icon_snappy1.png";
import Ninja from "../../Assets/img/Logo_ninjavan.png";
import GooglePlay from "../../Assets/img/android.png";
import AppStore from "../../Assets/img/appstore.png";

export default function Footer() {
  return (
    <footer class="footer">
      <div class="grid wide">
        <div class="row">
          <div class="col">
            <h3 class="footer__heading">CHĂM SÓC KHÁCH HÀNG</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Trung Tâm Trợ Giúp{" "}
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  XiaoMing Blog
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  XiaoMing Mall
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Hướng Dẫn Mua Hàng
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Hướng Dẫn Bán Hàng
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Thanh Toán
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Vận Chuyển
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Chăm Sóc Khách Hàng
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Chính Sách Bảo Hành
                </a>
              </li>
            </ul>
          </div>
          <div class="col ">
            <h3 class="footer__heading">VỀ XIAO MING SHOP</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Giới Thiệu Về Xiao Ming shop
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Tuyển Dụng
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Điều Khoản
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Chính Sách Bảo Mật
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Flash Sale
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Kênh Người Bán
                </a>
              </li>
              <li class="footer-item">
                <a href="!#" class="footer-item-link">
                  Liên Hệ Với Truyền Thông
                </a>
              </li>
            </ul>
          </div>

          <div class="col ">
            <h3 class="footer__heading" style={{ marginBottom: "54px" }}>
              TẢI APP XIAO MING SHOP NGAY THÔI
            </h3>
            <div class="footer-download">
              <img
                style={{
                  width: "180px",
                  marginLeft: "20px",
                  marginBottom: "12px",
                }}
                alt="down"
                src={GooglePlay}
                class="footer-download-img"
              ></img>
              <img
                style={{ width: "180px", marginLeft: "20px" }}
                alt="down"
                src={AppStore}
                class="footer-download-img"
              ></img>
            </div>
          </div>

          <div class="col 2" style={{ marginLeft: "10px" }}>
            <h3 class="footer__heading">THANH TOÁN</h3>
            <div class="footer-pay">
              <img
                style={{ width: "120px" }}
                src={VnPay}
                class="footer-pay-img"
                alt="pay"
              ></img>
              <img
                style={{ width: "120px" }}
                src={ZaloPay}
                class="footer-pay-img"
                alt="pay"
              ></img>
              <img
                style={{ width: "50px" }}
                src={MoMo}
                class="footer-pay-img"
                alt="pay"
              ></img>
              <img
                style={{ width: "95px" }}
                src={ShopePay}
                class="footer-pay-img"
                alt="pay"
              ></img>
              <img
                style={{ width: "65px" }}
                src={Moca}
                class="footer-pay-img"
                alt="pay"
              ></img>
            </div>
            <h3 class="footer__heading">ĐƠN VỊ VẬN CHUYỂN</h3>
            <div class="footer-ship">
              <img
                style={{ width: "100px" }}
                alt="transport"
                src={VnPost}
                class="footer-ship-img"
              ></img>
              <img
                style={{ width: "138px" }}
                alt="transport"
                src={Ahamove}
                class="footer-ship-img"
              ></img>
              <img
                style={{ width: "138px" }}
                alt="transport"
                src={GHN}
                class="footer-ship-img"
              ></img>
              <img
                style={{ width: "138px" }}
                alt="transport"
                src={Snaapy}
                class="footer-ship-img"
              ></img>
              <img
                style={{ width: "138px" }}
                alt="transport"
                src={Ninja}
                class="footer-ship-img"
              ></img>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="footer-about-me">
        <div class="footer-about-me-list">
          <a href="https://www.facebook.com/xiaoming4869">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/liang_mingg/">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/channel/UC3cpdjGmTA6Joe2mUBmGEhQ">
            <i class="fa-brands fa-youtube"></i>
          </a>
          <a href="#/">
            <i class="fa-brands fa-twitter"></i>
          </a>
          <a href="https://www.tiktok.com/@xiaoming4869">
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a href="https://github.com/TieuMinhh">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
        <div class="footer-power">
          <p>
            Powered by{" "}
            <a href="https://www.facebook.com/xiaoming4869">小 明 先 生</a>
          </p>
        </div>
      </div> */}
    </footer>
  );
}
