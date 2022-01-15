import { DANH_SACH_PHONG } from "./types/DanhSachPhongTypes";
import { CHI_TIET_PHONG } from "./types/ChiTietPhongTypes";
import { SET_THONG_TIN_PHONG } from "./types/LayThongTinPhongTypes";
import { history } from "../../App";
import { http } from "../../util/setting";
export const getRoomsAction = () => {
  return async (dispatch) => {
    try {
      let result = await http.get(`/api/rooms`);
      dispatch({
        type: DANH_SACH_PHONG,
        arrDanhSachPhong: result.data,
      });
    } catch (errors) {
      console.log(`errors`, errors.res?.data);
    }
  };
};
export const getDetailRoomsAction = (maPhong) => {
  return async (dispatch) => {
    try {
      let result = await http.get(`/api/rooms/${maPhong}`);
      dispatch({
        type: CHI_TIET_PHONG,
        chiTietPhong: result.data,
      });
      console.log(`result`, result.data);
    } catch (errors) {
      console.log(`errors`, errors.res?.data);
    }
  };
};
//Thêm phòng
export const addRoomsAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await http.post(`/api/rooms`, formData);
      alert("Thêm phòng thành công");
      console.log(`result`, result.data);
      // dispatch(getRoomsAction())
      history.push("/thongtinphong",formData);
    } catch (errors) {
      console.log(`errors`, errors.res?.data);
    }
  };
};
//update thông tin phòng
export const getInfoRoomAction = (maPhong) => {
  return async (dispatch) => {
    try {
      let result = await http.get(`/api/rooms/${maPhong}`);
      dispatch({
        type: SET_THONG_TIN_PHONG,
        thongTinPhong: result.data,
      });
    } catch (errors) {
      console.log(`errors`, errors.res?.data);
    }
  };
};
export const updateRoomAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await http.post(`/api/rooms/`, formData);
      console.log(result)
      alert("Cập nhật phòng thành công");
      dispatch(getRoomsAction());
      history.push("/thongtinphong", formData);
    } catch (errors) {
      console.log(`errors`, errors.res?.data);
    }
  };
};
//xóa phòng
export const deleteRoomAction = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.delete(`/api/rooms/${id}`);
      console.log(result)
      alert("Xóa phòng thành công");
      dispatch(getRoomsAction());
      history.push("/thongtinphong",);
    } catch (errors) {
      console.log(`errors`, errors.res?.data);
    }
  };
};
