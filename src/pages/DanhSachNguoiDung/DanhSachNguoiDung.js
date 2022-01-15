import React from "react";

import { useEffect, useState } from "react";
import { getListUser } from "../../redux/actions/DanhSachNguoiDungAction";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./DanhSachNguoiDung.css";
import "./Modal.css";
import "../../pages/Register/Register.css";

import { capNhatNguoiDung } from "../../redux/actions/CapNhatNguoiDungAction";
// import { isAuthenticated } from "../../auth/index";
import { XoaNguoiDung } from "../../redux/actions/XoaNguoiDungAction";
import { Header } from "antd/lib/layout/layout";
import { themNguoiDung } from "../../redux/actions/ThemNguoiDungAction";

export default function DanhSachNguoiDung() {
  const { listUser } = useSelector((state) => state.DanhSachNguoiDungReducer);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(-2);
  const [values, setValues] = useState({
    name: "",
    gender: "",
    email: "",
    birthday: "",
    address: "",
    phone: "",
    id: "",
    password: "",
    type: "",
    error: "",
  });

  const {
    name,
    gender,
    email,
    birthday,
    address,
    phone,
    id,
    password,
    type,
    error,
  } = values;

  const handleChange = (name) => (event) => {
    const value =
      name === "gender"
        ? event.target.value === "true"
          ? true
          : false
        : event.target.value;
    setValues({ ...values, [name]: value, error: "" });
  };
  const isValid = (number) => {
    let patternName =
      new RegExp(`^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$`);

    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let patternPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    let patternPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (
      name.trim() === "" ||
      address.trim() === "" ||
      password.trim() === "" ||
      phone.trim() === "" ||
      password.trim() === ""
    ) {
      setValues({
        ...values,
        error: "Vui lòng không để trống các trường",
      });
      return false;
    }

    if (!patternEmail.test(email.trim())) {
      setValues({
        ...values,
        error: "Email không đúng định dạng",
      });
      return false;
    }

    if (!patternName.test(name.trim())) {
      setValues({
        ...values,
        error: "Tên không đúng định dạng",
      });
      return false;
    }
    if (!patternPhone.test(phone.trim())) {
      setValues({
        ...values,
        error: "Số điện thoại không đúng định dạng",
      });
      return false;
    }

    if (number === -1) {
      if (!patternPass.test(password.trim())) {
        setValues({
          ...values,
          error: "Mật khẩu tối thiểu 6 ký tự, ít nhất một chữ cái và một số",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (event, number) => {
    event.preventDefault();
    if (isValid(number)) {
      if (number === -1) {
        // console.log("dang ky");
        const action = themNguoiDung(values);
        dispatch(action);
        return window.location.reload();
      } else {
        const action = capNhatNguoiDung(values, id);
        dispatch(action);
      }
      setIndex(-1);
      return window.location.reload();
    }
  };

  const showErrorValidation = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const deleteConfirmed = (index) => {
    let answer = window.confirm("Bạn chắc chắn muốn xóa người dùng ?");
    if (answer) {
      dispatch(XoaNguoiDung(listUser[index]._id));
    }
  };

  useEffect(() => {
    const action = getListUser();
    dispatch(action);
  }, [dispatch]);
  // console.log(gender);

  useEffect(() => {
    // if (index >= 0) {
    const tempName = (listUser[index] && listUser[index].name) || "";
    const tempGender = (listUser[index] && listUser[index].gender) || false;
    const tempEmail = (listUser[index] && listUser[index].email) || "";
    const tempBirthday = (listUser[index] && listUser[index].birthday) || "";
    const tempAddress = (listUser[index] && listUser[index].address) || "";
    const tempPhone = (listUser[index] && listUser[index].phone) || "";
    const tempId = (listUser[index] && listUser[index]._id) || "";
    const tempPass = (listUser[index] && listUser[index].password) || "";
    const tempType = (listUser[index] && listUser[index].type) || "CLIENT";
    // console.log(JSON.stringify(tempId));

    setValues({
      ...values,
      name: tempName,
      gender: tempGender,
      email: tempEmail,
      birthday: tempBirthday,
      address: tempAddress,
      phone: tempPhone,
      id: tempId,
      password: tempPass,
      type: tempType,
      error: "",
    });
    // }
  }, [index]);

  const renderListUser = () => {
    return listUser.map((user, index) => {
      return (
        <tr className="tr" key={index}>
          <td  data-label="#" className="font-weight-bold td">
            {index + 1}
          </td>

          <td className="td" data-label="Tên">{user.name}</td>
          <td className="td" data-label="Giới tính">{user.gender === true ? "Nam" : "Nữ"}</td>
          <td className="td" data-label="Ngày sinh">
            {moment(user.birthday).format("DD/MM/YYYY")}
          </td>

          <td className="td" data-label="Email">{user.email}</td>
          <td className="td" data-label="Loại N.dùng">{user.type}</td>
          <td className="td" data-label=" Địa chỉ ">{user.address}</td>
          <td className="td" data-label="Số điện thoại">{user.phone}</td>
          <td  data-label="Tùy chọn" className="d-flex flex-row  justify-content-center">
            <button
              data-toggle="modal"
              data-target="#myModal"
              onClick={() => setIndex(index)}
              className="btn btn-success mx-1"
            >
              Sửa
            </button>
            <button
              className="btn btn-danger mx-1"
              onClick={() => deleteConfirmed(index)}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  const viewDetail = (number) => {
    if (number >= -1) {
      return (
        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="card-header">
                <h2 id="header-title">
                  {number === -1 ? "Thêm" : "Cập nhật"} người dùng
                </h2>
              </div>
              {/* Modal Header */}

              {/* Modal body */}
              <div className="modal-body">
                <form
                  id="form-update1"
                  onSubmit={(e) => handleSubmit(e, number)}
                >
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-address-book" />
                        </span>
                      </div>
                      <input
                        type="name"
                        name="name"
                        id="name"
                        className="form-control input-sm"
                        placeholder="Họ và tên"
                        onChange={handleChange("name")}
                        value={name}
                      />
                    </div>
                    <span className="sp-thongbao" id="tbTen" />
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-envelope" />
                        </span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control input-sm"
                        placeholder="Email"
                        onChange={handleChange("email")}
                        value={email}
                      />
                    </div>
                  </div>

                  {number === -1 ? (
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-key" />
                          </span>
                        </div>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control input-sm"
                          placeholder="Mật khẩu"
                          onChange={handleChange("password")}
                          value={password}
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-calendar" />
                        </span>
                      </div>
                      <input
                        type="date"
                        name="birthday"
                        id="birthday1"
                        className="form-control textbox-n"
                        onChange={handleChange("birthday")}
                        placeholder="Ngày sinh : "
                        value={moment(birthday).format("YYYY-MM-DD")}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i
                            className="fa fa-map-marked-alt"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <input
                        onChange={handleChange("address")}
                        type="text"
                        name="address"
                        id="address"
                        className="form-control input-sm"
                        placeholder="Địa chỉ"
                        // value={listUser[index] && listUser[index].address}
                        value={address}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          {/* <i className="fa fa-briefcase" /> */}
                          <i className="fa fa-phone"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={handleChange("phone")}
                        className="form-control input-sm"
                        placeholder="Số điện thoại"
                        // value={listUser[index] && listUser[index].phone}
                        value={phone}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-venus-mars"></i>
                        </span>
                      </div>
                      <div className="form-control input-sm">
                        <span>Giới tính</span>
                      </div>
                    </div>
                    <div className="category">
                      <label className="gender-detail">
                        <input
                          type="radio"
                          name="gender"
                          value="true"
                          checked={`${gender === true ? "checked" : ""}`}
                          onChange={handleChange("gender")}
                          // checked
                        />
                        <span className="gender-otp">Nam</span>
                      </label>
                      <label className="gender-detail">
                        <input
                          type="radio"
                          name="gender"
                          value="false"
                          checked={`${gender === false ? "checked" : ""}`}
                          onChange={handleChange("gender")}
                        />
                        <span className="gender-otp">Nữ</span>
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-users-cog"></i>
                        </span>
                      </div>
                      <div className="form-control input-sm">
                        <span>Loại người dùng</span>
                      </div>
                    </div>
                    <div className="category-type">
                      <label className="type-detail">
                        <input
                          type="radio"
                          name="type"
                          value="CLIENT"
                          checked={`${type === "CLIENT" ? "checked" : ""}`}
                          onChange={handleChange("type")}
                        />
                        <span className="type-otp">Khách hàng</span>
                      </label>
                      <label className="type-detail">
                        <input
                          type="radio"
                          name="type"
                          value="ADMIN"
                          checked={`${type === "ADMIN" ? "checked" : ""}`}
                          onChange={handleChange("type")}
                        />
                        <span className="type-otp">Quản trị</span>
                      </label>
                    </div>
                  </div>
                  {showErrorValidation()}
                  <div className="modal-footer" id="modal-footer">
                    <button
                      id="btnCapNhat"
                      type="submit"
                      className="btn btn-success"
                    >
                      {number === -1 ? "Thêm" : "Cập nhật"}
                    </button>
                    {/* data-dismiss="modal" */}
                    <button
                      id="btnDong"
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={() => setIndex(-2)}
                    >
                      Đóng
                    </button>
                  </div>
                </form>
              </div>
              {/* Modal footer */}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container">
      {/* <Header /> */}
      <div className="row">
        <div className="col-12">
          <div className="card table_listuser">
            <div className="card-header d-flex justify-content-around">
              <h3>Danh sách người dùng</h3>

              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#myModal"
                onClick={() => setIndex(-1)}
              >
                Thêm Người dùng
              </button>
            </div>
            <div className="my-4">
              <div className="col">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="tìm nhân viên"
                    id="searchUser"
                  />
                  <div className="input-group-prepend" id="search-email">
                    <span className="input-group-text" id="btnTimUser">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-hover ">
              <thead className="thead">
                <tr className="tr">
                  <th className="th">#</th>
                  <th className="th">Tên</th>
                  <th className="th">Giới tính</th>
                  <th className="th">Ngày sinh</th>
                  <th className="th" >Email</th>
                  <th className="th">Loại N.dùng</th>
                  <th className="th">Địa chỉ</th>
                  <th className="th">Số điện thoại</th>
                  <th className="th">Tùy chọn</th>
                </tr>
              </thead>
              <tbody className="tbody">{renderListUser()}</tbody>
            </table>
          </div>
        </div>
      </div>

      {/* The Modal */}

      {/* {index} */}
      {viewDetail(index)}
    </div>
  );
}