import {
    categoryList,
    tree,
    listAll,
    knowList,
    Details,
    downPaper
} from '@/api/knowledges'

const state = {
    // 知识库类别列表
    categoryList: [],
//  知识库分页列表
    pages: {},
    knowList: [],
//  详情
    Details: {},
    // 知识库内容tree
    treeDate: [],
    // 知识库内容列表
    content:[]
}

const getters = {}

const actions = {
    // 知识库类别列表
    categoryListAct({commit, state}, Info) {
        return new Promise((resolve, reject) => {
            categoryList(Info).then(response => {
                if (!response) {
                    reject('获取知识库类别列表失败！')
                }
                commit('categoryList', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 知识库内容tree
    treeAct({commit, state}, Info) {
        return new Promise((resolve, reject) => {
            tree(Info).then(response => {
                if (!response) {
                    reject('获取知识库内容tree失败！')
                }
                commit('tree', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 知识库内容列表
    listAllAct({commit, state}, Info) {
        return new Promise((resolve, reject) => {
            listAll(Info).then(response => {
                if (!response) {
                    reject('获取知识库内容列表失败！')
                }
                commit('listAll', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 知识库分页列表
    knowListAct({commit, state}, Info) {
        return new Promise((resolve, reject) => {
            knowList(Info).then(response => {
                if (!response) {
                    reject('获取知识库分页列表失败！')
                }
                commit('knowList', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 详情
    DetailsAct({commit, state}, Info) {
        return new Promise((resolve, reject) => {
            Details(Info).then(response => {
                if (!response) {
                    reject('获取详情失败！')
                }
                commit('Details', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

const mutations = {
    // 知识库类别列表
    categoryList(state, {data}) {
        state.categoryList = data
        // console.log(data)
    },
    // 知识库内容tree
    tree(state, {data}) {
        state.treeDate =data
        // console.log(data)
    },
    // 知识库内容列表
    listAll(state, {data}) {
        state.content = data
        // console.log(data)
    },
    // 知识库分页列表
    knowList(state, {data, size, total,current}) {
        state.pages = {size, total, current}
        state.knowList = data
        // console.log(data)
    },
    // 详情
    Details(state, {data}) {
        state.Details = data
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