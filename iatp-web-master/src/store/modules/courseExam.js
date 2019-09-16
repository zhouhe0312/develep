import {
    courseExamList,
    collectionAdd,
    watchTest,
} from '@/api/course-exam'

const state = {
    // 考核列表信息
    courseExamList: [],
    courseExamPage: {},

}

const getters = {

}

const actions = {
    // 题库列表
    courseExamListAct({commit,state},search) {
        return new Promise((resolve,reject) => {
            courseExamList(search).then(response => {
                if (!response) {
                    reject('获取题库列表失败！')
                }
                commit('courseExamList', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 收藏
    collectionAct({commit,state},search) {
        return new Promise((resolve,reject) => {
            collectionAdd(search).then(response => {
                if (!response) {
                    reject('收藏失败！')
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查看
    watchTestAct({commit,state},search) {
        return new Promise((resolve,reject) => {
            watchTest(search).then(response => {
                if (!response) {
                    reject('获取查看表失败！')
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

const mutations = {
    courseExamList(state,{data, total,size}) {
        state.courseExamList = data
        state.courseExamPage = {total,size}
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}