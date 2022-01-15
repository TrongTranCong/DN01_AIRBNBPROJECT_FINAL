import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { history } from "../../App";
import {
  getRoomsAction,
  // getDetailRoomsAction,
  // addRoomsAction,
  deleteRoomAction,
} from "../../redux/actions/DanhSachPhongActions";
import { NavLink } from "react-router-dom";
import "./ThongTinPhong.css";

export default function ThongTinPhong(props) {
  // const location = useLocation();
  // console.log(`location`, location);
  // const history = useHistory();
  // console.log(`history`, history);
  const { arrDanhSachPhong } = useSelector(
    (state) => state.DanhSachPhongReducer
  );
  // console.log(`arrDanhSachPhong`, arrDanhSachPhong);
  const dispatch = useDispatch();
  const arrDanhSachPhongDefault = arrDanhSachPhong.filter(
    (item) => item.locationId != null
  );
  // console.log(`arrDanhSachPhongDefault`, arrDanhSachPhongDefault);

  useEffect(() => {
    dispatch(getRoomsAction());
  }, [dispatch]);

  // const history=useHistory();
  const renderDanhSachPhong = () => {
    return arrDanhSachPhongDefault.map((room, index) => {
      return (
        <tr key={index}>
          <td className="font-weight-bold">#{index + 1}</td>
          <td>{room.name}</td>
          <td>
            <img className="hinhAnhRoom" src={room.image} alt="" />
          </td>
          <td>{room.locationId.province}</td>

          <td>{room.guests}</td>
          <td className="d-flex flex-row">
            <NavLink
              to={`/thongtinphong/updateroom/${room._id}`}
              data-toggle="modal"
              data-target="#exampleModal"
              className="btn btn-success mx-1"
            >
              Xem
            </NavLink>
            <button
              className="btn btn-danger mx-1"
              onClick={() => {
                //Gọi action xóa
                if (window.confirm("Bạn có chắc muốn xóa phòng" + room.name)) {
                  //Gọi action
                  dispatch(deleteRoomAction(room._id));
                }
              }}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <main role="main" className="col-lg-12 px-md-4">
            <h2>Danh Sách Thông Tin Phòng</h2>

            <div className="row">
              <div className="col-8">
                <NavLink
                  to="/thongtinphong/themphong"
                  id="btnThem"
                  type="button"
                  className="btn btn-warning mb-3 text-white"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    history.push("/thongtinphong/themphong");
                  }}
                >
                  Thêm phòng
                </NavLink>
              </div>
            </div>
            
            <div className="table-responsive roomTable">
              <table className="table table-striped table-sm">
                <thead>
                  <tr className="bg-warning text-white">
                    <th>ID</th>
                    <th>Tên phòng</th>
                    <th>Hình ảnh</th>
                    <th>Vị trí</th>
                    <th>Khách</th>
                    <th>Tùy chọn</th>
                  </tr>
                </thead>
                <tbody id="tbodyRoom">{renderDanhSachPhong()}</tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
