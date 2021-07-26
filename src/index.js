import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
//异步action中间件
import thunk from "redux-thunk";
import { StoreContext } from "redux-react-hook";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import App from "./App";
import "./index.less";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  //使得所有组件都可以取到store
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);
