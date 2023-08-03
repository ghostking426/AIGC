import request from "../utils/request";
const baseUrl = "/bpi";
import qs from "qs";
export const apiGetList = () =>
  request("get", baseUrl + "/corps-common/member/list", {}, true, false);
