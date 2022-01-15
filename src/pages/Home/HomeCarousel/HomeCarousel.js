import React from "react";
//cài thư viện antdesign
import { Carousel } from "antd";
export default function HomeCarousel(props) {
  const contentStyle = {
    height: "600px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Carousel effect="fade">
      <div>
        <h3 style={contentStyle}>
          <img src="./img/1559986792-post.jpeg" alt="..." />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src="./img/danang.jpg" alt="..." />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src="./img/hochiminh.jpg" alt="..." />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src="./img/vinhhalong.jpg" alt="..." />
        </h3>
      </div>
    </Carousel>
  );
}
