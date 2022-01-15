import React from "react";
import { useEffect } from "react";
import { useState } from "react";
export default function Scroll(props) {
  
  return (
      
      <div id="nav-extra" className="header_DSP">
        <div className="row justify-content-center px-5 py-3">
          <div className="col-3">
            <a className="navbar-brand" href="/">
              <div className="row mx-0 align-items-center">
                <div>
                  <i
                    className="fab fa-airbnb"
                    style={{
                      fontSize: "2rem",
                      color: "rgb(255, 56, 92)",
                    }}
                  ></i>
                </div>
                <div
                  className="pl-1 font-weight-normal"
                  style={{
                    fontSize: "2rem",
                    color: "rgb(255, 56, 92)",
                  }}
                >
                  airbnb
                </div>
              </div>
            </a>
          </div>
          <div className=" nav_DSP col-6">
            <div
              className="d-flex text-center"
              style={{
                alignItems: "center",
                padding: "0.5rem 0",
              }}
            >
              <div className="col-5">
                <input
                  className="form-control text-center"
                  style={{ border: "transparent" }}
                  type="text"
                  placeholder="Khu vực bạn đã chọn"
                  // value={location}
                />
              </div>
              <div className="col-3 border-left">
                <input
                  className="form-control text-center"
                  style={{ border: "transparent" }}
                  type="text"
                  placeholder="Thêm ngày"
                />
              </div>
              <div className="col-3 border-left">
                <input
                  className="form-control text-center"
                  style={{ border: "transparent" }}
                  type="text"
                  placeholder="Thêm khách"
                />
              </div>
              <div className="col-1">
                <div
                  className
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50px",
                    backgroundColor: "#FF385C",
                    textAlign: "center",
                    color: "white",
                    lineHeight: "32px",
                    marginLeft: "-5px",
                    cursor: "pointer",
                  }}
                >
                  <i className="fa fa-search"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-around col-3">
            <div>Trở thành chủ nhà</div>
            <div className="mx-4">
              <i class="fa fa-globe"></i>
            </div>
            <div>
              <i className="fa fa-bars mx-3"></i>
              <i className="fa fa-user-circle"></i>
            </div>
          </div>
        </div>
      </div>
  );
}
