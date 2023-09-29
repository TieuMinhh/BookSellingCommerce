import React from "react";
import "./Footer.scss";

import DownLoad from "../../Assets/img/taixuong.png";
import Delivery from "../../Assets/img/vanchuyen.png";
import Pay from "../../Assets/img/thanhtoan.png";

export default function Footer() {
  return (
    <footer class="footer">
      <div class="grid wide">
        <div class="row">
          <div class="col l-2-4 m-4 c-6">
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
          <div class="col l-2-4 m-4 c-6">
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
          <div class="col l-2-4 m-4 c-6">
            <h3 class="footer__heading">THANH TOÁN</h3>
            <div class="footer-pay">
              <img src={Pay} class="footer-pay-img" alt="pay"></img>
            </div>
            <h3 class="footer__heading">ĐƠN VỊ VẬN CHUYỂN</h3>
            <div class="footer-ship">
              <img alt="download" src={Delivery} class="footer-ship-img"></img>
            </div>
            {/* <!-- <div class="footer-download">
                        <img src="./assets/img/taixuong.png" class="footer-download-img"></img>
                    </div> --> */}
          </div>
          <div class="col l-2-4 m-4 c-6">
            <h3 class="footer__heading">THEO DÕI CHÚNG TÔI TRÊN</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <i class="fa-brands fa-facebook-f"></i>
                <a
                  href="https://www.facebook.com/xiaoming4869"
                  class="footer-item-link special-item"
                >
                  Facebook
                </a>
              </li>
              <li class="footer-item">
                <i class="fa-brands fa-instagram"></i>
                <a
                  href="https://www.instagram.com/liang_mingg/"
                  class="footer-item-link special-item"
                >
                  Instagram
                </a>
              </li>
              <li class="footer-item">
                <i class="fa-brands fa-tiktok"></i>
                <a
                  href="https://www.tiktok.com/@xiaoming4869"
                  class="footer-item-link special-item"
                >
                  Tiktok
                </a>
              </li>
              <li class="footer-item">
                <i class="fa-brands fa-github"></i>
                <a
                  href="https://github.com/TieuMinhh"
                  class="footer-item-link special-item"
                >
                  Github
                </a>
              </li>
              <li class="footer-item">
                <i class="fa-brands fa-youtube"></i>
                <a
                  href="https://www.youtube.com/channel/UC3cpdjGmTA6Joe2mUBmGEhQ"
                  class="footer-item-link special-item"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>
          <div class="col l-2-4 m-4 c-6">
            <h3 class="footer__heading">TẢI APP XIAO MING SHOP NGAY THÔI</h3>
            <div class="footer-download">
              <img alt="down" src={DownLoad} class="footer-download-img"></img>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-about-me">
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
      </div>
    </footer>
  );
}
