import httpRequest from '@/util/http-request'

//章节列表
export function getcourseList(val) {
    return httpRequest({
        url:"web/course/chapterList/"+val.id+'/'+val.uid,
        method:"get",
    })
}
//课程，实验详情
export function getcourseDetail(id) {
    return httpRequest({
        url:"web/course/details/"+id,
        method:"get",
    })
}
//增加浏览量
export function pageView(id) {
    return httpRequest({
        url:"web/course/addPv/"+id,
        method:"get",
    })
}