import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import { setToken } from "../../../Services/Token";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MyLoginModal({ show, handleClose, handleLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("tab1");
  const [username, setUserName] = useState("");
  const [isValidUser, setIsValidUser] = useState(true);
  const [password, setPassWord] = useState("");
  const [phone, setPhone] = useState("");
  const [isValidPass, setIsValidPass] = useState(false);

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
        console.log(result);
        setToken(result.userData);
        setTimeout(() => {
          navigate("/");
        }, 1500);
        toast.success(result.message);
        handleLoginSuccess();
      } else if (result.errCode === 1) toast.error(result.message);
      else toast.error(result.message);

      console.log(result);
    })().catch((err) => {
      console.log(err);
    });
  };

  const handleSignup = () => {
    (async () => {
      const data = (
        await axios.post("http://localhost:8081/api/v1/account/signup", {
          email: username,
          password,
          phone,
        })
      ).data;
      if (data.errCode === 1) {
        toast.error(data.message);
      } else if (data.errCode === 2) {
        toast.warning(data.message);
      } else {
        toast.success(data.message);
        setActiveTab("tab1");
      }
    })().catch((err) =>
      toast.error(`Có lỗi xảy ra
      ${err}`)
    );
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

  function handleOnChangePhone(e) {
    const inputPhone = e.target.value;
    setPhone(inputPhone);
    // Kiểm tra Phone chứa 10 ký tự và không chứa khoảng trắng
    setIsValidPass(inputPhone.length === 10);
  }

  const SendOTP = () => {
    alert("Đã gửi mã OTP");
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Modal show={show} onHide={handleClose} className="mt-5">
      <Modal.Header>
        <ul className="tabs">
          <li
            className={activeTab === "tab1" ? "active" : ""}
            onClick={() => handleTabClick("tab1")}
          >
            <div className="title">Đăng nhập</div>
          </li>
          <li
            className={activeTab === "tab2" ? "active" : ""}
            onClick={() => handleTabClick("tab2")}
          >
            <div className="title">Đăng ký</div>
          </li>
        </ul>
      </Modal.Header>
      <Modal.Body className="mt-2">
        {activeTab === "tab1" && (
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className="text-black text-size-fit mx-3">
                Email
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập email"
                className="mx-3"
                style={{ width: "430px" }}
                name="name"
                value={username}
                onChange={handleOnChangeEmail}
              />
              {username.length != 0 ? (
                isValidUser ? (
                  <span style={{ color: "green" }}></span>
                ) : (
                  <span style={{ color: "red" }}>Email không hợp lệ</span>
                )
              ) : null}
            </Form.Group>

            <Form.Group className="mb-2" controlId="formImg">
              <Form.Label className="text-black text-size-fit mx-3">
                Mật khẩu
              </Form.Label>
              <Form.Control
                className="mb-2 mx-3 "
                type="password"
                placeholder="Nhập mật khẩu"
                style={{ width: "430px" }}
                name="password"
                value={password}
                onChange={handleOnChangePassword}
              />
              {password.length != 0 ? (
                isValidPass ? null : (
                  <span style={{ color: "red" }}>Mật khẩu không hợp lệ</span>
                )
              ) : null}
              <Form.Label
                style={{ cursor: "pointer" }}
                className="text-right color-red mx-4"
                onClick={() => handleTabClick("tab3")}
              >
                Quên mật khẩu ?
              </Form.Label>
            </Form.Group>

            <Form.Group className="mt-5 mb-3 d-flex justify-content-center align-items-center">
              <Button
                // variant="danger"
                style={{
                  width: "50%",
                  backgroundColor: "#C92127",
                  color: "#fff",
                  border: "none",
                }}
                disabled={!isValidUser || !isValidPass}
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>
            </Form.Group>

            <Form.Group className="mt-2 d-flex justify-content-center align-items-center">
              <Button
                onClick={handleClose}
                // variant="outline-danger"
                style={{
                  width: "50%",
                  color: "#C92127",
                  backgroundColor: "#fff",
                  borderColor: "#C92127",
                  fontWeight: "600",
                }}
              >
                Bỏ qua
              </Button>
            </Form.Group>

            <Form.Group className="mt-3 d-flex justify-content-center align-items-center">
              <Button
                // variant="outline-danger"
                style={{
                  width: "50%",
                  backgroundColor: "#2489F4",
                  color: " white",
                  border: "1px solid #2489F4",
                }}
              >
                <i
                  className="fa fa-facebook"
                  style={{
                    color: "#2489F4",
                    backgroundColor: "#fff",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    marginRight: "4px",
                  }}
                ></i>
                Đăng nhập bằng Facebook
              </Button>
            </Form.Group>
          </Form>
        )}

        {activeTab === "tab2" && (
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className="text-black text-size-fit mx-3">
                Email
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập email"
                className="mx-3"
                style={{ width: "430px" }}
                name="name"
                value={username}
                onChange={handleOnChangeEmail}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImg">
              <Form.Label className="text-black text-size-fit mx-3">
                Mật khẩu
              </Form.Label>
              <Form.Control
                className="mb-2 mx-3"
                type="password"
                placeholder="Nhập mật khẩu"
                style={{ width: "430px" }}
                name="password"
                value={password}
                onChange={handleOnChangePassword}
              />
              {/* <Form.Label className="text-right color-red mx-4">
              Quên mật khẩu ?
            </Form.Label> */}
            </Form.Group>

            <Form.Group className="mb-2" controlId="formImg">
              <Form.Label className="text-black text-size-fit mx-3">
                Số điện thoại
              </Form.Label>
              <Form.Control
                className="mb-2 mx-3 "
                type="tel"
                placeholder="Nhập số điện thoại"
                style={{ width: "430px" }}
                name="phone"
                value={phone}
                onChange={handleOnChangePhone}
              />
              {/* <Form.Label className="text-right color-red mx-4">
              Quên mật khẩu ?
            </Form.Label> */}
            </Form.Group>

            <Form.Group className="mt-4 mb-3 d-flex justify-content-center align-items-center">
              <Button
                // variant="danger"
                style={{
                  width: "50%",
                  backgroundColor: "#C92127",
                  color: "#fff",
                  border: "none",
                }}
                disabled={!isValidUser || !isValidPass}
                onClick={handleSignup}
              >
                Đăng ký
              </Button>
            </Form.Group>

            <Form.Group className="mt-2 d-flex justify-content-center align-items-center">
              <Button
                // variant="outline-danger"
                style={{
                  width: "50%",
                  color: "#C92127",
                  backgroundColor: "#fff",
                  borderColor: "#C92127",
                  fontWeight: "600",
                }}
                onClick={handleClose}
              >
                Bỏ qua
              </Button>
            </Form.Group>

            <Form.Group className="mt-4">
              <div className="text-black text-center text-13">
                Bằng việc đăng ký, bạn đã đồng ý với Fahasa.com về
              </div>
              <div className="text-center">
                <a href="!#" className="text-center text-13">
                  Điều khoản dịch vụ &
                </a>
                <a href="#" className="text-center text-13">
                  Chính sách bảo mật{" "}
                </a>
              </div>
            </Form.Group>
          </Form>
        )}

        {activeTab === "tab3" && (
          <>
            <Modal.Title className="text-center text-black">
              KHÔI PHỤC MẬT KHẨU
            </Modal.Title>

            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label className="text-black text-size-fit mx-3">
                  Email
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập email"
                  className="mx-3"
                  style={{ width: "430px" }}
                  name="name"
                  value={username}
                  onChange={handleOnChangeEmail}
                />
                <div
                  onClick={SendOTP}
                  style={{
                    display: "block",
                    position: "absolute",
                    right: "50px",
                    bottom: "306px",
                    color: "#2489F4",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  Gửi mã OTP
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImg">
                <Form.Label className="text-black text-size-fit mx-3">
                  Nhập mã OTP
                </Form.Label>
                <Form.Control
                  className="mb-2 mx-3"
                  type="number"
                  placeholder="Nhập mã OTP"
                  style={{ width: "430px" }}
                  name="password"
                  value={password}
                  onChange={handleOnChangePassword}
                />
                {/* <Form.Label className="text-right color-red mx-4">
              Quên mật khẩu ?
            </Form.Label> */}
              </Form.Group>

              <Form.Group className="mb-2" controlId="formImg">
                <Form.Label className="text-black text-size-fit mx-3">
                  Nhập mật khẩu mới
                </Form.Label>
                <Form.Control
                  className="mb-2 mx-3 "
                  type="tel"
                  placeholder="Nhập mật khẩu mới"
                  style={{ width: "430px" }}
                  name="phone"
                  value={phone}
                  onChange={handleOnChangePhone}
                />
                {/* <Form.Label className="text-right color-red mx-4">
              Quên mật khẩu ?
            </Form.Label> */}
              </Form.Group>

              <Form.Group className="mt-4 mb-3 d-flex justify-content-center align-items-center">
                <Button
                  // variant="danger"
                  style={{
                    width: "50%",
                    backgroundColor: "#C92127",
                    color: "#fff",
                    border: "none",
                  }}
                  disabled={!isValidUser || !isValidPass}
                  onClick={handleSignup}
                >
                  Xác nhận
                </Button>
              </Form.Group>

              <Form.Group className="mt-2 d-flex justify-content-center align-items-center">
                <Button
                  // variant="outline-danger"
                  style={{
                    width: "50%",
                    color: "#C92127",
                    backgroundColor: "#fff",
                    borderColor: "#C92127",
                    fontWeight: "600",
                  }}
                  onClick={handleClose}
                >
                  Bỏ qua
                </Button>
              </Form.Group>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default MyLoginModal;
