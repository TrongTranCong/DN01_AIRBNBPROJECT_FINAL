import React, { Component } from "react";

export default class Count extends Component {
  constructor() {
    super();
  }
  state = {
    adults: 2,
  };

  render() {
    return (
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header p-0" id="headingOne">
            <h2 className="mb-0">
              <div
                className="btn btn-link btn-block justify-content-between d-flex"
                style={{ color: "#000" }}
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <p className="">{this.state.adults} khách</p>
                <p>
                  <i
                    style={{ marginTop: 5, cursor: "pointer" }}
                    className="fa fa-chevron-down"
                  ></i>
                </p>
              </div>
            </h2>
          </div>
          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="my-1">Người lớn</h5>
                  <small>Từ 13 tuổi trở lên</small>
                </div>
                <div className="d-flex align-items-center ">
                  <button type="button" className="btn btn-primary" onClick={()=>{
                      this.setState({
                          adults:this.state.adults -1
                      });
                      localStorage.setItem('clicks', this.state.adults - 1);
                  }}>
                    -
                  </button>
                  <p className="mx-2 my-1">{this.state.adults}</p>
                  <button type="button" className="btn btn-primary" onClick={() => {
                      this.setState({
                          adults:this.state.adults + 1
                      });
                      localStorage.setItem('clicks', this.state.adults + 1);
                  }}>+</button>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="my-1">Trẻ em</h5>
                  <small>Độ tuổi 2 -12</small>
                </div>
                <div className="d-flex align-items-center ">
                  <button className="btn btn-primary">-</button>
                  <p className="mx-2 my-1">0</p>
                  <button className="btn btn-primary">+</button>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="my-1">Em bé</h5>
                  <small>Dưới 2</small>
                </div>
                <div className="d-flex align-items-center ">
                  <button className="btn btn-primary">-</button>
                  <p className="mx-2 my-1">0</p>
                  <button className="btn btn-primary">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
