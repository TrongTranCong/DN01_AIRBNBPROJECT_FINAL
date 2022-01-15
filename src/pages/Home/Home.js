import React, { Fragment } from "react";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
import Content from "./Content/Content";
import Header from "../../templates/HomeTemplate/Layout/Header/Header";
export default function Home(props) {
  return (
    <Fragment>
      <Header/>
      <HomeCarousel />
      <div className="bg-dark">
        <h3 className="text-light text-center">
          Nhờ có Host, mọi điều đều có thể
        </h3>
      </div>
      <Content />
    </Fragment>
  );
}
