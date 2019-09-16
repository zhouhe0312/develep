import httpRequest from '@/util/http-request'

// 试卷列表
export function startTest(val) {
    let url = "/web/exam/paperDetail" + val
    return httpRequest({
        url: url,
        method: "get",
    })
}
// 提交试卷
export function submitTestPaper(val) {
    return httpRequest({
        url: "/web/exam/submitPaper",
        method: "post",
        data: val
    })
}