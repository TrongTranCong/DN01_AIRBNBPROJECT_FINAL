import React from "react";
import { useLocation } from "react-router-dom";
export default function Payment(props) {
  const state = useLocation().state;
  console.log(`state`, state);
  const [checkRoomDays, guests, baby, days, money, { chiTietPhong }] = state;
  return (
    <div>
      <div className="border-bottom">
        <a className="navbar-brand ml-5 py-3" href="/">
          <div
            className="d-flex align-items-center"
            style={{
              fontSize: "1.7rem",
              color: "rgb(255, 56, 92)",
              fontWeight: "bold",
            }}
          >
            <div>
              <i className="fab fa-airbnb"></i>
            </div>
            <div>airbnb</div>
          </div>
        </a>
      </div>
      <div className="px-5 my-5">
        <span style={{ fontSize: "1.7rem", cursor: "pointer" }}>
          <i className="fa fa-angle-left"></i>
        </span>
        <span
          className="px-3"
          style={{ fontSize: "1.7rem", fontWeight: "bold" }}
        >
          Xác nhận và thanh toán
        </span>
        <h4 className="my-3">Chuyến đi của bạn</h4>
        <div className="row">
          <div className="col-lg-7">
            <div className="d-flex px-0 py-2">
              <div className="col-6 p-0">
                <h5>Ngày</h5>
                <p>{checkRoomDays}</p>
              </div>
              <div className="col-6 p-0">
                <h5 className=" btn-link" style={{ cursor: "pointer" }}>
                  Chỉnh sửa
                </h5>
              </div>
            </div>
            <div className="d-flex px-0 py-2">
              <div className="col-6 p-0">
                <h5>Khách</h5>
                <p>
                  {guests} khách, {baby} em bé
                </p>
              </div>
              <div className="col-6 p-0">
                <h5 className=" btn-link" style={{ cursor: "pointer" }}>
                  Chỉnh sửa
                </h5>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card p-3">
              <div className="d-flex border-bottom pb-3">
                <img
                  src={chiTietPhong.image}
                  className="card-img-top w-50 rounded"
                  alt="..."
                />
                <p className="px-2">{chiTietPhong.name}</p>
              </div>

              <div className="card-body ">
                <h5 className="card-title">Chi tiết giá </h5>
                <p>
                  VNĐ {chiTietPhong.price.toLocaleString()} x {days} đêm
                </p>
                <p className="card-text">Tổng: {money.toLocaleString()} VNĐ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
