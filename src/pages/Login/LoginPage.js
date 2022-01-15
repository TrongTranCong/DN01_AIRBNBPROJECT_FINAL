import React, { useState } from "react";
import "./LoginPage.css";
import loginImage from "../../assets/login-image.jpg";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import { DangNhapAction } from "../../redux/actions/UserLoginAction";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import axios from "axios";

import { DOMAIN } from "../../util/setting";

export default function LoginPage(props) {
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  // console.log(props);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Vui lòng điền vào trường này")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email không đúng định dạng"),
      password: Yup.string()
        .required("Vui lòng điền vào trường này")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Tối thiểu 6 ký tự, ít nhất một chữ cái và một số"
        )
        .max(10, "Mật khẩu tối đa không quá 10 ký tự"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios({
          url: `${DOMAIN}/api/auth/login`,
          method: "POST",
          headers: {
            tokenByClass:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NjU0NzIwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjU2Njk0ODAwfQ.6o2C_IS8e7HlB9dUZ9eFRYOb2ST9LjIIbn4fO_SS1Qc",
          },
          data: values,
        });
        // console.log(response.data);
        dispatch(DangNhapAction({ values, callback: handleLoginSucces }));
      } catch (error) {
        setErrMsg(error.response.data.message);
      }
      // console.log("values", values);
      // const action = DangNhapAction({ values, callback: handleLoginSucces });
      // dispatch(action);
    },
  });

  const handleCloseLogin = () => {
    history.push("/");
  };
  const handleLoginSucces = () => {
    history.push("/");
    // history.goBack();
  };

  return (
    <div className="login-page py-5 bg-light">
      <div className="container vh-login">
        <div className="row content no-gutters">
          <div className="col-lg-5 login-col-left ">
            <img src={loginImage} className="img-fluid" alt="login-img" />
          </div>
          <div className="col-lg-7 login-col-right text-center">
            <div>
              <div className="modal-header">
                <div className="space"></div>
                <span className="login-logo fab fa-airbnb">
                  <b>airbnb</b>
                </span>
                <div className="login-close">
                  <button
                    type="button"
                    className="close"
                    onClick={handleCloseLogin}
                  >
                    <span className="close-icon" aria-hidden="false">
                      ×
                    </span>
                    <span className="overlay-close"></span>
                  </button>
                </div>
              </div>
              <h3 className="title-login">Đăng nhập vào airbnb</h3>
              <form className="form-login" onSubmit={formik.handleSubmit}>
                <div
                  // className={
                  //   formik.touched.email && formik.errors.email
                  //     ? "input-box"
                  //     : "input-box my-4"
                  // }
                  className="input-box my-3"
                >
                  <input
                    type="text"
                    className={
                      formik.touched.email && formik.errors.email
                        ? " border-warn input-login bg-warn"
                        : "input-login"
                    }
                    placeholder="Tài khoản"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>

                <div
                  // className={
                  //   formik.touched.password && formik.errors.password
                  //     ? "input-box"
                  //     : "input-box my-4"
                  // }
                  className="input-box my-3"
                >
                  <input
                    type="password"
                    className={
                      formik.touched.password && formik.errors.password
                        ? " border-warn input-login bg-warn"
                        : "input-login"
                    }
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger">{formik.errors.password}</div>
                  )}
                </div>
                {errMsg !== "" && (
                  <div
                    style={{ color: "red" }}
                    className="error-message mb-4 mt-2"
                  >
                    <i className="far fa-times-circle mr-2"></i>
                    {errMsg}
                  </div>
                )}
                <button type="submit" className="button-login mt-3">
                  Đăng nhập
                </button>

                <div className="forget-id">
                  <a href="">Quên mật khẩu?</a>
                </div>
                <div className="option">Hoặc</div>
              </form>
              <div className="fblink">
                <p className="loginwith">Đăng nhập với</p>
                <a href="https://facebook.com">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://google.com">
                  <i className="fab fa-google"></i>
                </a>
                <a href="https://apple.com">
                  <i className="fab fa-apple"></i>
                </a>
              </div>
              <div className="signup">
                <p className="noacc">
                  Không có tài khoản?
                  <NavLink className="signupbtn" to="/register">
                    Đăng ký
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}