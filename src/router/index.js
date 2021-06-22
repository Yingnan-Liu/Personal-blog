import { Switch, Route } from "react-router";
import React from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";

const Router = () => {
  return (
    <Switch>
      <Route path="/register" component={Register}></Route>
      <Route path="/login" component={Login}></Route>
    </Switch>
  );
};
export default Router;
