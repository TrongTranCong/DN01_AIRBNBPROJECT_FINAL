import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addRoomsAction,
  getDetailRoomsAction,
} from "../../../redux/actions/DanhSachPhongActions";
import { history } from "../../../App";
export default function ThemPhong(props) {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      maPhong: "",
      name: "",
      guests: "",
      bedRoom: 2,
      bath: 2,
      description: "",
      price: "",
      elevator: false,
      hotTub: true,
      pool: true,
      indoorFireplace: false,
      dryer: true,
      gym: false,
      kitchen: true,
      wifi: true,
      heaating: true,
      cableTV: true,
      // hinhAnh: {},
      locationId: null,
    },
    onSubmit: (values) => {
      console.log(`values`, values);

      //Tạo đôi tượng formData (formData bảo mật nên log ra nó ko thấy dữ liệu)
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      // console.log(`formData`, formData.get("File")); //phải sử dụng hàm get() mới hiển thị được giá trị
      //Gọi api gửi các giá trị của formData về backend xử lý
      const action = addRoomsAction(formData);
      dispatch(action);
    },
  });

  const handleChangeFile = (e) => {
    //Lay file tu e
    let file = e.target.files[0]; //files có thể lấy nhiều file nhưng file[0] chỉ lấy file đầu tiên
    if (
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      // console.log(`file`, file);
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file); //đọc file trả ra URL
      reader.onload = (e) => {
        //onload() bắt cái URL đó
        // console.log(`reader`, e.target.result);
        setImgSrc(e.target.result);
      };
      //Đem dữ liệu lưu vào formik
      formik.setFieldValue("hinhAnh", file);
    }
  };
  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Thêm Phòng
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="needs-validation"
              id="roomForm"
              onSubmit={formik.handleSubmit}
            >
              <div className="row">
                <p id="textID" />
                <div className="col-md-6 mb-3">
                  <label htmlFor="maPhong">Mã phòng</label>
                  <input
                    name="maPhong"
                    type="text"
                    className="form-control"
                    placeholder="Nhập mã phòng"
                    required
                    onChange={formik.handleChange}
                  />
                  <div id="invalidTen" className="invalid-form"></div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="tenPhong">Tên phòng</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên phòng"
                    required
                    onChange={formik.handleChange}
                  />
                  <div id="invalidTen" className="invalid-form"></div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="giaPhong">Giá phòng</label>
                  <input
                    name="price"
                    type="text"
                    className="form-control"
                    placeholder="Nhập giá"
                    required
                    onChange={formik.handleChange}
                  />
                  <div id="invalidGia" className="invalid-feedback"></div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="guests">Khach tối đa</label>
                  <input
                    name="guests"
                    type="number"
                    className="form-control"
                    placeholder="Nhập số lượng khách tối đa"
                    required
                    onChange={formik.handleChange}
                  />
                  <div id="invalidKM" className="invalid-feedback"></div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="viTri">Vị trí</label>
                  <input
                    name="locationId"
                    type="text"
                    className="form-control"
                    placeholder="Nhập vị trí"
                    required
                    onChange={formik.handleChange}
                  />
                  <div id="invalidTT" className="invalid-feedback"></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label htmlFor="hinhPhong">Hình ảnh</label>

                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control-file"
                      accept="image/jpeg, image/png, image/gif, image/jpg"
                      onChange={handleChangeFile}
                    />
                    <img
                      style={{ width: 100, height: 100, marginTop: 15 }}
                      src={imgSrc}
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="moTa">Mô Tả</label>
                <textarea
                  name="description"
                  className="form-control"
                  id="moTa"
                  rows={3}
                  onChange={formik.handleChange}
                />
                <div id="invalidMoTa" className="invalid-form"></div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-warning"
                  id="btnThemMon"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
