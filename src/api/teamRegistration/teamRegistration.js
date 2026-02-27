import request from "../request.js";

//提交作品
export function register(data) {
    return request({
        url: "/client/c/invocation/register",
        method: "post",
        data,
    });
}

//获取报名信息
export function registerInfo(data) {
    return request({
        url: "/client/c/invocation/register",
        method: "get"
    });
}

//文件上传
export function uploadLocalReturnUrl(data, onUploadProgress) {
    return request({
        url: "/dev/file/uploadLocalReturnUrl",
        method: "post",
        data,
        onUploadProgress: onUploadProgress,
    });
}

//信息上传
export function informationUpload(data) {
    return request({
        url: "/client/c/invocation/informationUpload",
        method: "post",
        data,
    });
}//信息上传
export function information(data) {
    return request({
        url: "/client/c/invocation/informationUpload",
        method: "get"
    });
}

//专家报名提交申请
export function expertInfoUpload(data) {
    return request({
        url: "/client/c/invocation/expertInfoUpload",
        method: "post",
        data,
    });
}
