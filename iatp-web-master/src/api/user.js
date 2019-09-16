import httpRequest from '@/util/http-request'
import qs from 'qs'

export function login(data) {
  return httpRequest({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization":"Basic d2ViY2xpZW50OndlYmNsaWVudA=="
    },
    url:"/login/oauth/token",
    method:"post",
    data: qs.stringify({
      client:"webclient",
      grant_type:"password",
      username:data.name,
      password:data.password
    })
  })
}

export function getUserInfo(userId) {
  return httpRequest({
    url:"",
    method:"post",
    data:userId
  })
}
