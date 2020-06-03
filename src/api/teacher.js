// 教师相关接口
import {
    fetch,
    post,
    patch,
    put,
    del
} from './public.js'


// 教师登陆
export const _teaLogin = (data) => {
    return post('/teacher/login', data)
}
// 教师信息
export const _teaInfo = (data) => {
    return post('/teacher/info', data)
}
// 教师查看签到情况
export const _teaSignLook = (data) => {
    return fetch('/teacher/signLook', data)
}