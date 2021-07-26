import { Switch, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { Spin } from "antd";
import styles from "./index.module.less";
// import Home from "../pages/Home";
// import Register from "../pages/Register";
// import Login from "../pages/Login";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => {
  return import("../pages/Login");
});
const Register = lazy(() => {
  return import("../pages/Register");
});

const Router = () => (
  <Suspense
    fallback={
      <div className={styles.spinWrapper}>
        <Spin size="large" />
      </div>
    }
  >
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
    </Switch>
  </Suspense>
);
export default Router;
