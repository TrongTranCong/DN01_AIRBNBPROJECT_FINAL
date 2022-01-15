import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocationAction } from "../../../../redux/actions/QuanLyViTriActions";
import { isAuthenticated, signout } from "../../../../auth";
// import { history } from "../../../../App";
import "./Header.css";
//antd
import { DatePicker, Space } from "antd";
import moment from "moment";
import { useFormik } from "formik";
export default function Header(props) {
  const { arrLocations } = useSelector((state) => state.QuanLyViTriReducer);
  console.log(`arrLocations`, arrLocations);
  //lấy thông tin users
  const formik = useFormik({
    initialValues: {
      location: "",
      checkIn: "",
      checkOut: "",
      guests: "",
    },
    onSubmit: (values) => {
      console.log(`values`, values);
    },
  });

  const handleClickSearch = () => {
    if (location === "") {
      alert("Vui lòng chọn địa điểm");
      return false;
    }
    //gửi lên reducer
    const action = {
      type: "GET_INFO_SEARCH",
      payload: formik.values,
    };
    // console.log(`action`, action)
    dispatch(action);
    history.push(`/danhsachphong?location=${location}`, formik.values);
  };

  const handleChangeDateIn = (date) => {
    let checkIn = moment(date).format("DD/MM/YYYY");
    console.log(`checkIn`, checkIn);
    //fill value vào formik
    formik.setFieldValue("checkIn", checkIn);
  };
  const handleChangeDateOut = (date) => {
    let checkOut = moment(date).format("DD/MM/YYYY");
    console.log(`checkOut`, checkOut);
    //fill value vào formik
    formik.setFieldValue("checkOut", checkOut);
  };

  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocationAction());
  }, [dispatch]);

  const handleChange = (e) => {
    let inputVal = e.target.value.trim();
    let suggest = [];
    if (inputVal.length > 0) {
      suggest = arrLocations.filter((loc) => {
        const regexString = new RegExp(`${inputVal}`, "gi");
        return loc?.province?.toLowerCase()?.match(regexString);
      });
    }
    setSuggestions(suggest);
    setLocation(inputVal);
  };
  const handleSuggest = (location) => {
    setLocation(location);
    setSuggestions([]);
    formik.setFieldValue("location", location);
  };
  const history = useHistory();

  //   // history.push(`/danhsachphong?location=${location}`);

  //Scrolling
  const [scroll, setScroll] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  });
  const handleOnScroll = (e) => {
    // let search = document.querySelector("form");
    let navbar = document.querySelector("nav");
    let winScroll = window.scrollY;

    if (winScroll >= 100) {
      scroll && setScroll(false) && { navbar }.hide();
    } else {
      setScroll(true);
    }
  };

  return (
    <header className="px-0" id="header">
      {scroll && (
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ padding: "0 5rem" }}
        >
          <a className="navbar-brand" href="/">
            <div className="d-flex mx-0 align-items-center">
              <div>
                <i className="fab fa-airbnb" style={{ fontSize: "1.8rem" }}></i>
              </div>
              <div className="font-weight-bold">airbnb</div>
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav ">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Nơi ở <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#">
                  Trải nghiệm
                </a>
              </li>
              <li className="nav-item mr-2 ">
                <a className="nav-link" href="#">
                  Trải nghiệm trực tuyến
                </a>
              </li>
              <li>
                <div className=" dropdown active  ">
                  <a
                    className="nav-link"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div
                      className="row align-content-center login"
                      style={{ borderRadius: "1.25rem" }}
                    >
                      {isAuthenticated() ? (
                        <div>
                          <img
                            style={({ height: "25px" }, { width: "25px" })}
                            src={isAuthenticated().avatar}
                            alt=""
                          />
                          <span>{isAuthenticated().name}</span>
                        </div>
                      ) : (
                        <i className="fa fa-user-circle"></i>
                      )}
                    </div>
                  </a>
                  <div
                    className="dropdown-menu"
                    style={{ left: "-65px" }}
                    aria-labelledby="navbarDropdown"
                  >
                    {isAuthenticated() ? (
                      <>
                        <NavLink className="dropdown-item" to="/user/dashboard">
                          Thông tin cá nhân
                        </NavLink>
                        <NavLink
                          className="dropdown-item"
                          onClick={() => signout(() => {})}
                          to="/"
                        >
                          Đăng xuất
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink
                          className="dropdown-item font-weight-bold"
                          to="/register"
                        >
                          Đăng ký
                        </NavLink>
                        <NavLink className="dropdown-item" to="/loginpage">
                          Đăng nhập
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav text-danger">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Nơi ở <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#">
                  Trải nghiệm
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#">
                  Trải nghiệm trực tuyến
                </a>
              </li>
            </ul>
          </div> */}
        </nav>
      )}

      <div className="container mt-2">
        <form className="searchForm my-0 p-0" onSubmit={formik.handleSubmit}>
          <div className="flex-container d-flex mx-0 font-weight-bold">
            <div className="col-3">
              <label className="mt-2" style={{ marginLeft: "15px" }}>
                Địa điểm
              </label>
              <input
                // autoComplete="off"
                type="search"
                className="form-control border-0 p-0"
                style={{
                  // width: "80%",
                  marginTop: -7,
                  marginLeft: 15,
                  fontSize: 14,
                  backgroundColor: "transparent",
                }}
                // id="location"
                placeholder="Bạn sắp đi đâu?"
                onChange={handleChange}
                value={location}
              />


            </div>

            <div className="col-5 d-flex">
              <div className="col-6">
                <label className="mt-2 ">Nhận phòng</label>
                <div>
                  <Space direction="vertical">
                    <DatePicker
                      style={{
                        paddingTop: 0,
                        paddingRight: 11,
                        paddingLeft: 0,
                        paddingBottom: 4,
                        background: 0,
                        border: 0,
                      }}
                      name="checkIn"
                      onChange={handleChangeDateIn}
                      format="DD-MM-YYYY"
                    />
                  </Space>
                </div>
              </div>
              <div className="col-6 ">
                <label className="mt-2 ">Trả phòng</label>
                <div>
                  <Space direction="vertical">
                    <DatePicker
                      style={{
                        paddingTop: 0,
                        paddingRight: 11,
                        paddingLeft: 0,
                        paddingBottom: 4,
                        background: 0,
                        border: 0,
                      }}
                      onChange={handleChangeDateOut}
                      format="DD-MM-YYYY"
                    />
                  </Space>
                </div>
              </div>
            </div>

            <div className="col-4 d-flex align-item-center  ">
              <div className="col-7">
                <label className="mt-2">Khách</label>
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control border-0 p-0 h-0"
                  style={{
                    width: "100%",
                    marginTop: -7,
                    fontSize: 14,
                    background: "transparent",
                  }}
                  name="guests"
                  placeholder="Thêm khách"
                  onChange={formik.handleChange}
                />
                <button className="clearInput" type="reset">
                  &times;
                </button>
              </div>
              <div className="col-5">
                <button
                  type="submit"
                  className="btn-danger"
                  onClick={handleClickSearch}
                  style={{
                    width: 80,
                    height: 40,
                    marginTop: 12,
                    marginLeft:-16,
                    borderRadius: 20,
                  }}
                >
                  <div
                    style={{
                      paddingLeft: 3,
                      paddingTop: 3,
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
        <div
                className="mt-1"
                style={{
                  marginLeft: 206,
                }}
              >
                {suggestions &&
                  suggestions.map((item, index) => {
                    return (
                      <>
                        <li
                          className="list-group-item font-weight-lighter border-0 suggestion"
                          style={{
                            width: "300px",
                            fontSize: "18px",
                          }}
                          key={index}
                          onClick={() => {
                            handleSuggest(item.province);
                          }}
                        >
                          <span className="px-2">
                            <i className="fa fa-map-marker-alt"></i>
                          </span>
                          <span className="suggestion-highlighted">
                            {item.province},{item.country}
                          </span>
                        </li>
                      </>
                    );
                  })}
              </div>
      </div>
    </header>
  );
}
