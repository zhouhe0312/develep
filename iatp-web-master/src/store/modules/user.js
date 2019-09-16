import { login } from '@/api/user'
import {setValue} from  '@/util/localStorage'

const state = {
    userId:''
}

const getters = {

}

const actions = {
    loginAct({commit,state},loginData){
        return new Promise((resolve,reject)=>{
            login(loginData).then(response =>{
                if (!response){
                    reject('获取用户信息失败！')
                }
                commit('loginToken',response)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    }
}

const mutations = {
    loginToken(state,data) {
        // state.userId = data.X-AOHO-UserId
        setValue('token',data.access_token)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}