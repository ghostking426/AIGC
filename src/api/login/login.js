import request from "../../utils/request";
const baseUrl = "/api";
import qs from "qs";

export const apiEmail = (data) =>
  request("post", baseUrl + "/mj/userInfo/email", data, true, false);

export const apiRegister = (data) =>
  request("post", baseUrl + "/mj/userInfo/register", data, true, false);

export const apiLogin = (data) =>
  request("post", baseUrl + "/mj/userInfo/login", data, true, false);
