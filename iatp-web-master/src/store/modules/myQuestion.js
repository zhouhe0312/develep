import {wrongList,paperResultDetail} from '@/api/myQuestion'

const state = {
    wrongList:[],
    wrongListPages:[],
    paperResultDetail:[]
}

const getters = {

}

const actions = {
    wrongListAct({commit,state},search){
        return new Promise((resolve,reject)=>{
            wrongList(search).then(response =>{
                if (!response){
                    reject('获取错题列表失败')
                }
                commit('wrongList',response)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    paperResultDetailAct({commit,state},search){
        return new Promise((resolve,reject)=>{
            paperResultDetail(search).then(response =>{
                if (!response){
                    reject('获取错题列表失败')
                }
                commit('paperResultDetail',response)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    },
}

const mutations = {
    wrongList(state,{data,total,size}){
        state.wrongList = data
        state.wrongListPages = {total,size}
    },
    paperResultDetail(state,{data}){
        state.paperResultDetail = data
        // console.log(data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}