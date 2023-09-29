import React from "react";
import "./Filter.scss";

export default function Filter() {
  return (
    <div class="sidebar_content col l-3 c-0 m-0">
      <h1>GIẢI ĐẤU</h1>
      <div class="brand-filter">
        <div class="brand-search">
          <input type="text" placeholder="Lọc theo giải đấu"></input>
          <i class="icon fa fa-search"></i>
        </div>
        <div class="list-filter">
          <div class="filter-item">
            <ul>
              <li>
                <input type="checkbox"></input>
                <span>
                  Premier League
                  <img
                    class="logo-img"
                    src="/assets/img/premier-league-logo.png"
                  ></img>
                </span>
              </li>
              <li>
                <input type="checkbox"></input>
                <span>
                  La Liga
                  <img class="logo-img" src="/assets/img/LaLiga.png"></img>
                </span>
              </li>
              <li>
                <input type="checkbox"></input>
                <span>
                  Serie A
                  <img
                    class="logo-img"
                    src="/assets/img/seria.png"
                    // style={{width: "74px";height: "31px";margin-left: "-16px";margin-bottom: "-11px"}}
                  ></img>
                </span>
              </li>
              <li>
                <input type="checkbox"></input>
                <span>
                  Bundesliga
                  <img
                    class="logo-img"
                    src="/assets/img/Bundesliga.png"
                    // style="width: 62px;
                    //                       height: 28px;
                    //                       margin-left: -10px;
                    //                       margin-bottom: -12px"
                  ></img>
                </span>
              </li>
              <li>
                <input type="checkbox"></input>
                <span>
                  Ligue 1
                  <img
                    class="logo-img"
                    src="/assets/img/league1.png"
                    // style="width: 25px;
                    //                       height: 30px;
                    //                       margin-left: 8px;
                    //                       margin-bottom: -11px"
                  ></img>
                </span>
              </li>
              <li>
                <input type="checkbox"></input>
                <span>
                  V-League
                  <img
                    class="logo-img"
                    src="/assets/img/vleague.png"
                    // style="width: 86px;
                    //                       height: 31px;
                    //                       margin-left: 11px;
                    //                       margin-bottom: -12px"
                  ></img>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h1>GIÁ SẢN PHẨM</h1>
      <div class="price-filter">
        <input id="slider" type="range" min="100" max="500" value="50"></input>
        <p>
          Tầm giá: <span id="price"></span>
        </p>
      </div>
      <h1>NHU CẦU</h1>
      <div class="list-filter">
        <div class="ilter-item">
          <ul>
            <li>
              <input type="checkbox"></input>
              <span> Mặc cho đẹp</span>
            </li>
            <li>
              <input type="checkbox"></input>
              <span>Mặc cho mát</span>
            </li>
            <li>
              <input type="checkbox"></input>
              <span>Mặc đi học</span>
            </li>
          </ul>
        </div>
      </div>

      <h1>KÍCH CỠ</h1>
      <div class="list-filter">
        <div class="ilter-item">
          <ul>
            <li>
              <input type="checkbox"></input>
              <span>Size S</span>
            </li>
            <li>
              <input type="checkbox"></input>
              <span>Size M</span>
            </li>
            <li>
              <input type="checkbox"></input>
              <span>Size L</span>
            </li>
            <li>
              <input type="checkbox"></input>
              <span>Size XL</span>
            </li>
            <li>
              <input type="checkbox"></input>
              <span>Size XXL</span>
            </li>
          </ul>
        </div>
      </div>
      <h1>KIỂU ÁO</h1>
      <div class="list-filter">
        <div class="ilter-item">
          <ul>
            <li>
              <input type="checkbox"></input>
              <span>Ngắn tay</span>
            </li>
            <li>
              <input type="checkbox"></input>
              <span>Dài Tay</span>
            </li>
            <li>
              <input type="checkbox"></input>
              <span>Có Cổ</span>
            </li>
            <li>
              <input type="checkbox"></input>
              <span>Không Cổ</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
