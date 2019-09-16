import {
    startTest,
    submitTestPaper,
} from '@/api/test-paper'

const state = {
// 考核试卷信息
    startTestList: [],
    testScore: 0,


}

const getters = {}

const actions = {
    // 考核试卷
    startTestAct({commit, state}, search) {
        return new Promise((resolve, reject) => {
            startTest(search).then(response => {
                if (!response) {
                    reject('获取考核列表失败！')
                }
                commit('startTestList', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 提交试卷
    submitPaperAct({commit, state}, search) {
        return new Promise((resolve, reject) => {
            submitTestPaper(search).then(response => {
                if (!response) {
                    reject('获取成绩失败！')
                }
                commit('testScore', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

const mutations = {
    startTestList(state, {data}) {
        state.startTestList = data
    },
    testScore(state, {data}) {
        state.testScore = data
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