import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getRoomsAction } from "../../redux/actions/DanhSachPhongActions";
import "./DanhSachPhong.css";
//thư viện antdesign
export default function DanhSachPhong(props) {
  const { arrDanhSachPhong } = useSelector(
    (state) => state.DanhSachPhongReducer
  );
  // const { getInfo } = useSelector((state) => state.QuanLyViTriReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomsAction());
  }, [dispatch]);

  const search = useLocation().search;
  const location = new URLSearchParams(search).get("location");

  // const days = `Ngày ${getInfo.checkIn} - Ngày ${getInfo.checkOut}`;
  // const guest = `${getInfo.guests} khách`;
  const count = arrDanhSachPhong.filter(
    (loc) => loc.locationId != null && loc.locationId.province === location
  ).length;

  const renderDanhSachPhong = () => {
    return arrDanhSachPhong
      .filter(
        (item) =>
          item.locationId != null && item.locationId.province === location
      )
      .map((room, index) => {
        return (
          <>
            <div className="col-lg-8 py-3 border-bottom" key={index}>
              <NavLink to={`/chitietphong/${room._id}`}>
                <img
                  className="w-100"
                  style={{ borderRadius: "15px" }}
                  src={room.image}
                  alt={room.name}
                />
              </NavLink>
            </div>
            <div className="col-lg-4 border-bottom">
              <div className="mt-2">
                <div className="card-body" style={{ padding: "0.25rem 1rem" }}>
                  <h5 className="card-title">
                    <NavLink to={`/chitietphong/${room._id}`}>
                      {room.name}
                    </NavLink>
                  </h5>
                  <NavLink
                    to={`/chitietphong/${room._id}`}
                    className="card-text border-top"
                  >
                    {room.guests} khách -{room.bedRoom} giường ngủ - {room.bath}{" "}
                    phòng tắm{room.wifi ? "- Wifi" : ""}
                    {room.kitchen ? "- Bếp" : ""}
                    {room.dryer ? "- Máy sấy" : ""}
                  </NavLink>

                  <p
                    className="price-BnB card-text font-weight-bold"
                    style={{}}
                  >
                    {room.price.toLocaleString()}VNĐ/đêm
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <div className="">
              <i
                className="fab fa-airbnb"
                style={{
                  fontSize: "2.5rem",
                  color: "rgb(255, 56, 92)",
                }}
              ></i>
            </div>
            <h3 style={{ color: "rgb(255, 56, 92)" }}>airBnb</h3>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Tìm kiếm"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      <div className="container my-3">
        <h5 style={{ fontWeight: "lighter", marginLeft: "15px" }}>
          Có {count} chỗ bạn chọn tại {location}
        </h5>
        <h3 className="mx-3">Chỗ ở khu vực bạn đã chọn</h3>
        <div className="container">
          <div className="card mb-3 border-0">
            <div className="flex-container row no-gutters">
              {renderDanhSachPhong()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
