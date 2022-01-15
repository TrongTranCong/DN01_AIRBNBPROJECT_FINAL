import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDetailRoomsAction } from "../../redux/actions/DanhSachPhongActions";
import Header from "../../templates/HomeTemplate/Layout/Header/Header";
import { useHistory } from "react-router-dom";
import "./ChiTietPhong.css";

//thư viện antdesign
// import moment from "moment";
import { Rate, Card } from "antd";
// import { useFormik } from "formik";

//thư viện antdesign
// import { Rate, Card } from "antd";

export default function ChiTietPhong(props) {
  const { chiTietPhong } = useSelector((state) => state.DanhSachPhongReducer);
  // console.log(`chiTietPhong`, chiTietPhong);
  const [checkRoom, setCheckRoom] = useState({
    checkIn: new Date().getDate(),
    checkOut: new Date().getDate(),
  });

  const dispatch = useDispatch();
  useEffect(() => {
    let maPhong = props.match.params.id;
    const action = getDetailRoomsAction(maPhong);
    dispatch(action);
  }, [dispatch, props.match.params.id]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setCheckRoom({
      ...checkRoom,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  let checkIn = checkRoom.checkIn;
  let checkRoomIn = `Ngày ${new Date(checkRoom.checkIn).getDate()}`;
  // console.log(`checkRoomIn`, checkRoomIn);
  let checkOut = checkRoom.checkOut;
  let checkRoomOut = `Ngày ${new Date(checkRoom.checkOut).getDate()}`;
  // console.log(`checkRoomOut`, checkRoomOut);
  let checkRoomDays = `${checkRoomIn} - ${checkRoomOut}`;
  let days =
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
    (1000 * 3600 * 24);
  // console.log(`days`, days);
  let money = `${chiTietPhong?.price}` * days;
  // console.log(`money`, money);

  const [adults, setAdults] = useState(2);
  const [childs, setChilds] = useState(0);
  const [infants, setInfants] = useState(0);

  // let guests = adults + childs;
  //useHistory

  const booking = useHistory();
  const handleClickBooking = () => {
    booking.push("/thanhtoan", [
      checkRoomDays,
      adults + childs,
      infants,
      days,
      money,
      { chiTietPhong },
    ]);
  };

  return (
    <Fragment>
      <Header />
      <div className="container" style={{ paddingTop: 190 }}>
        <h3 className="border-top" style={{ textTransform: "uppercase" }}>
          {chiTietPhong?.name}
        </h3>
        <Rate style={{ color: "hotpink" }} />
        <p style={{ display: "inline-block" }}> 4,83 (18 đánh giá)</p>

        <div className="row">
          <div className="col-lg-6">
            <img
              className="img-fluid img-detail"
              src={chiTietPhong?.locationId?.image}
              alt=""
              style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
            />
          </div>

          <div className="col-lg-3 img-detail-center">
            <img
              className="img-fluid img-detail"
              src={chiTietPhong?.image}
              alt=""
            />
          </div>
          <div className="col-lg-3">
            <img
              style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
              className="img-fluid img-detail"
              src="https://picsum.photos/300/200?id"
              alt=""
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-7">
            <Card
              title={
                <div>
                  <span>{chiTietPhong.name}</span>
                  <p className="font-weight-lighter">
                    {chiTietPhong.guests} khách - {chiTietPhong.bedRoom} giường
                    - {chiTietPhong.bath} phòng tắm
                  </p>
                </div>
              }
              extra={
                <a href="/">
                  <span>
                    {chiTietPhong?.locationId?.name},
                    {chiTietPhong?.locationId?.province},
                    {chiTietPhong?.locationId?.country}
                  </span>
                </a>
              }
              style={{ marginTop: 30 }}
            >
              <p>
                <i class="fa fa-hotel"> Toàn bộ phòng</i>
              </p>
              <p>
                <i class="fa fa-sun"> Vệ sinh tăng cường</i>
              </p>
              <p>
                <i class="fa fa-medal"> Khách sạn siêu cấp</i>
              </p>
              <h4 className="border-top py-3">Tiện nghi</h4>
              <div className="row">
                <div className="col-lg-6">
                  <p>
                    {chiTietPhong.wifi ? (
                      <i class="fa fa-person-booth"> Elevator</i>
                    ) : (
                      ""
                    )}
                  </p>
                  <p>
                    {chiTietPhong.pool ? (
                      <i class="fa fa-swimming-pool"> Pool </i>
                    ) : (
                      ""
                    )}
                  </p>
                  <p>
                    {chiTietPhong.bath ? (
                      <i class="fa fa-bath"> Bathroom</i>
                    ) : (
                      ""
                    )}
                  </p>
                  <p>
                    {chiTietPhong.gym ? <i class="fa fa-dumbbell"> Gym</i> : ""}
                  </p>
                </div>
                <div className="col-6">
                  <p>
                    {chiTietPhong.wifi ? <i class="fa fa-wifi"> Wifi </i> : ""}
                  </p>
                  <p>
                    {chiTietPhong.hotTub ? (
                      <i class="fa fa-hot-tub"> Hot-tub</i>
                    ) : (
                      ""
                    )}
                  </p>
                  <p>
                    {chiTietPhong.cableTV ? (
                      <i class="fa fa-tv"> Cable TV</i>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              <div className="border-top py-3">
                <h4>Đánh giá</h4>
                <p>{chiTietPhong.description}</p>
              </div>
            </Card>
          </div>
          <div className="col-lg-5 mt-5">
            <div className="card">
              <div className="card-body">
                <p style={{ fontWeight: "bolder" }}>
                  {chiTietPhong?.price?.toLocaleString()} VNĐ/đêm
                </p>

                <form onSubmit={handleSubmit} className="w-100">
                  {/* style={{ width: 300 }} */}
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputNhanPhong">Nhận phòng</label>
                      <input
                        type="date"
                        className="form-control"
                        style={{ fontSize: 12 }}
                        id="inputNhanPhong"
                        name="checkIn"
                        value={checkIn}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputTraPhong">Trả phòng</label>
                      <input
                        type="date"
                        className="form-control"
                        style={{ fontSize: 12 }}
                        id="inputTraPhong"
                        name="checkOut"
                        value={checkOut}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <label>Khách</label>
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div className="card-header p-0" id="headingOne">
                        <h2 className="mb-0">
                          <div
                            className="btn btn-link btn-block justify-content-between d-flex"
                            style={{ color: "#000" }}
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <p className="">
                              {adults >= 0 &&
                              childs >= 0 &&
                              adults + childs <= chiTietPhong.guests
                                ? `${adults + childs} khách, ${infants} em bé`
                                : "Quá số khách qui định"}
                            </p>
                            <p>
                              <i
                                style={{ marginTop: 5, cursor: "pointer" }}
                                className="fa fa-chevron-down"
                              ></i>
                            </p>
                          </div>
                        </h2>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="my-1">Người lớn</h5>
                              <small>Từ 13 tuổi trở lên</small>
                            </div>
                            <div className="d-flex align-items-center ">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  setAdults(Math.max(adults - 1, 0));
                                }}
                              >
                                -
                              </button>
                              <p className="mx-2 my-1">{adults}</p>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  setAdults(
                                    Math.min(
                                      adults + 1,
                                      `${chiTietPhong.guests}`
                                    )
                                  );
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="my-1">Trẻ em</h5>
                              <small>Độ tuổi 2 -12</small>
                            </div>
                            <div className="d-flex align-items-center ">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  setChilds(Math.max(childs - 1, 0));
                                }}
                              >
                                -
                              </button>
                              <p className="mx-2 my-1">{childs}</p>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  setChilds(
                                    Math.min(
                                      childs + 1,
                                      `${chiTietPhong.guests}`
                                    )
                                  );
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="my-1">Em bé</h5>
                              <small>Dưới 2</small>
                            </div>
                            <div className="d-flex align-items-center ">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  setInfants(Math.max(infants - 1, 0));
                                }}
                              >
                                -
                              </button>
                              <p className="mx-2 my-1">{infants}</p>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  setInfants(infants + 1);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-danger w-100"
                    style={{
                      // width: 285,
                      // width:100 %,
                      height: 35,
                      marginTop: 15,
                    }}
                    onClick={handleClickBooking}
                  >
                    Đặt phòng
                  </button>
                  <div className="d-flex justify-content-between mt-3">
                    <p>
                      VNĐ {chiTietPhong?.price?.toLocaleString()} x {days} đêm
                    </p>
                    <p> VNĐ {money.toLocaleString()}</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
