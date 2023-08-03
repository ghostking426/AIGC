import request from "../utils/request";
const baseUrl = "/bpi";
import qs from "qs";
export const apiGetList = (data) =>
  request("get", baseUrl + "/corps-common/product/list", data, true, false);
