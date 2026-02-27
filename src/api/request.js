import axios from "axios";
import { generateSign } from "../utils/crypto";

// 使用 /api 前缀触发 Vite 代理
const BASE_URL = "/api";

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem("yjb_token") || "";
    const timestamp = Math.floor(Date.now() / 1000); // 秒级时间戳

    // 处理 url，去掉 baseURL 部分用于签名
    // 例如 config.url 是 /user_account
    const path = config.url;

    // 生成签名
    const sign = generateSign(path, token, timestamp);

    // 添加请求头
    config.headers["Content-Type"] = "application/json";
    config.headers["Request-Time"] = timestamp.toString();
    config.headers["Request-Sign"] = sign;
    config.headers["Authorization"] = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 对应 Python: if data.get('code') != 200: raise Exception
    if (res.code !== 200) {
      // 401 处理
      if (response.status === 401 || res.code === 401) {
        localStorage.removeItem("yjb_token");
        window.location.reload(); // 简单处理：刷新页面触发重新登录
      }
      return Promise.reject(new Error(res.message || "Error"));
    }

    return res.data;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export default service;
