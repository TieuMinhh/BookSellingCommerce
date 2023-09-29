import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
// import axiosApiInstance from "../Configs/interceptor";
// import axios from "../../Configs/axios";

import { setToken } from "../../Services/Token";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import facebookImage from "../../assets/Images/facebook.png";
import instagramImage from "../../assets/Images/instagram.png";
import linkedinImage from "../../assets/Images/linkedin.png";
import twitterImage from "../../assets/Images/twitter.png";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUserName] = useState("");
  const [isValidUser, setIsValidUser] = useState(true);
  const [password, setPassWord] = useState("");
  const [isValidPass, setIsValidPass] = useState(false);
  // const [isSignup, setIsSignup] = useState(false);

  // const handleClick = () => {
  //   setIsSignup((prevState) => !prevState);
  // };

  const navigate = useNavigate();

  const handleLogin = () => {
    (async () => {
      let result = (
        await axios.post(`http://localhost:8081/api/v1/login`, {
          email: username,
          password,
        })
      ).data;

      if (result.errCode === 0) {
        // setToken(result.accessToken, result.refreshToken);
        setToken(result.userData);
        setTimeout(() => {
          navigate("/");
        }, 1500);
        toast.success(result.message);
      } else if (result.errCode === 2) toast.error(result.message);

      console.log(result);
    })().catch((err) => {
      console.log(err);
    });
  };

  function handleOnChangeEmail(e) {
    const inputEmail = e.target.value;
    setUserName(inputEmail);
    const emailPattern = /\S+@\S+\.\S+/; // Pattern kiểm tra email hợp lệ
    setIsValidUser(emailPattern.test(inputEmail)); // Sử dụng test method để kiểm tra
  }
  function handleOnChangePassword(e) {
    const inputPassword = e.target.value;
    setPassWord(inputPassword);
    // Kiểm tra password chứa ít nhất 8 ký tự và không chứa khoảng trắng
    setIsValidPass(inputPassword.length >= 1);
  }

  // function clickLogin() {
  //   (async () => {
  //     const result = await handleLogin(username, password);
  //     // toast.success(data.message);
  //     console.log(result);
  //   })().catch((err) =>
  //     //   toast.error(`Có lỗi xảy ra
  //     // ${err}`)
  //     console.log(err)
  //   );
  // }

  return (
    <div className="login-page">
      <div className="account-container">
        <div className="form">
          <h2 className="text-black">Đăng Nhập</h2>
          <label>
            <span>Email</span>
            <input
              type="text"
              id="login-name"
              name="name"
              value={username}
              onChange={handleOnChangeEmail}
            ></input>
            {username.length != 0 ? (
              isValidUser ? (
                <span style={{ color: "green" }}></span>
              ) : (
                <span style={{ color: "red" }}>Email không hợp lệ</span>
              )
            ) : null}
          </label>
          <label>
            <span>Mật Khẩu</span>
            <input
              type="password"
              id="login-password"
              name="password"
              value={password}
              onChange={handleOnChangePassword}
            ></input>
            {password.length != 0 ? (
              isValidPass ? null : (
                <span style={{ color: "red" }}>Mật khẩu không hợp lệ</span>
              )
            ) : null}
          </label>

          <button
            id="login-submit"
            className="submit"
            type="button"
            disabled={!isValidUser || !isValidPass}
            onClick={handleLogin}
          >
            Đăng Nhập
          </button>

          <p className="forgot-pass">Quên Mật Khẩu?</p>

          <div className="social-media">
            <p>Hoặc đăng nhập bằng</p>
            <ul>
              <li>
                <img src={facebookImage} alt="facebook" />
              </li>
              <li>
                <img src={twitterImage} alt="twitter" />
              </li>
              <li>
                <img src={linkedinImage} alt="linkedin" />
              </li>
              <li>
                <img src={instagramImage} alt="instagram" />
              </li>
            </ul>
          </div>
        </div>

        <div className="sub-login-container">
          <div className="img">
            <div className="img-text m-up">
              <h2>Có gì mới?</h2>
              <p>Truy cập website để tìm kiếm đồ uống ưa thích đi nào</p>
            </div>
            <div className="img-btn">
              <Link className="m-up" to="/signup">
                Đăng Ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
