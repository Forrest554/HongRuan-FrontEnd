/**
 * 设备端相关api
 * home register
 * 所有api 命名方式 _functionName
 */
import {
    fetch,
    post,
    patch,
    put,
    del
} from './public.js'

// 手机号+密码登陆
export const _look = (data) => {
    return fetch('/test', data)
}
// 学生注册
export const _register = (data) => {
    return post('/register', data)
}
// 学生签到
export const _sign = (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return post('/signOn', data, config)
}
// 学生信息查看
export const _getStuInfo = (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return post('/info', data,config)
}