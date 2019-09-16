import {
    getcourseList,//章节列表
    getcourseDetail,//课程，实验详情
    pageView,//增加浏览量

} from '@/api/courseSection'

const state = {
    courseList:[],
    courseDeatils:{}
}

const getters = {
    getcourseList: state => state.courseList,
    getcourseDetail: state => state.courseDeatils
}

const actions = {
    //章节列表
    getCourseListAct({commit,state},val) {
        return new Promise((resolve,reject) => {
            getcourseList(val).then(response => {
                if (!response) {
                    reject('获取章节失败！')
                }
                commit('courseList',response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //课程，实验详情
    getCourseDetailAct({commit,state},id) {
        return new Promise((resolve,reject) => {
            getcourseDetail(id).then(response => {
                if (!response) {
                    reject('获取详情失败！')
                }
                commit('courseDeatils',response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
     //增加浏览量
     addPageView({commit,state},id) {
        return new Promise((resolve,reject) => {
            pageView(id).then(response => {
                if (!response) {
                    reject('增加浏览量失败！')
                }
                resolve(response)
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
    courseDeatils(state,courseDeatils) {
        state.courseDeatils = courseDeatils;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}