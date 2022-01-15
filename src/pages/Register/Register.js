import React from "react";
import "./Register.css";
import sigupImage from "../../assets/signup-image.jpeg";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { DangKyAction } from "../../redux/actions/UserRegisterAction";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { DOMAIN } from "../../util/setting";

export default function Register() {
  const dispatch = useDispatch();
  const [successMsg, setSuccessMsg] = useState("");
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      address: "",
      type: "CLIENT",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Vui lòng điền vào trường này"),
      email: Yup.string()
        .required("Vui lòng điền vào trường này")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email không đúng định dạng"),
      password: Yup.string()
        .required("Vui lòng điền vào trường này")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Tối thiểu 6 ký tự, ít nhất một chữ cái và một số"
        ),
      phone: Yup.string()
        .required("Vui lòng điền vào trường này")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Số điện thoại không đúng định dạng"
        ),
      birthday: Yup.string().required("Vui lòng điền vào trường này"),
      address: Yup.string().required("Vui lòng điền vào trường này"),
    }),
    onSubmit: async (values) => {
      // dispatch(DangKyAction(values));
      // // console.log(values.type);
      // return window.location.reload();
      try {
        const response = await axios({
          url: `${DOMAIN}/api/auth/register`,
          method: "POST",
          headers: {
            tokenByClass:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NjU0NzIwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjU2Njk0ODAwfQ.6o2C_IS8e7HlB9dUZ9eFRYOb2ST9LjIIbn4fO_SS1Qc",
          },
          data: values,
        });
        console.log(response.data);
        dispatch(DangKyAction(values));

        // resetForm({
        //   values: {
        //     name: "",
        //     email: "",
        //     password: "",
        //     phone: "",
        //     birthday: "",
        //     gender: true,
        //     address: "",
        //     type: "CLIENT",
        //   },
        // });
        setSuccessMsg("Đăng ký thành công");
        document.getElementById("form-register").reset();
        formik.resetForm({
          name: "",
          email: "",
          password: "",
          phone: "",
          birthday: "",
          gender: true,
          address: "",
          type: "CLIENT",
        });
        // return window.location.reload();
      } catch (error) {
        alert(error);
      }
    },
  });
  const handleCloseRegister = () => {
    history.push("/");
  };
  return (
    <div className="register py-3 bg-light">
      {/* <div className="vh"> */}

      <div className="container vh-register">
        <div className="row content no-gutters">
          <div className="col-lg-5 register-col-left">
            <img src={sigupImage} className=" img-fluid" alt="register-img" />
          </div>
          <div className="col-lg-7 register-col-right text-center ">
            {/* text-center */}
            <div>
              <div className="modal-header">
                <div className="space"></div>
                <span className="register-logo fab fa-airbnb">
                  <b>airbnb</b>
                </span>
                <div className="register-close">
                  <button
                    type="button"
                    className="close "
                    onClick={handleCloseRegister}
                  >
                    <span className="close-icon" aria-hidden="false">
                      ×
                    </span>
                    <span className="overlay-close"></span>
                  </button>
                </div>
              </div>
              <h3 className="title-register">Đăng kí tài khoản airbnb</h3>
              <form
                className="form-register"
                id="form-register"
                onSubmit={formik.handleSubmit}
              >
                <div className="user-details">
                  <div
                    className={
                      formik.touched.name && formik.errors.name
                        ? "input-box"
                        : "input-box mb-4"
                    }
                  >
                    <input
                      autoComplete="off"
                      type="text"
                      className={
                        formik.touched.name && formik.errors.name
                          ? " border-warn input-register bg-warn"
                          : "input-register"
                      }
                      placeholder="Họ tên"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-danger">{formik.errors.name}</div>
                    )}
                  </div>
                  <div
                    className={
                      formik.touched.email && formik.errors.email
                        ? "input-box"
                        : "input-box mb-4"
                    }
                  >
                    <input
                      autoComplete="off"
                      type="email"
                      className={
                        formik.touched.email && formik.errors.email
                          ? " border-warn input-register bg-warn"
                          : "input-register"
                      }
                      placeholder="Email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>
                  <div
                    className={
                      formik.touched.password && formik.errors.password
                        ? "input-box"
                        : "input-box mb-4"
                    }
                  >
                    <input
                      type="password"
                      className={
                        formik.touched.password && formik.errors.password
                          ? " border-warn input-register bg-warn"
                          : "input-register"
                      }
                      placeholder="Mật khẩu"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? "input-box"
                        : "input-box mb-4"
                    }
                  >
                    <input
                      type="text"
                      className={
                        formik.touched.phone && formik.errors.phone
                          ? " border-warn input-register bg-warn"
                          : "input-register"
                      }
                      placeholder="Số điện thoại"
                      name="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-danger">{formik.errors.phone}</div>
                    )}
                  </div>
                  <div
                    className={
                      formik.touched.birthday && formik.errors.birthday
                        ? "input-box"
                        : "input-box mb-4"
                    }
                  >
                    <input
                      id="birthday2"
                      type="date"
                      className={
                        formik.touched.birthday && formik.errors.birthday
                          ? " border-warn input-register bg-warn"
                          : "input-register"
                      }
                      placeholder={
                        formik.isValid || formik.errors.birthday
                          ? "Ngày sinh:"
                          : ""
                      }
                      name="birthday"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.birthday && formik.errors.birthday && (
                      <div className="text-danger">
                        {formik.errors.birthday}
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      formik.touched.address && formik.errors.address
                        ? "input-box"
                        : "input-box mb-4"
                    }
                  >
                    <input
                      type="text"
                      className={
                        formik.touched.address && formik.errors.address
                          ? " border-warn input-register bg-warn"
                          : "input-register"
                      }
                      placeholder="Địa chỉ"
                      name="address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className="text-danger">{formik.errors.address}</div>
                    )}
                  </div>
                </div>
                <div className="gender">
                  <span style={{ color: "#721919" }} className="gender-title">
                    Giới tính
                    <i
                      style={{ color: "#721919" }}
                      className="fas fa-question-circle ml-1"
                    ></i>
                  </span>
                  <div className="category">
                    <label className="gender-detail">
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="true"
                        checked
                        onChange={formik.handleChange}
                      />
                      <span className="gender-otp">Nam</span>
                    </label>
                    <label className="gender-detail">
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="false"
                        onChange={formik.handleChange}
                      />
                      <span className="gender-otp">Nữ</span>
                    </label>
                  </div>
                </div>
                {successMsg !== "" && (
                  <div
                    style={{ color: "green" }}
                    className="alert alert-success mb-4 mt-2"
                  >
                    <i className="fas fa-check mr-2"></i>
                    {successMsg}
                  </div>
                )}
                <button type="submit" className="button-register">
                  Đăng ký
                </button>

                <div className="option">Hoặc</div>
              </form>

              <div className="fblink">
                <p className="loginwith">Đăng ký với</p>
                <a href="https://www.facebook.com/">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://www.google.com/">
                  <i className="fab fa-google"></i>
                </a>
                <a href="https://www.apple.com/">
                  <i className="fab fa-apple"></i>
                </a>
              </div>
              <div className="alreadyacc">
                <p className="haveacc">
                  Bạn đã có tài khoản?
                  <NavLink className="loginlink" to="/loginpage">
                    Đăng nhập
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

