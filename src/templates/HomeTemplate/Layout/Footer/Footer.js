import React from "react";

export default function Footer(props) {
  return (
    <div className="footer pt-3">
      <div className="row">
        <div className="col-lg-3">
          <h5 className="font-weight-bold">GIỚI THIỆU</h5>
          <p>Phương thức hoạt động của AirBnB</p>
          <p>Trang tin tức</p>
          <p>Nhà đầu tư</p>
          <p>AirBnB Plus</p>
          <p>AirBnB Luxe</p>
          <p>Hotel Tonight</p>
          <p>AirBnB for Work</p>
          <p>Nhờ có Host,mọi điều đều có thể</p>
          <p>Cơ hội nghề nghiệp</p>
          <p>Thư của nhà sáng lập</p>
        </div>
        <div className="col-lg-3">
          <h5 className="font-weight-bold">CỘNG ĐỒNG</h5>
          <p>Sự đa dạng và cảm giác thân thuộc</p>
          <p>Tiện nghi phù hợp cho người khuyết tật</p>
          <p>Đối tác liên kết AirBnB</p>
          <p>Chỗ ở cho tuyến đầu</p>
          <p>Lượt giới thiệu của khách</p>
          <p>AirBnB.org</p>
        </div>
        <div className="col-lg-3">
          <h5 className="font-weight-bold">ĐÓN TIẾP KHÁCH</h5>
          <p>Cho thuê nhà</p>
          <p>Tổ chức trải nghiệm trực tuyến</p>
          <p>Tổ chức trải nghiệm</p>
          <p>Đón tiếp khách có trách nhiệm</p>
          <p>Trung tâm tài nguyên</p>
          <p>Trung tâm cộng đồng</p>
        </div>
        <div className="col-lg-3">
          <h5 className="font-weight-bold">HỖ TRỢ</h5>
          <p>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</p>
          <p>Trung tâm trợ giúp</p>
          <p>Các tùy chọn hủy</p>
          <p>Hỗ trợ khu dân cư</p>
          <p>Tin cậy và an toàn</p>
        </div>
      </div>
      <div className="row footer2 py-3">
        <div className="col-6">
          <div className="text-dark">
            <span>©2021 AirBnB,Inc. All rights reserved</span>
          </div>
        </div>
        <div className="d-flex justify-content-end col-6 ">
          <span>
            <i className="fab fa-facebook-f"></i>
          </span>
          <span>
            <i className="fab fa-twitter"></i>
          </span>
          <span>
            <i className="fab fa-instagram"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
