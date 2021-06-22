import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
// import styles from './App.module.less'
// import 'antd/dist/antd.less'  配置按需加载

function App() {
  return (
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  );
}

export default App;
