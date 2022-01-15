import { DANH_SACH_PHONG } from "../actions/types/DanhSachPhongTypes";
import { CHI_TIET_PHONG } from "../actions/types/ChiTietPhongTypes";
import { SET_THONG_TIN_PHONG } from "../actions/types/LayThongTinPhongTypes";
const stateDefault = {
  arrDanhSachPhong: [],
  chiTietPhong: {},
  thongTinPhong: {},
};

export const DanhSachPhongReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANH_SACH_PHONG: {
      return {
        ...state,
        arrDanhSachPhong: action.arrDanhSachPhong,
      };
    }
    case CHI_TIET_PHONG: {
      return {
        ...state,
        chiTietPhong: action.chiTietPhong,
      };
    }
    case SET_THONG_TIN_PHONG: {
      return { ...state, thongTinPhong: action.thongTinPhong };
    }
    default:
      return { ...state };
  }
};
