import httpRequest from '@/util/http-request'

export function courseIndexList() {
    return httpRequest({
        url:"/web/index/courseList/1",
        method:"get"
    })
}
export function courseIndexListTwo() {
    return httpRequest({
        url:"/web/index/courseList/2",
        method:"get"
    })
}

export function knowLedge() {
    return httpRequest({
        url:"/web/index/knowledge",
        method:"post"
    })
    
}