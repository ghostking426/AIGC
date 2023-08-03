import axios from "axios";
import { ElMessage } from "element-plus";
import { ElLoading } from "element-plus";
import result from "@/utils/result";

const request = (
  method,
  url,
  data = {},
  isLoading = true,
  showMessage = true,
  config = {}
) => {
  let http = axios.create({});
  let loadingInstance = ElLoading;
  http.defaults.headers["Content-Type"] = "application/json";
  http.interceptors.request.use(
    function (config) {
      let token = localStorage.getItem("token") || "";
      config.headers.Authorization = "Bearer " + token;
      if (isLoading)
        loadingInstance = ElLoading.service({
          fullscreen: true,
          background: "rgba(0, 0, 0, 0.7)",
        });
      // 在发送请求之前做些什么
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
  // 添加响应拦截器
  http.interceptors.response.use(
    function (response) {
      if (isLoading) loadingInstance.close();
      result(response.data, showMessage);
      // 对响应数据做点什么
      return response;
    },
    function (error) {
      // 对响应错误做点什么
      ElMessage({
        type: "error",
        showClose: true,
        message: error.message,
      });
      if (isLoading) loadingInstance.close();
      return Promise.reject(error);
    }
  );
  //运维端接口参数加入qyId
  return http({
    method: method,
    data: data,
    params: method === "get" ? data : {},
    url: url,
    ...config,
  });
};
export default request;
