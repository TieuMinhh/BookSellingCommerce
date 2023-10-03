import { Link } from "react-router-dom";
import "./Profile.scss";

export default function Profile() {
  return (
    <div className="wrapper-profile ">
      <div className="container-profile ">
        <div className="sidebar-profile">
          <div className="wrapper-sidebar">
            <h3>Tài khoản</h3>
            <ul className="items-sidebar">
              <li>
                <a href="profile">Bảng điều khiển tài khoản</a>
              </li>
              <li>
                <a href="change-info">Thông tin tài khoản</a>
              </li>
              <li>
                <a href="change-address">Số địa chỉ</a>
              </li>
              <li>
                <a href="order-history">Đơn hàng của tôi</a>
              </li>
              <li>
                <a href="">Ví voucher</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-item-info">
          <div className="wrapper-info-profile">
            <h2>BẢNG ĐIỀU KHIỂN CỦA KHÁCH HÀNG</h2>
            <div className="wrapper-detail-info">
              <div className="detail-info-profile">
                <p className="user-name-profile ">
                  Họ và tên: <strong>Ming Xiao</strong>
                </p>
                <p className="user-email-profile ">
                  Email: <strong>minbao1412@gmail.com</strong>
                </p>
                <p className="user-level-profile    ">
                  Cấp độ thành viên: <strong>Thân Thiết</strong>
                </p>
                <h6>Thông tin tài khoản</h6>

                <p>
                  Số đơn hàng thành công năm 2023 <span>9</span>
                </p>
                <p>
                  Số tiền đã thanh toán năm 2023 <span>9</span>
                </p>
              </div>
            </div>

            <div className="user-detail-address">
              <h5>SỔ ĐỊA CHỈ</h5>
              <h6>ĐỊA CHỈ GIAO HÀNG MẶC ĐỊNH</h6>
              <p>97 Man Thiện, Thành phố Thủ Đức</p>

              <a href="edit-address" style={{ color: "#c92127" }}>
                Sửa đỉa chỉ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
