import { applyMiddleware, combineReducers, createStore } from "redux";
import { QuanLyViTriReducer } from "./QuanLyViTriReducer";
import { DanhSachPhongReducer } from "./DanhSachPhongReducer";
import { DanhSachNguoiDungReducer } from "./DanhSachNguoiDungReducer";
import { QuanLyNguoiDungReducer } from "./QuanlyNguoiDungReducer";
import { ChiTietThongTinNguoiDungReducer } from "./ChiTietThongTinNguoiDungReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  //state ứng dụng
  QuanLyViTriReducer,
  DanhSachPhongReducer,
  QuanLyNguoiDungReducer,
  DanhSachNguoiDungReducer,
  ChiTietThongTinNguoiDungReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
