import {courseIndexList,courseIndexListTwo,knowLedge} from '@/api/home'

const state = {
    courseIndexList:[],
    courseIndexListTwo:[],
    knowLedge:[],
}

const getters = {

}

const actions = {
    courseIndexListAct({commit,state}){
        return new Promise((resolve,reject)=>{
            courseIndexList().then(response =>{
                if (!response){
                    reject('获取课程列表失败')
                }
                commit('courseIndexList',response)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    courseIndexListTwoAct({commit,state}){
        return new Promise((resolve,reject)=>{
            courseIndexListTwo().then(response =>{
                if (!response){
                    reject('获取实验列表失败')
                }
                commit('courseIndexListTwo',response)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    knowLedgeAct({commit,state}){
        return new Promise((resolve,reject)=>{
            knowLedge().then(response =>{
                if (!response){
                    reject('获取知识库列表失败')
                }
                commit('knowLedge',response)
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    },
}

const mutations = {
    courseIndexList(state,{data}){
        state.courseIndexList = data
    },
    courseIndexListTwo(state,{data}){
        state.courseIndexListTwo = data
    },
    knowLedge(state,{data}){
        state.knowLedge = data
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}