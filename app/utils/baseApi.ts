import { db } from "./db.server";
import axios from "axios";
export const baseURL = "https://vipkshttps9.wiz.cn/ks";
export const kbGuid = "bd5d4640-62c8-11eb-9685-273bbfc748ff";
//获取定期刷新的wiz-token
async function getWizToken() {
  let token = "";
  try {
    let data = await db.token.findUnique({ where: { id: 1 } });
    token = data?.token || "";
  } catch (e) {
    console.log(e);
    throw new Error("获取token失败");
  }
  return token;
}
//返回的类型 ps:文章详情返回直接就是一个字符串，不需要WizReturnType
export interface WizReturnType<T> {
  returnCode: number;
  returnMessage: string;
  externCode: string;
  result: T;
}
axios.defaults.baseURL = baseURL;
const request = axios.create();
request.interceptors.request.use(async (config) => {
  let token = await getWizToken();
  config.headers = { ...config.headers, "X-Wiz-Token": token };
  return config;
});
request.interceptors.response.use(function (response) {
  return response.data;
});
export { request };
