import axios from "axios";

//通过axios实例发送请求

function getAxiosInstance() {
  const instance = axios.create();
  return instance;
}

//封装常用方法

function makeGet() {
  return function (url, option) {
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: "get",
      ...option,
    });
  };
}
function makePost() {
  return function (url, option) {
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: "post",
      ...option,
    });
  };
}

export default {
  get: makeGet(),
  post: makePost(),
};
