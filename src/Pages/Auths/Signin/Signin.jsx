import { React, useState } from "react";
import { Link } from "react-router-dom";

// import toast, { Toaster } from "react-hot-toast";
import "./SignUp.scss";

// import handleLogin from "../../services/handleLogin";
// import axios from "../../config/axios";
export default function SignUp() {
  //   const [username, setUserName] = useState("");
  //   const [isValidUser, setIsValidUser] = useState(false);
  //   const [password, setPassWord] = useState("");
  //   const [confirmPass, setConfirmPass] = useState("");
  //   const [isValidPass, setIsValidPass] = useState(false);
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="sub-signup-container">
          <div className="img">
            <div className="img-text m-up">
              <h2>Lưu ý!</h2>
              <p>Bạn cần đăng ký tài khoản để chơi game </p>
            </div>

            <div className="img-btn">
              <Link className="m-up" to="/login">
                Đăng Nhập
              </Link>
            </div>
          </div>
        </div>
        <div class="form sign-up">
          <h2>Đăng Ký</h2>
          <label>
            <span>Email</span>
            <input
              type="text"
              name="name"
              id="signup-name"
              //   value={username}
              //   onChange={handleOnChangeEmail}
            ></input>
            {/* {username.length != 0 ? (
              isValidUser ? (
                <span style={{ color: "green" }}>Email hợp lệ</span>
              ) : (
                <span style={{ color: "red" }}>Email không hợp lệ</span>
              )
            ) : null} */}
          </label>
          <label>
            <span>Mật Khẩu</span>
            <input
              type="password"
              name="password"
              id="signup-password"
              //   value={password}
              //   onChange={handleOnChangePassword}
            ></input>
            {/* {password.length != 0 ? (
              isValidPass ? null : (
                <span style={{ color: "red", fontSize: 11 }}>
                  Mật khẩu phải có ít nhất 8 kí tự, không chứa khoảng trắng
                </span>
              )
            ) : null} */}
          </label>
          <label>
            <span>Xác nhận mật khẩu</span>
            <input
              type="password"
              name="password"
              // id="signup-confirm-password"
              //   value={confirmPass}
              //   onChange={(e) => setConfirmPass(e.target.value)}
            ></input>
            {/* {confirmPass.length != 0 ? (
              password.localeCompare(confirmPass) == 0 ? null : (
                <span style={{ color: "red", fontSize: 11 }}>
                  Mật khẩu không trùng khớp!!
                </span>
              )
            ) : null} */}
          </label>
          <button
            type="button"
            id="signup-submit"
            class="submit"
            // onClick={clickSignUp}
          >
            Đăng Ký
          </button>
        </div>
      </div>
    </div>
  );
  //   function handleOnChangeEmail(e) {
  //     const inputEmail = e.target.value;
  //     setUserName(inputEmail);
  //     const emailPattern = /\S+@\S+\.\S+/; // Pattern kiểm tra email hợp lệ
  //     setIsValidUser(emailPattern.test(inputEmail)); // Sử dụng test method để kiểm tra
  //   }
  //   function handleOnChangePassword(e) {
  //     const inputPassword = e.target.value;
  //     setPassWord(inputPassword);
  //     // Kiểm tra password chứa ít nhất 8 ký tự và không chứa khoảng trắng
  //     setIsValidPass(inputPassword.length >= 8 && !/\s/.test(inputPassword));
  //   }
  //   function clickSignUp() {
  //     (async () => {
  //       const data = (
  //         await axios.post("/api/v1/auth/signup", { email: username, password })
  //       ).data;
  //       if (data.errCode == 1) {
  //         toast.error(data.message);
  //       } else {
  //         setTimeout(() => {
  //           window.location.href = "/login";
  //         }, 1500);
  //         toast.success("Tạo tài khoản thành công");
  //       }
  //     })().catch((err) =>
  //       toast.error(`Có lỗi xảy ra
  //     ${err}`)
  //     );
  //   }
}
