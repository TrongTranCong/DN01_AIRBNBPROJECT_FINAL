import React, { Fragment, useEffect, useState } from "react";
import Header from "../../templates/HomeTemplate/Layout/Header/Header";
import { isAuthenticated } from "../../auth/index";
import moment from "moment";
import Footer from "../../templates/HomeTemplate/Layout/Footer/Footer";
import { NavLink } from "react-router-dom";
import DefaultAvatar from "../../assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { capNhatAnhDaiDien } from "../../redux/actions/CapNhatAnhDaiDienAction";
import { thongTinChiTiet } from "../../redux/actions/ThongTinChiTietNguoiDung";
// import { ChiTietThongTinNguoiDungReducer } from "../../redux/reducers/ChiTietThongTinNguoiDungReducer";

export default function ThongTinCaNhan() {
  //   user: { _id, name, email, role, dob, address, phoneNumber },
  // } = isAuthenticated();
  // const [user, setUser] = useState({});
  const { user } = useSelector(
    (state) => state.ChiTietThongTinNguoiDungReducer
  );
  // console.log(user);

  const [values, setValues] = useState({
    formData: new FormData(),
  });

  const {
    name,
    email,
    password,
    phone,
    birthday,
    gender,
    address,
    type,
    avatar,
  } = user;

  const { formData } = values;

  const dispatch = useDispatch();
  const { _id } = isAuthenticated();
  // console.log(isAuthenticated()._id);

  const handleChange = (name) => (event) => {
    const value =
      name === "avatar" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    dispatch(capNhatAnhDaiDien(formData));
  };

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Quản Trị</h4>
        <ul className="list-group">
          {type && type !== "CLIENT" && (
            <>
              <li className="list-group-item">
                <NavLink className="nav-link" to="/getlistuser">
                  Người dùng quản lý
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink className="nav-link" to="/thongtinphong">
                  Quản lý thông tin phòng
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Thông tin cá nhân</h3>
        <ul className="list-group">
          <li className="list-group-item">Tên :{name} </li>
          <li className="list-group-item">Email :{email} </li>
          {
            <li className="list-group-item">
              Ngày sinh : {moment(birthday).format("DD/MM/YYYY")}
            </li>
          }
          {<li className="list-group-item">Địa chỉ :{address} </li>}
          {<li className="list-group-item">Số điện thoại :{phone} </li>}
          {
            <li className="list-group-item">
              Loại người dùng : {type === "CLIENT" ? "Khách hàng" : "Quản trị"}
            </li>
          }
        </ul>
      </div>
    );
  };
  useEffect(() => {
    const action = thongTinChiTiet(_id);
    dispatch(action);
    // console.log(infoUser);
  }, [dispatch]);

  // const loadProfile = (userId) => {
  //   read(userId).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       // console.log(data);
  //       setUser(data);
  //     }
  //   });
  // };

  // useEffect(
  //   () => {
  //     loadProfile(_id);
  //   },
  //   // eslint-disable-next-line
  //   []
  // );

  const userAvatar = () => {
    const photoUrl = avatar && avatar.length !== 0 ? avatar : DefaultAvatar;
    return (
      <div className="card mb-5">
        <h3 className="card-header">Ảnh đại diện</h3>
        <img
          style={{ height: "250px", width: "auto" }}
          className="img-thumbnail rounded border border-primary"
          src={photoUrl}
          onError={(i) => (i.target.src = `${DefaultAvatar}`)}
          alt={name}
        />

        <form onSubmit={clickSubmit}>
          <div className="form-group">
            <label className="btn btn-secondary">
              <input
                onChange={handleChange("avatar")}
                type="file"
                name="avatar"
                accept="image/*"
              />
            </label>
          </div>

          <button type="submit">Cập nhật ảnh đại diện</button>
        </form>
      </div>
    );
  };

  return (
    <Fragment>
      {/* <Header className="mb-5" /> */}

      <div title="Dashboard" description={`G'day `} className="container ">
        <div className="row">
          <div className="col-lg-4">{userAvatar()}</div>
          <div className="col-lg-8">{adminInfo()}</div>
          <div className="col-lg-4">{adminLinks()}</div>
        </div>
      </div>

      {/* <Footer /> */}
    </Fragment>
  );
}
