import httpRequest from '@/util/http-request'

//这是个人资料修改的接口
export function updateUser(userModifyInfo) {
    return httpRequest({
        url:"web/user/updateUser",
        method:"post",
        data:userModifyInfo
    })
}

//这个是个人账号设置修改密码
export function updatePwd(UserUpdatePwdVo) {
    return httpRequest({
        url:"web/user/updatePwd",
        method:"post",
        data:UserUpdatePwdVo
    })
}



// 这是用户详情的接口
export function details() {
    return httpRequest({
        url:"/web/user/details",
        method:"get",
    })
}