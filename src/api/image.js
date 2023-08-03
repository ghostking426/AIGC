import request from "../utils/request";
const baseUrl = "/api";
import qs from "qs";
export const apiSubmit = (data) =>
  request("post", baseUrl + "/mj/trigger/imagine", data, true, true);

export const apiGetList = (data) =>
  request("get", baseUrl + "/mj/task/list", data, false, false);
