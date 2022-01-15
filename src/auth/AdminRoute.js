import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

export default function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().type === "ADMIN" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/loginpage", state: { from: props.location } }}
          />
        )
      }
    ></Route>
  );
}