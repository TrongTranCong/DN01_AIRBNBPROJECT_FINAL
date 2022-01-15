import React from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
export default function HomeTemplate(props) {
  //path,component,exact
  //Destructuring
  // const {Component,...restProps} = props;
  //return <Route {...restProps} : exact path={props.path}
  return (
    <>
      <Route
        exact
        path={props.path}
        render={(propsRoute) => {
          //props.history,props.location,props.match
          return (
            <> 
              <props.component {...propsRoute} />
              <Footer />
            </>
          );
        }}
      />
    </>
  );
}
