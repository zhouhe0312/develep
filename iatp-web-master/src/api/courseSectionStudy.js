import httpRequest from '@/util/http-request'

//课程资源列表
export function getCourseResourceList(val) {
    return httpRequest({
        url:"web/course/courseResourceList/",
        method:"post",
        data:val
    })
}
//实验资源列表
export function getTestResourceList(val) {
    return httpRequest({
        url:"web/course/experimentResourceList/",
        method:"post",
        data:val
    })
}
//随堂测/单元测试题
export function InClassTestAct(id) {
    return httpRequest({
        url:"web/exam/paperDetail/"+id,
        method:"get",
    })
}
//交卷
export function submitPaper(val) {
    return httpRequest({
        url:"web/exam/submitPaper/",
        method:"post",
        data:val
    })
}

//查看试卷
export function paperResultDetail(val) {
    return httpRequest({
        url:"web/exam/paperResultDetail/"+val.id+'/'+val.resultId,
        method:"get",
    })
}

//获取文件图片url
export function onlinePreview(val) {
    return httpRequest({
        url:"fileserver/filePreview/onlinePreview?uri="+val,
        method:"get",
    })
}

//学习进度打点
export function studyRecord(val) {
    return httpRequest({
        url:"web/course/record/",
        method:"post",
        data:val
    })
}