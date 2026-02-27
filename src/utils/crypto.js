// src/utils/crypto.js

// 使用这种语法可以捕获 CommonJS 模块的所有导出
import * as CryptoJS from 'crypto-js';

const SECRET = "YxmKSrQR4uoJ5lOoWIhcbd7SlUEh9OOc";

export function generateSign(path, token, timestamp) {
    const pathname = "";
    const tokenStr = token || "";
    const signPath = path.indexOf('?') > -1 ? path.split('?')[0] : path;

    const signStr = pathname + signPath + tokenStr + timestamp + SECRET;

    // 使用 MD5 方法并转为字符串
    return CryptoJS.MD5(signStr).toString();
}