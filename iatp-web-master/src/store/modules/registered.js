import {
    register,
    checkPassword,
    getRules
} from '@/api/registered'

const state = {
    message:'',
}

const getters = {}

const actions = {
    // 注册
    registerAct({commit, state}, Info) {
        return new Promise((resolve, reject) => {
            register(Info).then(response => {
                if (!response) {
                    reject('注册失败！')
                }
                commit('register',response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 验证密码强度
    checkPasswordAct({commit, state}, Info) {
        return new Promise((resolve, reject) => {
            checkPassword(Info).then(response => {
                if (!response) {
                    reject('注册失败！')
                }
                commit('checkPassword',response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 验证密码规则
    getRulesAct({commit, state}, Info) {
        return new Promise((resolve, reject) => {
            getRules(Info).then(response => {
                if (!response) {
                    reject('注册失败！')
                }
                commit('getRules',response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

const mutations = {
    register(state,data) {
        // console.log(data)
    },
    checkPassword(state,data) {
        // console.log(data)
    },
    getRules(state,data) {
        state.message = data.message
        // console.log(data)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}