import {
    getCourseResourceList,//课程资源
    getTestResourceList,//实验资源
    InClassTestAct,//随堂测/单元测试题
    submitPaper,//交卷
    paperResultDetail,//查看试卷
    onlinePreview,//文件图片url
    studyRecord,//学习进度打点
} from '@/api/courseSectionStudy'

const state = {
    courseList:[],
    InClassTestList:[],
    ResultDetail:{},
    PreviewUrl:{}
}

const getters = {
    getCourseResourceList: state => state.courseCourseList,
    getTestResourceList: state => state.testCourseList,
    InClassTestAct: state => state.InClassTestList,
    paperResultDetail: state => state.ResultDetail,
    onlinePreview: state => state.PreviewUrl,
    getRactice: state => state.racticeData
}

const actions = {
    //课程资源列表
    getCourseResourceListAct({commit,state},val) {
        return new Promise((resolve,reject) => {
            getCourseResourceList(val).then(response => {
                if (!response) {
                    reject('获取资源失败！')
                }
                commit('courseCourseList',response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
     //实验资源列表
     getTestResourceListAct({commit,state},val) {
        return new Promise((resolve,reject) => {
            getTestResourceList(val).then(response => {
                if (!response) {
                    reject('获取资源失败！')
                }
                commit('testCourseList',response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //获取随堂测/单元测试题
    getInClassTestAct({commit,state},id) {
        return new Promise((resolve,reject) => {
            InClassTestAct(id).then(response => {
                if (!response) {
                    reject('获取试题失败！')
                }
                commit('InClassTestList',response.data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //交卷
    submitPaperAct({commit,state},val) {
        return new Promise((resolve,reject) => {
            submitPaper(val).then(response => {
                if (!response) {
                    reject('交卷失败！')
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
     //查看试卷
     paperResultDetailAct({commit,state},val) {
        return new Promise((resolve,reject) => {
            paperResultDetail(val).then(response => {
                if (!response) {
                    reject('查看试卷失败！')
                }
                commit('ResultDetail',response.data)
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //文件图片url
    onlinePreviewAct({commit,state},val) {
        return new Promise((resolve,reject) => {
            onlinePreview(val).then(response => {
                if (!response) {
                    reject('获取文件url失败！')
                }
                commit('PreviewUrl',response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //学习进度打点
    studyRecordAct({commit,state},val) {
        return new Promise((resolve,reject) => {
            studyRecord(val).then(response => {
                if (!response) {
                    reject('操作失败！')
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

}

const mutations = {
    courseCourseList(state,courseCourseList) {
        state.courseCourseList = courseCourseList;
    },
    testCourseList(state,testCourseList) {
        state.testCourseList = testCourseList;
    },
    InClassTestList(state,InClassTestList) {
        state.InClassTestList = InClassTestList;
    },
    ResultDetail(state,ResultDetail) {
        state.ResultDetail = ResultDetail;
    },
    PreviewUrl(state,PreviewUrl) {
        state.PreviewUrl = PreviewUrl;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}