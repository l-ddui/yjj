// src/api/user.js
import request from '../request.js'

//登录图形验证码
export function getPicCaptcha(params) {
    return request({
        url: "/auth/c/getPicCaptcha",
        method: "get",
        params
    });
}

//获取手机验证码
export function getPhoneValidCode(params) {
    return request({
        url: `/auth/c/getPhoneValidCode`,
        method: 'get',
        params
    });
}

//手机验证码登录
export function doLoginByPhone(data) {
    return request({
        url: `/auth/c/doLoginByPhone`,
        method: 'post',
        data
    });
}

//获取手机验证码
export function getPhoneValidEmail(params) {
    return request({
        url: `/auth/c/getPhoneValidEmail`,
        method: 'get',
        params
    });
}

//邮箱验证码登录
export function doLoginByEmail(data) {
    return request({
        url: `/auth/c/doLoginByEmail`,
        method: 'post',
        data
    });
}

//获取断点续传参数
export function generateStsToken() {
    return request({
        url: "/dev/file/generateStsToken",
        method: "get",
    });
}

//获取邮箱验证码
export function getEmailValidCode(params) {
    return request({
        url: `/auth/c/getEmailValidCode`,
        method: 'get',
        params
    });
}
export function jsconfig() {
    return request({
        url: `/weixin/jsconfig`,
        method: 'get',
    });
}

