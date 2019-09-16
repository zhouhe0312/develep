import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import {getValue} from  '@/util/localStorage'
import router from '@/router'


const httpRequest = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
httpRequest.interceptors.request.use(
    config => {
    	// do something before request is sent
        let token = getValue('token');
        if (token
            && !(config.url.includes("web/index/"))
            && !(config.url.includes("web/user/passwordCheck"))
            && !(config.url.includes("web/user/passwordTips"))
            && !(config.url.includes("web/course/courseList"))
            && !(config.url.includes("web/course/addPv/"))
            && !(config.url.includes("web/user/register"))
            && !(config.url.includes("web/course/chapterList/"))
            && !(config.url.includes("web/course/details"))
            && !(config.url.includes("login/oauth/token"))) {
           config.headers['Authorization'] ='bearer '+ token;
    	}
        
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
httpRequest.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        //处理下载
        const responseType = response.config.responseType
        if(responseType === "blob") {
            return response
        }
        const res = response.data
        //处理登录
		if(res.access_token) {
			return res
		} else if (res.code !== 200) {

            const msg = res.message || '系统错误，请稍后重试！'

		    if(res.code === 10000) {
		        return Promise.reject(msg)
            }

            Message({
                message: msg,
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//          if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//              MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//                  confirmButtonText: 'Re-Login',
//                  cancelButtonText: 'Cancel',
//                  type: 'warning'
//              }).then(() => {
//                  store.dispatch('user/resetToken').then(() => {
//                      location.reload()
//                  })
//              })
//          }
            return Promise.reject(msg)
        } else {
            return res
        }
    },
    error => {
        const httpStatus = error.response.status
        const url = error.config.url
        if(httpStatus === 401 && url.includes("web/user/details")) {
            return Promise.reject(error)
        }
        let msg = error.response.data.message || "系统错误，请稍后重试！"
        Message({
            message: msg,
            type: 'error',
            duration: 5 * 1000
        })

        if(httpStatus === 401) {
            router.push({
                path: '/login',
                query:{ redirect:location.hostname}
            })
        }

        return Promise.reject(error)
    }
)

export default httpRequest