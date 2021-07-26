import { message } from "antd";
import * as api from "../api/register";
// action creator
export function getCaptcha(payload = {}) {
  return async () => {
    console.log("getCaptcha test");
    //api中发送post请求 payload作为data传入
    const result = await api.getCaptcha(payload);
    const {
      code,
      message: msg,
      data: { captcha },
    } = await api.getCaptcha(payload);
    if (code === 20020) {
      message.success(`${msg}，验证码为${captcha}`);
    } else {
      message.error(msg);
    }
    if (code === 20020) {
      message.success(`${msg}，验证码为${captcha}`);
    } else {
      message.error(msg);
    }
  };
}
export function register(payload = {}) {
  return async () => {
    const { code, message: msg } = await api.register(payload);
    if (code === 20023) {
      message.success(msg);
    } else {
      message.error(msg);
    }
  };
}
export function login(payload = {}) {
  return async () => {
    const {
      code,
      message: msg,
      data: { token } = {},
    } = await api.login(payload);
    if (code === 0) {
      message.success(msg);
      window.localStorage.setItem("personal-app-token", token);
      window.location.href = "/";
    } else {
      message.error(msg);
    }
  };
}
