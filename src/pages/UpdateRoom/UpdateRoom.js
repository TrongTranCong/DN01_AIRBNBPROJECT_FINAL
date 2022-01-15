import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoRoomAction,
  updateRoomAction,
} from "../../../src/redux/actions/DanhSachPhongActions";
export default function UpdateRoom(props) {
  const { thongTinPhong } = useSelector((state) => state.DanhSachPhongReducer);
  // console.log(`thongTinPhong`, thongTinPhong);

  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    
    //Call Api
    dispatch(getInfoRoomAction(id));
  }, [dispatch,props.match.params]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhong: thongTinPhong._id,
      tenPhong: thongTinPhong.name,
      giaPhong: thongTinPhong.price,
      hinhAnh: null,
      viTri: thongTinPhong?.locationId?.province,
      guests: thongTinPhong.guests,
      moTa: thongTinPhong.description,
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
      //Cập nhật phòng
      const action = updateRoomAction(formData);
      dispatch(action);
    },
  });

  const handleChangeFile = async (e) => {
    //Lay file tu e
    let file = e.target.files[0]; //files có thể lấy nhiều file nhưng file[0] chỉ lấy file đầu tiên
    if (
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      //Đem dữ liệu lưu vào formik
      await formik.setFieldValue("hinhAnh", file);
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file); //đọc file trả ra URL
      reader.onload = (e) => {
        //onload() bắt cái URL đó
        // console.log(`reader`, e.target.result);
        setImgSrc(e.target.result);
      };
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
          </div>
          <div className="modal-body">
            <form
              className="needs-validation"
              id="roomForm"
              onSubmit={formik.handleSubmit}
            >
              <div className="row">
                <p id="textID" />
                {/* <div className="col-md-6 mb-3">
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
                </div> */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="tenPhong">Tên phòng</label>
                  <input
                    name="tenPhong"
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên phòng"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.tenPhong}
                  />
                  <div id="invalidTen" className="invalid-form"></div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="giaPhong">Giá phòng</label>
                  <input
                    name="giaPhong"
                    type="text"
                    className="form-control"
                    placeholder="Nhập giá"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.giaPhong}
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
                    value={formik.values.guests}
                  />
                  <div id="invalidKM" className="invalid-feedback"></div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="viTri">Vị trí</label>
                  <input
                    name="viTri"
                    type="text"
                    className="form-control"
                    placeholder="Nhập vị trí"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.viTri}
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
                      src={imgSrc === "" ? thongTinPhong.image : imgSrc}
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="moTa">Mô Tả</label>
                <textarea
                  className="form-control"
                  id="moTa"
                  rows={3}
                  onChange={formik.handleChange}
                  value={formik.values.moTa}
                />
                <div id="invalidMoTa" className="invalid-form"></div>
              </div>
              <div className="modal-footer">
                {/* <button
                  type="submit"
                  className="btn btn-warning"
                  id="btnThemMon"
                >
                  Thêm
                </button> */}
                <button
                  type="submit"
                  className="btn btn-warning"
                  id="btnCapNhat"
                  // onSubmit={formik.onSubmit}
                >
                  Cập Nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
