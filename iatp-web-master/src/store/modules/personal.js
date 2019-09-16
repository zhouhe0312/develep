import {details,updateUser,updatePwd} from '@/api/personal'


const state = {
    details:[],
    getUserInfo:[],
    updateUser:[],
    updatePwd:[],


}

const getters = {

}

const actions = {
    detailsAct({commit,state}){
        return new Promise((resolve,reject)=>{
            details().then(response =>{
                if (!response){
                    reject('获取用户详情失败')
                }
                commit('details',response)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    updateUserAct({commit,state},userModifyInfo){
        return new Promise((resolve,reject)=>{
            updateUser(userModifyInfo).then(response =>{
                if (!response){
                    reject('修改用户信息失败')
                }
                commit('updateUser',response)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    updatePwdAct({commit,state},UserUpdatePwdVo){
        return new Promise((resolve,reject)=>{
            updatePwd(UserUpdatePwdVo).then(response =>{
                if (!response){
                    reject('修改用户密码失败')
                }
                commit('updatePwd',response)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    },

}
const mutations = {
    details(state,{data}){
        state.details = data
        // console.log(data)
    },
    updateUser(state,{data}){
        state.updateUser = data
    },
    updatePwd(state,{data}){
        state.updatePwd = data
    },
}





export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}