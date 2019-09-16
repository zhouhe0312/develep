import httpRequest from '@/util/http-request'
//  注册
export function register(Info) {
    return httpRequest({
        url:"/web/user/register",
        method:"post",
        data:Info
    })
}
//  验证密码
  export function checkPassword(Info) {
    return httpRequest({
        url:"/web/user/passwordCheck",
        method:"get",
        params:{
            'password':Info
        }
    })
}

//  获取密码规则
export function getRules() {
    return httpRequest({
        url:"/web/user/passwordTips",
        method:"get",
    })
}