// 管理web端

import {
    fetch,
    post,
    patch,
    put,
    del
} from './public.js'


// 查看所有学生信息
export const _studentsShow = (data) => {
    return post('/studentsShow', data)
}
// 删除学生
export const _deleteStu = (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return post('/delete', data, config)
}
// 查看所有教师信息
export const _teaShow = (data) => {
    return post('/teacher/info', data)
}
// 增加教师
export const _teaAdd = (data) => {
    return post('/teacher/register', data)
}
// 删除教师
export const _teaDel = (data) => {
    return post('/teacher/delete', data)
}
// 教师密码修改
export const _teaUpt = (data) => {
    return post('/teacher/update', data)
}
// 添加公告
export const _addNotice = (data) => {
    return post('/postNotice', data)
}
// 查看公告
export const _lookNotice = (data) => {
    return fetch('/lookNotice', data)
}
// 删除公告
export const _deleteNotice = (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return post('/deleteNotice', data, config)
}