import httpRequest from '@/util/http-request'

// 初始数据
export function courseExamList(search) {
    return httpRequest({
        url: "/web/exam/webCourseExamList",
        method: "post",
        data: search
    })
}

// 收藏
export function collectionAdd(add) {
    let url = "/web/exam/collect" + add
    return httpRequest({
        url: url,
        method: "get",
    })
}

// 查看
export function watchTest(val) {
    let url = "/web/exam/paperResultDetail" + val
    return httpRequest({
        url: url,
        method: "get",
    })
}

