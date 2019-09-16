import {
    courseList,

} from '@/api/courseAllList'

const state = {
    courseList:[]
}

const getters = {
    courseList: state => state.courseList,
}

const actions = {
    // 课程，实验分页列表
    courseListAct({commit,state},val) {
        return new Promise((resolve,reject) => {
            courseList(val).then(response => {
                if (!response) {
                    reject('获取列表失败！')
                }
                commit('courseList',response.data)
                commit('allInfo',response)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

const mutations = {
    courseList(state,courseList) {
        state.courseList = courseList;
    },
    allInfo(state, allInfo) {
        state.allInfo = allInfo
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}